# DiginixIT Chatbot Package (Google Gemini AI)

This folder contains all files required to integrate the DiginixIT AI Chatbot into your existing website deployment, powered by **Google Gemini AI** with strict business-context guardrails.

---

## 📦 Package Contents

| File | Purpose |
|---|---|
| `chatbot.js` | **Frontend Widget**: Standalone drop-in script. Handles floating launcher (robot bot icon), popup modal, auto-scrolling, markdown formatting, and quick suggestion chips. Zero external dependencies. |
| `knowledge-base.js` | **Full Dataset & System Prompt**: Contains the complete hardcoded knowledge base (Dr. Nadeem Nazir, Web Engineering, UI/UX, Technical SEO, Law & Compliance, Corporate Finance, studio addresses, and contacts) with strict domain-boundary guardrails. |
| `server-route.js` | **Backend Handler (Express / Node.js)**: Proxies user inquiries securely to the Google Gemini API (`@google/genai`, model `gemini-3.8-flash`) using your private `GEMINI_API_KEY`. Enforces strict context confinement. |
| `cloudflare-worker.js` | **Cloudflare Worker**: Turnkey serverless function for deployments using Cloudflare Pages / Workers. |
| `demo.html` | **Instant Test Page**: Double-click or open in a browser to test the floating widget and chat modal locally. |
| `.env.example` | **Environment Config**: Shows how to supply `GEMINI_API_KEY`. |

---

## 🛡️ Context Guardrail & Out-of-Scope Rule

The chatbot is strictly bounded to DiginixIT's context:
- It **only** answers queries regarding DiginixIT, Dr. Nadeem Nazir & leadership, the 5 core service pillars, technology stack, studio locations, and official contact channels.
- If a user asks an irrelevant or out-of-scope question (general trivia, recipes, unrelated coding problems, sports, politics, etc.):
  - The chatbot **does not** answer the irrelevant topic.
  - It clearly states that the query is not in its database.
  - It directs the visitor to contact DiginixIT directly at **`contact@diginix.com`** or call/WhatsApp **`+92 300 7960300`**.

---

## 🚀 Quick Setup (2 Steps)

### Step 1: Add to Frontend
In your website's HTML template or pages (before `</body>`), add:

```html
<script src="/chatbot.js" defer></script>
```

*Note: If your API route is hosted on a different URL or port, set it before the script tag:*
```html
<script>
  window.DIGINIX_CHAT_ENDPOINT = '/api/chat'; // default is '/api/chat'
</script>
<script src="/chatbot.js" defer></script>
```

---

### Step 2: Mount the API Route (Backend)

#### Option A: Node.js / Express Server
Install `@google/genai` (if not already installed):
```bash
npm install @google/genai
```

In your server file (e.g. `server.js` or `app.js`):

```javascript
import express from 'express';
import { chatHandler } from './chatbot-package/server-route.js';

const app = express();
app.use(express.json());

// Mount the chat endpoint
app.post('/api/chat', chatHandler);
```

#### Option B: Cloudflare Workers
Deploy `cloudflare-worker.js` and bind the secret:
```bash
npx wrangler secret put GEMINI_API_KEY
```

---

## 🔑 Gemini API Key Configuration

Add your Google Gemini API key to your server `.env` or hosting provider environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

- **Live AI Mode**: If `GEMINI_API_KEY` is present, inquiries are processed live by Google Gemini (`gemini-3.8-flash`) using the strict DiginixIT context system instruction.
- **Fail-Safe Local Mode**: If the API key is missing or the network drops, the backend automatically uses the built-in verified knowledge base for Dr. Nadeem Nazir and DiginixIT, adhering to the same strict relevance checks.

