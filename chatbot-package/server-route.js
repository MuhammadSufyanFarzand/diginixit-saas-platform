import { GoogleGenAI } from '@google/genai';
import { DIGINIX_KNOWLEDGE, GEMINI_SYSTEM_INSTRUCTION } from './knowledge-base.js';

let geminiClient = null;
let cachedKey = null;

function getGeminiInstance() {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) return null;
    if (!geminiClient || cachedKey !== key) {
        geminiClient = new GoogleGenAI({
            apiKey: key.trim(),
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build'
                }
            }
        });
        cachedKey = key;
    }
    return geminiClient;
}

function isUrduText(text) {
    return /[\u0600-\u06FF]/.test(text || '');
}

export function getConversationalReply(query) {
    const raw = (query || '').trim();
    if (!raw) return null;

    const isUrdu = isUrduText(raw);
    const cleaned = raw.toLowerCase()
        .replace(/[?!.,;:_~#*()"'`\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Check pure greetings (single greeting or greeting + bot/sir/there)
    const greetings = [
        'hi', 'hello', 'hey', 'heyy', 'hiya', 'howdy',
        'how are you', 'how are you doing', 'how r u', 'how do you do', "what's up", 'whats up',
        'good morning', 'good afternoon', 'good evening', 'greetings',
        'salam', 'assalam', 'assalamu alaikum', 'assalam o alaikum', 'assalam u alaikum', 'assalam alaykum', 'aoa', 'slam',
        'kaise ho', 'kaisay ho', 'kya haal hai', 'kia hal hai', 'kia haal hay', 'kese ho'
    ];

    const urduGreetings = [
        'السلام علیکم', 'سلام', 'ہیلو', 'ہائے', 'کیسے ہو', 'کیسی ہو', 'کیا حال ہے', 'کیسے ہیں',
        'ہاؤ آر یو', 'ہاؤ ار یو', 'ہاو ار یو', 'ہائو آر یو'
    ];

    // Check pure farewells
    const farewells = [
        'bye', 'goodbye', 'good bye', 'byee', 'bye bye',
        'see you', 'see ya', 'see you later', 'nice to meet you', 'nice meeting you', 'nice talking to you',
        'have a good day', 'have a great day', 'have a nice day', 'take care', 'cya',
        'allah hafiz', 'khuda hafiz', 'alvida', 'shukriya bye', 'thanks bye'
    ];

    const urduFarewells = [
        'بائے', 'گڈ بائے', 'نائس ٹو میٹ یو', 'اللہ حافظ', 'خدا حافظ', 'الوداع'
    ];

    // If pure farewell
    const isFarewell = farewells.some(f => cleaned === f || cleaned === `${f} bot` || cleaned === `ok ${f}` || cleaned === `okay ${f}`) ||
        urduFarewells.some(f => raw.includes(f) && raw.length < 30);

    if (isFarewell) {
        if (isUrdu) {
            return "شکریہ، آپ سے بات کر کے خوشی ہوئی! آپ کا دن اچھا گزرے۔ اللہ حافظ!";
        }
        return "Thank you, nice to meet you! Have a good day!";
    }

    // If pure greeting
    const isGreeting = greetings.some(g => cleaned === g || cleaned === `${g} bot` || cleaned === `${g} there` || cleaned === `${g} sir`) ||
        urduGreetings.some(g => raw.includes(g) && raw.length < 30);

    if (isGreeting) {
        if (isUrdu) {
            if (raw.includes('السلام علیکم') || raw.includes('سلام') || cleaned.includes('salam') || cleaned.includes('aoa')) {
                return "وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟";
            }
            if (raw.includes('ہاؤ آر یو') || raw.includes('ہاؤ ار یو') || raw.includes('ہاو ار یو') || raw.includes('کیسے ہو') || raw.includes('کیسی ہو') || raw.includes('کیا حال ہے')) {
                return "میں ٹھیک ہوں، شکریہ! میں آپ کی کیا مدد کر سکتا ہوں؟";
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

function isDiginixRelevant(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return true;

    // Greeting & generic conversational checks
    const conversational = ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'help', 'who are you', 'what can you do', 'good morning', 'good afternoon', 'good evening', 'menu', 'options', 'start'];
    if (conversational.some(w => q === w || q.startsWith(w + ' ') || q.endsWith(' ' + w))) {
        return true;
    }

    // Business, company, leadership & service keywords
    const keywords = [
        'diginix', 'diginixit', 'company', 'agency', 'consult', 'service', 'services', 'pillar',
        'nadeem', 'nazir', 'doctor', 'dr.', 'dr ', 'ceo', 'advisor', 'founder', 'gohar', 'rehman',
        'web', 'engineer', 'engineering', 'saas', 'software', 'develop', 'app', 'code', 'stack',
        'three.js', 'webgl', 'supabase', 'postgres', 'database', 'backend', 'frontend', 'api',
        'design', 'ui', 'ux', 'figma', 'layout', 'token', 'typography', 'dark mode',
        'seo', 'vitals', 'lcp', 'speed', 'lighthouse', 'rank', 'traffic', 'organic', 'google',
        'law', 'legal', 'compliance', 'gdpr', 'ccpa', 'ip', 'copyright', 'contract', 'msa', 'sla', 'privacy',
        'finance', 'valuation', 'dcf', 'model', 'runway', 'fundrais', 'invest', 'capital', 'cac', 'ltv',
        'contact', 'email', 'phone', 'call', 'whatsapp', 'address', 'office', 'studio', 'lahore', 'faisalabad',
        'pakistan', 'hours', 'timing', 'rate', 'pricing', 'price', 'cost', 'quote', 'hire', 'book',
        'process', 'discover', 'build', 'launch', 'protect', 'scale', 'blog', 'article', 'insight', 'review'
    ];

    // Check if query contains at least one relevant keyword
    return keywords.some(k => q.includes(k));
}

function getFallbackReply(query) {
    const directReply = getConversationalReply(query);
    if (directReply) return directReply;

    const q = (query || '').toLowerCase();
    const { leadership, services, contact, studios } = DIGINIX_KNOWLEDGE;

    // Strict boundary enforcement: Check if query is relevant to DiginixIT
    if (!isDiginixRelevant(query)) {
        if (isUrduText(query)) {
            return `یہ معلومات میرے ڈیٹا بیس میں موجود نہیں ہے۔ میں صرف ڈیجینکس آئی ٹی (DiginixIT) کے متعلق رہنمائی فراہم کرتا ہوں۔\n\nمزید رہنمائی کے لیے ہماری ٹیم سے رابطہ کریں: ای میل **${contact.email}** یا واٹس ایپ **${contact.phone}**۔`;
        }
        return `This question is not in my database.\n\nAs DiginixIT's AI assistant, I only answer questions related to DiginixIT's business, engineering services, leadership, and digital solutions.\n\nFor questions outside this scope, please contact us directly at **${contact.email}** or call/WhatsApp **${contact.phone}**.`;
    }

    if (q.includes('nadeem') || q.includes('nazir') || q.includes('doctor') || q.includes('dr.') || q.includes('ceo') || q.includes('advisor')) {
        const doc = leadership.advisor;
        return `**${doc.name}** is the **${doc.role}** at DiginixIT.\n\n` +
            `${doc.summary}\n\n` +
            `**Direct Consultations:**\n` +
            `• Phone/WhatsApp: [${contact.phone}](tel:${contact.phoneRaw})\n` +
            `• Email: [${contact.email}](mailto:${contact.email})`;
    }

    if (q.includes('web') || q.includes('engineering') || q.includes('saas') || q.includes('software') || q.includes('app') || q.includes('database')) {
        const s = services[0];
        return `**${s.title} (${s.pillar})**\n\n${s.summary}\n\n` +
            `**Deliverables:**\n` +
            s.deliverables.map(d => `• ${d}`).join('\n') + '\n\n' +
            `Contact: [${contact.email}](mailto:${contact.email}) | [${contact.phone}](tel:${contact.phoneRaw})`;
    }

    if (q.includes('design') || q.includes('ui') || q.includes('ux') || q.includes('figma')) {
        const s = services[1];
        return `**${s.title} (${s.pillar})**\n\n${s.summary}\n\n` +
            `**Design Highlights:**\n` +
            s.deliverables.map(d => `• ${d}`).join('\n');
    }

    if (q.includes('seo') || q.includes('vitals') || q.includes('speed') || q.includes('rank')) {
        const s = services[2];
        return `**${s.title} (${s.pillar})**\n\n${s.summary}\n\n` +
            `**Optimization Checklist:**\n` +
            s.deliverables.map(d => `• ${d}`).join('\n');
    }

    if (q.includes('law') || q.includes('compliance') || q.includes('gdpr') || q.includes('legal') || q.includes('ip')) {
        const s = services[3];
        return `**${s.title} (${s.pillar})**\n\n${s.summary}\n\n` +
            `**Compliance Domains:**\n` +
            s.deliverables.map(d => `• ${d}`).join('\n');
    }

    if (q.includes('finance') || q.includes('valuation') || q.includes('fundrais') || q.includes('venture capital') || q.includes('working capital') || q.includes('financial model')) {
        const s = services[4];
        return `**${s.title} (${s.pillar})**\n\n${s.summary}\n\n` +
            `**Valuation & Modeling Solutions:**\n` +
            s.deliverables.map(d => `• ${d}`).join('\n');
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('location') || q.includes('hire') || q.includes('quote')) {
        return `**Contact Channels — DiginixIT:**\n\n` +
            `• **Phone / WhatsApp**: [${contact.phone}](tel:${contact.phoneRaw})\n` +
            `• **Email**: [${contact.email}](mailto:${contact.email})\n` +
            `• **Corporate Headquarters**: ${studios.corporateOffice}\n` +
            `• **Engineering Studio**: ${studios.engineeringStudio}\n` +
            `• **Hours**: ${contact.businessHours}`;
    }

    return `Hello! How can I help you? I can assist you with DiginixIT's engineering, UI/UX, SEO, compliance, financial advisory, or leadership consultations.`;
}

export async function chatHandler(req, res) {
    try {
        const { message, history } = req.body || {};
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Valid message string required' });
        }

        // Fast-path: Greetings and Farewells handled immediately and reliably
        const directConversational = getConversationalReply(message);
        if (directConversational) {
            return res.json({
                reply: directConversational,
                source: 'conversational_rule'
            });
        }

        const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        // 1. Primary Engine: Google Gemini API via @google/genai
        if (geminiKey) {
            try {
                const ai = getGeminiInstance();
                if (ai) {
                    const contents = [];
                    if (Array.isArray(history)) {
                        const recent = history.slice(-8);
                        recent.forEach(m => {
                            if (m && m.content) {
                                contents.push({
                                    role: m.role === 'assistant' ? 'model' : 'user',
                                    parts: [{ text: String(m.content) }]
                                });
                            }
                        });
                    }

                    contents.push({
                        role: 'user',
                        parts: [{ text: message }]
                    });

                    const response = await ai.models.generateContent({
                        model: 'gemini-3.8-flash',
                        contents: contents,
                        config: {
                            systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
                            temperature: 0.2
                        }
                    });

                    const botReply = response.text || getFallbackReply(message);

                    return res.json({
                        reply: botReply,
                        source: 'gemini_api'
                    });
                }
            } catch (geminiErr) {
                console.error('Gemini API call failed, falling back to local knowledge engine:', geminiErr?.message || geminiErr);
            }
        }

        // 2. Secondary Engine: Grok (xAI) if configured
        const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
        if (grokKey) {
            try {
                const model = process.env.GROK_MODEL || 'grok-beta';
                const messages = [
                    { role: 'system', content: GEMINI_SYSTEM_INSTRUCTION }
                ];

                if (Array.isArray(history)) {
                    const recent = history.slice(-8);
                    recent.forEach(m => {
                        if (m && (m.role === 'user' || m.role === 'assistant') && m.content) {
                            messages.push({ role: m.role, content: String(m.content) });
                        }
                    });
                }

                messages.push({ role: 'user', content: message });

                const xaiResponse = await fetch('https://api.x.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${grokKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
                        temperature: 0.3,
                        max_tokens: 800
                    })
                });

                if (xaiResponse.ok) {
                    const data = await xaiResponse.json();
                    const botReply = data.choices?.[0]?.message?.content;
                    if (botReply) {
                        return res.json({
                            reply: botReply,
                            source: 'grok_api'
                        });
                    }
                }
            } catch (grokErr) {
                console.error('Grok API call failed:', grokErr?.message || grokErr);
            }
        }

        // 3. Fallback: Internal DiginixIT Knowledge Engine with strict domain boundaries
        return res.json({
            reply: getFallbackReply(message),
            source: 'local_knowledge'
        });

    } catch (err) {
        console.error('Chat endpoint exception:', err);
        return res.json({
            reply: getFallbackReply(req.body?.message || ''),
            source: 'error_fallback'
        });
    }
}

