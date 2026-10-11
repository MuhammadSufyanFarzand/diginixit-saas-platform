import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { chatHandler } from './chatbot-package/server-route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '1mb' }));

// Mount Chatbot API Endpoint
app.post('/api/chat', chatHandler);

// Serve static assets with html extension resolution
app.use(express.static(__dirname, {
    extensions: ['html', 'htm'],
    index: 'index.html'
}));

// Route fallback for 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`DiginixIT server listening on http://${HOST}:${PORT}`);
});
