import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
    'contact',
    'about',
    'membership',
    'gallery',
    'pay',
    'privacy-policy',
    'services/computer-solutions',
    'services/mobile-repair',
    'services/cctv-solutions',
    'services/digital-marketing',
    'services/meta-ads',
    'services/google-ads',
    'services/mobile-app-development',
    'services/website-design',
    'services/web-apps',
    'services/media-production',
    'software/bill-maker',
    'software/make-invoice',
    'software/make-quotation',
    'software/pc-build',
    'software/inventory',
    'software/requirement-maker',
    'pricing/website-design',
    'pricing/app-development',
    'pricing/media-production'
];

const distDir = path.join(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
    console.error('index.html not found in dist/. Run build first.');
    process.exit(1);
}

const htmlContent = fs.readFileSync(indexHtml, 'utf-8');

routes.forEach(route => {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent);
    console.log(`Generated: ${route}/index.html`);
});

console.log('Static routes generation complete!');
