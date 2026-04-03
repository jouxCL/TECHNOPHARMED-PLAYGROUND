const fs = require('fs');

// 1. Read index.astro
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// 2. Extract CSS
const cssSearch = '/* ════════════════════════════════════\n         FOOTER';
const cssStart = content.indexOf(cssSearch);
const cssEnd = content.indexOf('</style>');

let footerCSS = '';
if (cssStart !== -1) {
    footerCSS = content.slice(cssStart, cssEnd);
    content = content.slice(0, cssStart) + content.slice(cssEnd);
}

// 3. Extract HTML
const htmlStart = content.indexOf('<!-- ═══ FOOTER ═══ -->');
const htmlEnd = content.indexOf('</footer>') + 9; // length of </footer>

let footerHTML = '';
if (htmlStart !== -1) {
    footerHTML = content.slice(htmlStart, htmlEnd);
    content = content.slice(0, htmlStart) + content.slice(htmlEnd);
}

// 4. Save Footer.astro
const footerAstro = `---
// src/components/Footer.astro
---
<style>
${footerCSS.trim()}
</style>

${footerHTML.trim()}
`;
fs.writeFileSync('src/components/Footer.astro', footerAstro);

// 5. Update index.astro
fs.writeFileSync('src/pages/index.astro', content);

// 6. Inject Footer into Layout.astro
let layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
if (!layout.includes('Footer.astro')) {
    layout = layout.replace(
        `import Navbar from '../components/Navbar.astro';`, 
        `import Navbar from '../components/Navbar.astro';\nimport Footer from '../components/Footer.astro';`
    );
    layout = layout.replace(
        `</main>`, 
        `</main>\n\n    <Footer />`
    );
    fs.writeFileSync('src/layouts/Layout.astro', layout);
}

console.log('Footer extracted successfully!');
