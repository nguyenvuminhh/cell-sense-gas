const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../dist/Code.js');
const content = fs.readFileSync(targetFile, 'utf8');

const apiUrl = process.env.API_URL;
console.log('Replacing API URL placeholder with:', apiUrl);

const stripped = content.replace('API_URL_PLACEHOLDER', apiUrl);

fs.writeFileSync(targetFile, stripped);
console.log('Removed export block from:', targetFile);
