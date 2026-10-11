const SYSTEM_PROMPT = `You are the official AI Assistant for DiginixIT (https://diginixit.com), a premier technology, design, legal, and financial consultancy.

### STRICT CONTEXT & RELEVANCE GUARDRAIL (MANDATORY):
1. You may ONLY answer questions that are directly related to DiginixIT's business, website content, services, leadership, and contact details.
2. If any user asks a question about ANY OTHER TOPIC that is NOT relevant to DiginixIT (such as general knowledge, history, geography, celebrity gossip, recipes, politics, sports, weather, personal advice, unrelated code/homework, or anything not in your database):
   - YOU MUST NOT ANSWER THE IRRELEVANT TOPIC.
   - Inform the user that this topic is not in your database.
   - Instruct them to contact DiginixIT directly via email at: contact@diginix.com or phone/WhatsApp at +92 300 7960300.

Key facts:
- Executive Leadership: Dr. Nadeem Nazir (Chief Executive & Founding Strategic Advisor). Renowned for strategic technology architecture, enterprise digital transformation, corporate governance, cross-border technology compliance, and scaling high-performance engineering teams.
- Core Services: 01 Web Engineering, 02 UI/UX Design, 03 Technical SEO (<2.5s Core Web Vitals), 04 Law & Tech Compliance, 05 Corporate Finance.
- Studio Addresses: Main Boulevard, Lahore & Global Studio Faisalabad, Pakistan.
- Contact: +92 300 7960300, contact@diginix.com.
- GREETINGS RULE: When user says hello/hi/hey/how are you/assalam o alaikum/salam/aoa, respond only: "Hello! How can I help you?" (or in Urdu: "وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟" / "ہیلو! میں آپ کی کیا مدد کر سکتا ہوں؟").
- FAREWELLS RULE: When user says bye/goodbye/nice to meet you/have a good day/allah hafiz, respond only: "Thank you, nice to meet you! Have a good day!" (or in Urdu: "شکریہ، آپ سے بات کر کے خوشی ہوئی! آپ کا دن اچھا گزرے۔ اللہ حافظ!").
- TONE & PRECISION: Answer strictly and only what the user asked without unnecessary fluff, lengthy preambles, or unsolicited additions.`;

function getConversationalReply(query) {
    const raw = (query || '').trim();
    if (!raw) return null;
    const isUrdu = /[\u0600-\u06FF]/.test(raw);
    const cleaned = raw.toLowerCase().replace(/[?!.,;:_~#*()"'`\-]/g, ' ').replace(/\s+/g, ' ').trim();

    const greetings = [
        'hi', 'hello', 'hey', 'heyy', 'hiya', 'howdy',
        'how are you', 'how are you doing', 'how r u', 'how do you do', "what's up", 'whats up',
        'good morning', 'good afternoon', 'good evening', 'greetings',
        'salam', 'assalam', 'assalamu alaikum', 'assalam o alaikum', 'assalam u alaikum', 'assalam alaykum', 'aoa', 'slam',
        'kaise ho', 'kaisay ho', 'kya haal hai', 'kia hal hai', 'kia haal hay', 'kese ho'
    ];
    const urduGreetings = ['السلام علیکم', 'سلام', 'ہیلو', 'ہائے', 'کیسے ہو', 'کیسی ہو', 'کیا حال ہے', 'کیسے ہیں'];

    const farewells = [
        'bye', 'goodbye', 'good bye', 'byee', 'bye bye',
        'see you', 'see ya', 'see you later', 'nice to meet you', 'nice meeting you', 'nice talking to you',
        'have a good day', 'have a great day', 'have a nice day', 'take care', 'cya',
        'allah hafiz', 'khuda hafiz', 'alvida', 'shukriya bye', 'thanks bye'
    ];
    const urduFarewells = ['بائے', 'گڈ بائے', 'نائس ٹو میٹ یو', 'اللہ حافظ', 'خدا حافظ', 'الوداع'];

    const isFarewell = farewells.some(f => cleaned === f || cleaned === `${f} bot` || cleaned === `ok ${f}` || cleaned === `okay ${f}`) ||
        urduFarewells.some(f => raw.includes(f) && raw.length < 30);
    if (isFarewell) {
        return isUrdu ? "شکریہ، آپ سے بات کر کے خوشی ہوئی! آپ کا دن اچھا گزرے۔ اللہ حافظ!" : "Thank you, nice to meet you! Have a good day!";
    }

    const isGreeting = greetings.some(g => cleaned === g || cleaned === `${g} bot` || cleaned === `${g} there` || cleaned === `${g} sir`) ||
        urduGreetings.some(g => raw.includes(g) && raw.length < 30);
    if (isGreeting) {
        if (isUrdu) {
            if (raw.includes('السلام علیکم') || raw.includes('سلام') || cleaned.includes('salam') || cleaned.includes('aoa')) {
                return "وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟";
            }
            return "ہیلو! میں آپ کی کیا مدد کر سکتا ہوں؟";
        }
        if (cleaned.includes('how are you') || cleaned.includes('how r u')) {
            return "I am good, thank you! How can I help you?";
        }
        return "Hello! How can I help you?";
    }

    return null;
}

export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
        }

        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
        }

        try {
            const body = await request.json();
            const message = body.message || "";
            const history = Array.isArray(body.history) ? body.history : [];

            // Fast-path for pure greetings and farewells
            const directConversational = getConversationalReply(message);
            if (directConversational) {
                return new Response(JSON.stringify({ reply: directConversational, source: "conversational_rule" }), {
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                });
            }

            const geminiKey = env.GEMINI_API_KEY || "";
            const grokKey = env.GROK_API_KEY || "";

            // 1. Google Gemini API
            if (geminiKey) {
                const contents = [];
                history.slice(-8).forEach(m => {
                    if (m && m.content) {
                        contents.push({
                            role: m.role === "assistant" ? "model" : "user",
                            parts: [{ text: String(m.content) }]
                        });
                    }
                });
                contents.push({
                    role: "user",
                    parts: [{ text: message }]
                });

                const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey.trim()}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        system_instruction: {
                            parts: [{ text: SYSTEM_PROMPT }]
                        },
                        contents: contents,
                        generationConfig: {
                            temperature: 0.2
                        }
                    })
                });

                if (geminiRes.ok) {
                    const data = await geminiRes.json();
                    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (reply) {
                        return new Response(JSON.stringify({ reply, source: "gemini_api" }), {
                            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                        });
                    }
                }
            }

            // 2. Grok fallback
            if (grokKey) {
                const model = env.GROK_MODEL || "grok-beta";
                const messages = [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...history.slice(-8).map(m => ({ role: m.role, content: m.content })),
                    { role: "user", content: message }
                ];

                const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${grokKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        temperature: 0.3,
                        max_tokens: 800
                    })
                });

                if (upstream.ok) {
                    const data = await upstream.json();
                    const reply = data.choices?.[0]?.message?.content;
                    if (reply) {
                        return new Response(JSON.stringify({ reply, source: "grok_api" }), {
                            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
                        });
                    }
                }
            }

            // Fallback response with contact guidance
            return new Response(JSON.stringify({
                reply: "Welcome to DiginixIT. For consultations regarding Dr. Nadeem Nazir (Chief Executive) and our engineering studio, please contact us at contact@diginix.com or +92 300 7960300.",
                source: "local_fallback"
            }), {
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }
    }
};
