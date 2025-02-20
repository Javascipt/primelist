import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

const dataDir = path.resolve(__dirname, '../data');

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    process.exit(1);
  }

  files.forEach((file) => {
    if (/^list\d+\.json$/.test(file)) {
      const filePath = path.join(dataDir, file);
      const outputPath = filePath.replace('.json', '.br');

      if (fs.existsSync(outputPath)) {
        console.log(`Skipped ${file} as ${path.basename(outputPath)} already exists.`);
        return;
      }

      try {
        const inputData = fs.readFileSync(filePath, 'utf8');
        const compressedData = zlib.brotliCompressSync(Buffer.from(inputData, 'utf8'));
        fs.writeFileSync(outputPath, compressedData);
        console.log(`Compressed ${file} to ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Error compressing ${file}:`, err);
      }
    }
  });
});
