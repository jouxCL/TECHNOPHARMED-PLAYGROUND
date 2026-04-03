const fs = require('fs');

let content = fs.readFileSync('src/pages/punzoneria.astro', 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>') + 8;
const styleContent = content.slice(styleStart, styleEnd);

// Quitar los estilos de donde están
content = content.replace(styleContent, '');

// Añadirlos debajo de </Layout> para que Astro los catalogue y compile correctamente
content = content.replace('</Layout>', '</Layout>\n\n' + styleContent);

fs.writeFileSync('src/pages/punzoneria.astro', content);
console.log('punzoneria.astro styles successfully moved to root!');
