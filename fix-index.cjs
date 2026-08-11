const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The import map is unnecessary for a Vite build (Vite bundles everything), 
// but wait, is it causing issues? It might download those things from esm.sh!
const importMapRegex = /<script type="importmap">[\s\S]*?<\/script>/;
html = html.replace(importMapRegex, '');

fs.writeFileSync('index.html', html);
