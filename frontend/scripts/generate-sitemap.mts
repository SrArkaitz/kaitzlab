// Genera public/sitemap.xml a partir de las páginas de la navegación. Se ejecuta antes de cada
// build (script "prebuild"); Node 24 ejecuta TypeScript directamente.
import { writeFileSync } from 'node:fs';
import { NAV_ITEMS } from '../src/app/core/navigation.ts';

const SITE_URL = 'https://kaitzlab.com';
const today = new Date().toISOString().slice(0, 10);

const urls = NAV_ITEMS.map(
  (item) =>
    `  <url>\n    <loc>${SITE_URL}/${item.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${NAV_ITEMS.length} páginas`);
