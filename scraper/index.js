const fs = require('fs');
const { google } = require('googleapis');

require('dotenv').config();

const sheetId = '1ZsZCBTpKjHzdbCpKZ1No1KAdpmOd2OcgSMfC1-oa7pI';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_API_KEY,
});

const colorToLevelMap = {
  '1,1,1': 0,
  '1,0.9490196,0.8': 1,
  '1,0.8509804,0.4': 2,
};

function recommendationLevelForColor(color) {
  const key = [color.red, color.green, color.blue].join(',');
  return colorToLevelMap[key];
}

async function main() {
  let resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    majorDimension: 'ROWS',
    range: 'A5:Z',
  });

  const entries = [];

  for (let row of resp.data.values) {
    if (row[0] === 'Date') continue;

    const [date, title, url, event, location, notes, englishUrl] = row;
    const entry = { date, title, url, event, location, notes, englishUrl };
    entries.push(entry);
  }

  // get colors...
  resp = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    includeGridData: true,
    ranges: 'A6:A',
  });

  const sheet = resp.data.sheets[0];
  const rows = sheet.data[0].rowData;
  for (let i = 0; i < rows.length && i < entries.length; i += 1) {
    const color = rows[i].values[0].effectiveFormat.backgroundColor;
    const level = recommendationLevelForColor(color);
    entries[i].recommendationLevel = level;
  }

  fs.writeFileSync('matches.json', JSON.stringify({ entries }, undefined, 2), {
    encoding: 'utf8',
  });
}

main().catch(console.error);
