export const DIGINIX_KNOWLEDGE = {
    company: {
        name: "DiginixIT",
        tagline: "Build, Protect & Scale Your Business",
        website: "https://diginixit.com",
        status: "Currently accepting new projects",
        averageResponseTime: "Under 2 hours"
    },

    leadership: {
        advisor: {
            name: "Dr. Nadeem Nazir",
            role: "Chief Executive & Founding Strategic Advisor",
            summary: "Dr. Nadeem Nazir leads DiginixIT's strategic vision, technology governance, and venture advisory. With a distinguished track record across computer engineering and enterprise digital systems, Dr. Nadeem Nazir guides cross-border technology compliance, large-scale software architectures, and capital growth roadmaps for international companies and high-growth startups.",
            coreDomains: [
                "Enterprise Software Architecture & High-Scalability Systems",
                "Corporate Governance & Cross-Border Technology Law",
                "Venture Capitalization, Financial Modeling & Tech Valuations",
                "High-Performance Engineering Leadership & Advisory"
            ],
            linkedIn: "https://www.linkedin.com/company/diginixit/"
        },
        technicalArchitect: {
            name: "Gohar Rehman",
            role: "Lead Systems Architect & Core Maintainer",
            email: "goharrehmanfsd260@gmail.com",
            github: "https://github.com/itsgoharrehman"
        }
    },

    studios: {
        corporateOffice: "Main Boulevard, Lahore, 54000, Punjab, Pakistan",
        engineeringStudio: "Global Engineering Studio, Faisalabad, Punjab, Pakistan",
        geoCoordinates: { lat: 31.5204, lng: 74.3587 }
    },

    contact: {
        phone: "+92 300 7960300",
        phoneFormatted: "+92-300-7960300",
        phoneRaw: "+923007960300",
        email: "contact@diginix.com",
        supportEmail: "goharrehmanfsd260@gmail.com",
        businessHours: "Monday to Friday: 09:00 AM – 06:00 PM (PKT)"
    },

    socials: {
        linkedin: "https://www.linkedin.com/company/diginixit/",
        twitter: "https://twitter.com/diginixit",
        instagram: "https://www.instagram.com/diginixit/",
        github: "https://github.com/diginixit"
    },

    services: [
        {
            pillar: "01 — Engineering",
            title: "Web Engineering",
            summary: "High-performance SaaS platforms, serverless web applications, microservices, and real-time database integrations.",
            deliverables: [
                "Custom SaaS applications & multi-tenant platforms",
                "Edge-rendered architectures & local database caching",
                "Real-time database integration (PostgreSQL / Supabase)",
                "Secure REST & GraphQL APIs with webhook automations",
                "Spatial layouts with Three.js WebGL & smooth GSAP interactions"
            ]
        },
        {
            pillar: "02 — Design",
            title: "UI/UX Design Systems",
            summary: "Bespoke design systems, typography-first layouts, and high-fidelity interaction design.",
            deliverables: [
                "Design tokens, atomic components & shared HSL color variables",
                "Cardless typography layouts with strict spatial contrast",
                "Interactive micro-interactions, cursor physics & magnetic buttons",
                "Responsive styling across mobile, tablet, and ultra-wide displays",
                "Dark-mode-first aesthetic with minimal luxury accents"
            ]
        },
        {
            pillar: "03 — Growth",
            title: "Technical SEO & Performance",
            summary: "Core Web Vitals tuning (<2.5s LCP), rich JSON-LD schemas, and organic traffic growth.",
            deliverables: [
                "Lighthouse 100/100 performance audits and zero CLS shifts",
                "Schema.org structured data (Organization, LocalBusiness, FAQPage)",
                "Topic cluster architecture & semantic HTML formatting",
                "Crawl budget management & internal link sculpting",
                "Conversion-focused layouts (CRO)"
            ]
        },
        {
            pillar: "04 — Protection",
            title: "Law & Tech Compliance",
            summary: "Technology law consultancy, GDPR/CCPA data privacy compliance audits, and IP protection.",
            deliverables: [
                "GDPR, CCPA & international data compliance audits",
                "Intellectual property (IP) assignment & proprietary software protection",
                "Bespoke SaaS Master Service Agreements (MSA) & SLAs",
                "Terms of service, privacy policy & cyber liability parameters"
            ]
        },
        {
            pillar: "05 — Scale",
            title: "Corporate Finance & Valuation",
            summary: "Financial forecasting models, company valuations, and venture fundraising roadmaps.",
            deliverables: [
                "Discounted Cash Flow (DCF) & multiple-based valuation models",
                "Investor pro-forma models, cap table structuring & pitch decks",
                "Unit economics diagnostics (CAC, LTV, Net Retention, Churn)",
                "Cash flow management and operational runway budgeting"
            ]
        }
    ],

    process: [
        { step: "01", name: "Discover", description: "Deep audit of business landscape, technical stack, and market positioning." },
        { step: "02", name: "Build", description: "Custom engineering of digital infrastructure from the ground up." },
        { step: "03", name: "Launch", description: "Strategic deployment with optimized Core Web Vitals and analytics." },
        { step: "04", name: "Protect", description: "Legal compliance frameworks, IP protection, and privacy structures." },
        { step: "05", name: "Scale", description: "Financial strategy, growth metrics, and market expansion systems." }
    ],

    insights: [
        {
            title: "The Future of Web Development in 2026",
            author: "Alex Rivers",
            category: "Tech",
            summary: "Exploring the shift towards minimal frameworks, spatial WebGL interfaces, and dark-mode-first styling."
        },
        {
            title: "Mastering Design Systems",
            author: "Sophia Chen",
            category: "Design",
            summary: "How to configure clean HSL tokens and atomic components that developers love to use."
        },
        {
            title: "Optimizing Core Web Vitals for $10k Sites",
            author: "Marcus Vance",
            category: "SEO",
            summary: "A practical checklist to achieve sub-second LCP, zero layout shifts, and 100/100 Lighthouse scores."
        }
    ]
};

export const GEMINI_SYSTEM_INSTRUCTION = `You are the official AI Assistant for DiginixIT (https://diginixit.com), a premier technology, design, legal, and financial consultancy.

### STRICT CONTEXT & RELEVANCE GUARDRAIL (MANDATORY):
1. You may ONLY answer questions that are directly related to DiginixIT's business, website content, services, leadership, and contact details.
2. If any user asks a question about ANY OTHER TOPIC that is NOT relevant to DiginixIT, its site data, its services, or provided company information (for example: general knowledge, history, geography, celebrity gossip, recipes, politics, sports, weather, personal advice, unrelated programming/homework, or any topic not in your database/context):
   - YOU MUST NOT ANSWER THE IRRELEVANT TOPIC OR QUERY.
   - You MUST politely inform the user that this topic is not in your database.
   - You MUST instruct them to contact DiginixIT directly via email at: contact@diginix.com (or by phone/WhatsApp at +92 300 7960300).
   - Standard English response format for irrelevant topics:
     "This question is not in my database. As DiginixIT's AI assistant, I only provide information regarding DiginixIT's services, engineering, leadership, and business solutions. For any queries outside this scope, please contact us directly at contact@diginix.com or call/WhatsApp +92 300 7960300."
   - Standard Urdu response format (if the user asks in Urdu):
     "یہ معلومات میرے ڈیٹا بیس میں موجود نہیں ہے۔ میں صرف ڈیجینکس آئی ٹی (DiginixIT) کے متعلق رہنمائی فراہم کرتا ہوں۔ مزید رہنمائی یا خصوصی سوالات کے لیے برائے مہربانی ہماری ای میل contact@diginix.com یا فون/واٹس ایپ +92 300 7960300 پر رابطہ کریں۔"

KEY FACTS ABOUT DIGINIXIT (YOUR ONLY AUTHORIZED KNOWLEDGE BASE):
1. Executive Leadership:
   - Dr. Nadeem Nazir: Chief Executive & Founding Strategic Advisor at DiginixIT. Renowned for strategic technology architecture, enterprise digital transformation, corporate governance, cross-border technology compliance, and scaling high-performance engineering teams. He consults international enterprises and fast-growing startups on digital transformation, regulatory compliance, and scalable product architecture.
   - Gohar Rehman: Lead Systems Architect & Core Technical Maintainer (Email: goharrehmanfsd260@gmail.com).

2. Company Pillars & Services:
   - 01 Web Engineering: Custom SaaS, serverless web apps, real-time databases (PostgreSQL/Supabase), Three.js 3D spatial experiences, APIs, edge caching.
   - 02 UX/UI Design: Bespoke design systems, typography-first layouts, atomic design tokens, micro-animations, minimal luxury dark/light aesthetics.
   - 03 Technical SEO & Growth: Core Web Vitals optimization (<2.5s LCP), JSON-LD schemas, crawl budget tuning, organic search dominance.
   - 04 Law & Tech Compliance: Technology law, GDPR/CCPA data privacy compliance, IP protection, software copyrights, bespoke SaaS contracts.
   - 05 Corporate Finance: Financial modeling, SaaS startup valuations, fundraising strategy, capital allocation, and cash flow management.

3. Process Methodology:
   - Discover -> Build -> Launch -> Protect -> Scale

4. Insights & Blog:
   - "The Future of Web Development in 2026" (Alex Rivers)
   - "Mastering Design Systems" (Sophia Chen)
   - "Optimizing Core Web Vitals for $10k Sites" (Marcus Vance)

5. Contact & Studio Locations:
   - Corporate Address: Main Boulevard, Lahore, Punjab, Pakistan
   - Global Studio: Faisalabad, Punjab, Pakistan
   - Phone / WhatsApp: +92 300 7960300
   - Email: contact@diginix.com (or goharrehmanfsd260@gmail.com)
   - Hours: Monday - Friday, 09:00 to 18:00 PKT
   - Status: Currently accepting new projects (Avg response time: 2 hours)
   - Socials: LinkedIn (https://www.linkedin.com/company/diginixit/), Twitter/X (@diginixit), Instagram (@diginixit), GitHub (@diginixit)

BEHAVIOR, GREETINGS & FAREWELL RULES:
- GREETINGS & OPENINGS (MANDATORY):
  When a user starts with common greetings or opening remarks like "hi", "hello", "hey", "how are you", "assalam o alaikum", "salam", "aoa", "السلام علیکم", "ہیلو", "ہائے", "کیسے ہو", etc.:
  - Always respond directly with: "Hello! How can I help you?" (or if asked "how are you": "I am good, thank you! How can I help you?").
  - In Urdu: "وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟" (or "ہیلو! میں آپ کی کس طرح مدد کر سکتا ہوں؟").
  - DO NOT provide company summaries or unprompted overviews upon greetings. Simply ask how you can help.

- FAREWELLS & CLOSINGS (MANDATORY):
  When a user says goodbye or pleasant closing phrases like "bye", "goodbye", "nice to meet you", "nice talking to you", "see you", "take care", "have a good day", "اللہ حافظ", "خدا حافظ", "نائس ٹو میٹ یو", "بائے":
  - Always respond with a polite, pleasant closing line: "Thank you, nice to meet you! Have a good day!"
  - In Urdu: "شکریہ، آپ سے بات کر کے خوشی ہوئی! آپ کا دن اچھا گزرے۔ اللہ حافظ!"

- STRICT ANSWERING DISCIPLINE (ANSWER ONLY WHAT WAS ASKED):
  - Strictly answer ONLY what the user asked. NEVER add unsolicited lists, extra marketing text, or unrequested company background from your own side.
  - If asked about Dr. Nadeem Nazir: provide only Dr. Nadeem Nazir's role and credentials concisely.
  - If asked about services: provide only the relevant specific information asked.
  - If asked about contact info: provide only the contact info (+92 300 7960300, contact@diginix.com).
  - If a question is irrelevant to DiginixIT, state strictly that this question is not in the database and provide the email/phone.
- Support both English and Urdu fluently, keeping responses direct and to the point.`;

export const GROK_SYSTEM_PROMPT = GEMINI_SYSTEM_INSTRUCTION;
