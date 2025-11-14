const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../dist/code.js'); // Change path if needed
const content = fs.readFileSync(targetFile, 'utf8');

const stripped = content.replace(/export\s*{\s*[^}]*\s*};?\s*$/gm, '');

fs.writeFileSync(targetFile, stripped);
console.log('Removed export block from:', targetFile);
