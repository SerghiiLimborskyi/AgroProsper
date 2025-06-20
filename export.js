import fs from 'fs';
import { google } from 'googleapis';
import 'dotenv/config';

const SHEET_ID = process.env.SHEET_ID;
const RANGE = 'Form Responses 1';

async function fetchResponses() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log(`[${new Date().toISOString()}] ❌ Даних поки нема`);
    return;
  }

  const csv = rows.map(r => r.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');
  fs.writeFileSync('responses.csv', csv, 'utf8');
  console.log(`[${new Date().toISOString()}] ✅ responses.csv оновлено`);
}

console.log('🔁 Старт автооновлення (кожні 5 хв)...');
fetchResponses();
setInterval(fetchResponses, 5 * 60 * 1000);
