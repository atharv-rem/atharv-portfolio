const opentype = require('opentype.js');
const path = require('path');
const fs = require('fs');

const fontPath = path.join(__dirname, '../public/LastoriaBoldRegular.otf');

try {
  const fileBuffer = fs.readFileSync(fontPath);
  const arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);
  const font = opentype.parse(arrayBuffer);
  
  const text = 'atharv';
  const fontSize = 32;
  const baseline = fontSize * 1.5;
  let x = fontSize * 0.1;
  
  const result = [];
  for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const glyph = font.charToGlyph(char);
      const path = glyph.getPath(x, baseline, fontSize);
      const pathData = path.toPathData(3);
      result.push(pathData);
      const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
      x += advanceWidth * (fontSize / font.unitsPerEm);
  }
  
  const outputData = JSON.stringify({
    paths: result,
    width: x + fontSize * 0.1
  }, null, 2);
  
  fs.writeFileSync(path.join(__dirname, 'output.json'), outputData);
  console.log("Paths written to scratch/output.json successfully");
} catch (e) {
  console.error(e);
}
