import { create } from 'ipfs-http-client';
import fs from 'fs';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const upload = async (filePath) => {
  try {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add({ content: file });
    console.log(`✅ Файл ${filePath} завантажено`);
    console.log(`🆔 CID: ${result.cid.toString()}`);
  } catch (err) {
    console.error('💥 Помилка при завантаженні:', err.message);
  }
};

upload('./metadata/starter.json'); // заміни шлях на свій
