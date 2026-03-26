const fs = require('fs');

let code = fs.readFileSync('src/pages/index.astro', 'utf8');

// Extraer el bloque de <style>
const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/);
let styleBlock = '';
if (styleMatch) {
  styleBlock = styleMatch[1];
  code = code.replace(styleMatch[0], ''); 
}

// Limpiar todas las basuras de HTML estructurales que quedaron huerfanas adentro de Layout
code = code.replace(/<html[^>]*>/ig, '');
code = code.replace(/<\/html>/ig, '');
code = code.replace(/<head[^>]*>/ig, '');
code = code.replace(/<\/head>/ig, '');
code = code.replace(/<body[^>]*>/ig, '');
code = code.replace(/<\/body>/ig, '');

// Insertar <style is:global> al final
code = code.replace('</Layout>', '</Layout>\n\n<style is:global>\n' + styleBlock + '\n</style>');

fs.writeFileSync('src/pages/index.astro', code);
console.log('Fixed index.astro successfully!');
