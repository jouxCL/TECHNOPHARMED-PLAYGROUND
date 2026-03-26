const fs = require('fs');
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// Replace import
content = content.replace(`import Navbar from '../components/Navbar.astro';`, `import Layout from '../layouts/Layout.astro';`);

// Remove everything from <script> at top to just before the HERO css comment
const topStart = content.indexOf('<script>');
const topEnd = content.indexOf('/* ════════════════════════════════════\n         HERO');
content = content.slice(0, topStart) + '<Layout title="Technopharmed – Soluciones Farmacéuticas">\n  <style>\n      ' + content.slice(topEnd);

// Remove the Navbar tag
content = content.replace(/\s*<Navbar \/>\s*/, '\n\n');

// Clean up the script block: keep only Hero particles and Card tilt
const scriptBlockRegex = /\/\* ══ SCROLL REVEAL ══ \*\/[\s\S]*?\/\* ══ HERO PARTICLE CANVAS – Enhanced ══ \*\//;
content = content.replace(scriptBlockRegex, '/* ══ HERO PARTICLE CANVAS – Enhanced ══ */');

// Close Layout instead of </body></html>
content = content.replace(/\s*<\/body>\s*<\/html>\s*/, '\n</Layout>\n');

fs.writeFileSync('src/pages/index.astro', content);
console.log('index.astro refactored to use Layout.astro!');
