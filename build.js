import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

console.log('Building DiginixIT static assets and routing bundle...');

// Clean and recreate dist
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Helper to copy recursively
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const child of fs.readdirSync(src)) {
            copyRecursive(path.join(src, child), path.join(dest, child));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy static asset directories
const assetDirs = ['css', 'js', 'images', 'chatbot-package'];
for (const dir of assetDirs) {
    const srcDir = path.join(__dirname, dir);
    const destDir = path.join(distDir, dir);
    if (fs.existsSync(srcDir)) {
        copyRecursive(srcDir, destDir);
        console.log(`Copied directory: ${dir}`);
    }
}

// Copy top-level standalone asset files
const standaloneFiles = [
    'chatbot.js',
    'favicon.svg',
    'CNAME',
    'robots.txt',
    'sitemap.xml',
    'ads.txt'
];
for (const file of standaloneFiles) {
    const srcFile = path.join(__dirname, file);
    if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, path.join(distDir, file));
        console.log(`Copied asset: ${file}`);
    }
}

// Process HTML files and generate clean URL directory indexes
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const htmlFile of htmlFiles) {
    const src = path.join(__dirname, htmlFile);
    const dest = path.join(distDir, htmlFile);
    fs.copyFileSync(src, dest);

    const baseName = path.basename(htmlFile, '.html');
    if (baseName !== 'index' && baseName !== '404') {
        const subDir = path.join(distDir, baseName);
        fs.mkdirSync(subDir, { recursive: true });
        fs.copyFileSync(src, path.join(subDir, 'index.html'));
    }
    console.log(`Processed HTML: ${htmlFile}`);
}

// Generate _redirects for Cloudflare Pages / Netlify
const redirects = [
    '/services /services.html 200',
    '/blog /blog.html 200',
    '/article /article.html 200',
    '/contact /contact.html 200',
    '/auth /auth.html 200',
    '/profile /profile.html 200',
    '/chatbot /chatbot.html 200',
    '/admin /admin.html 200',
    '/admin_login /admin_login.html 200',
    '/maintenance /maintenance.html 200',
    '/services/ /services.html 200',
    '/blog/ /blog.html 200',
    '/article/ /article.html 200',
    '/contact/ /contact.html 200',
    '/auth/ /auth.html 200',
    '/profile/ /profile.html 200',
    '/chatbot/ /chatbot.html 200',
    '/admin/ /admin.html 200',
    '/admin_login/ /admin_login.html 200',
    '/maintenance/ /maintenance.html 200',
    '/* /404.html 404'
].join('\n');

fs.writeFileSync(path.join(distDir, '_redirects'), redirects + '\n', 'utf8');

console.log('Build completed successfully into dist/');
