import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { chatHandler } from './chatbot-package/server-route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Determine application listening port:
// - In AI Studio, DEFAULT_APP_PORT is 3000 while Nginx listens on 8080 and proxies to 3000.
// - If NGINX_PORT is set to 8080, avoid binding to 8080 to prevent EADDRINUSE crash.
// - In standard Cloud Run or container environments, bind to process.env.PORT.
let PORT = 3000;
if (process.env.DEFAULT_APP_PORT) {
    PORT = parseInt(process.env.DEFAULT_APP_PORT, 10);
} else if (process.env.PORT) {
    const envPort = parseInt(process.env.PORT, 10);
    if (process.env.NGINX_PORT && envPort === parseInt(process.env.NGINX_PORT, 10)) {
        PORT = 3000;
    } else {
        PORT = envPort;
    }
}
const HOST = '0.0.0.0';

app.use(express.json({ limit: '1mb' }));

// Health check endpoint for container environments
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount Chatbot API Endpoint
app.post('/api/chat', chatHandler);

// Clean URLs and trailing slash resolution (e.g., /services/, /services -> services.html)
app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path === '/' || req.path.startsWith('/api/')) return next();

    let clean = req.path;
    if (clean.endsWith('/')) {
        clean = clean.slice(0, -1);
    }

    const distDir = path.join(__dirname, 'dist');
    const candidates = [
        path.join(distDir, clean + '.html'),
        path.join(__dirname, clean + '.html'),
        path.join(distDir, clean, 'index.html'),
        path.join(__dirname, clean, 'index.html')
    ];

    for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
            return res.sendFile(cand);
        }
    }
    next();
});

// Serve static assets from dist directory first if built
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, {
        extensions: ['html', 'htm'],
        index: 'index.html'
    }));
}

// Serve root static assets with html extension resolution
app.use(express.static(__dirname, {
    extensions: ['html', 'htm'],
    index: 'index.html'
}));

// Route fallback for 404 errors
app.use((req, res) => {
    const errorPage = fs.existsSync(path.join(__dirname, 'dist', '404.html'))
        ? path.join(__dirname, 'dist', '404.html')
        : path.join(__dirname, '404.html');
    res.status(404).sendFile(errorPage);
});

app.listen(PORT, HOST, () => {
    console.log(`DiginixIT server listening on http://${HOST}:${PORT}`);
});
