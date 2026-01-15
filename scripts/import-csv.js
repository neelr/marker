#!/usr/bin/env node
/**
 * Script to parse Airtable CSV export and generate D1-compatible SQL
 * Usage: node scripts/import-csv.js /path/to/csv > import.sql
 */

import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';

const csvPath = process.argv[2] || '/Users/neelr/Downloads/shorts-Grid 2.csv';

// Parse CSV with proper handling of quoted fields containing newlines
function parseCSV(content) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  // Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else if (char === '"') {
        // End of quoted field
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        // Start of quoted field
        inQuotes = true;
      } else if (char === ',') {
        // Field separator
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        // Row separator
        currentRow.push(currentField);
        currentField = '';
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [];
        if (char === '\r') i++; // Skip \n in \r\n
      } else if (char !== '\r') {
        currentField += char;
      }
    }
  }

  // Handle last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function escapeSQL(str) {
  if (str === null || str === undefined || str === '') {
    return 'NULL';
  }
  // Escape single quotes by doubling them
  return `'${str.replace(/'/g, "''")}'`;
}

try {
  const content = readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  // First row is headers
  const headers = rows[0];
  console.error(`Headers: ${headers.join(', ')}`);
  console.error(`Found ${rows.length - 1} records`);

  // Map headers to expected column names
  // CSV: ID, pass, content, uri
  const idIdx = headers.findIndex(h => h.toLowerCase() === 'id');
  const passIdx = headers.findIndex(h => h.toLowerCase() === 'pass');
  const contentIdx = headers.findIndex(h => h.toLowerCase() === 'content');
  const uriIdx = headers.findIndex(h => h.toLowerCase() === 'uri');

  console.error(`Column indices: id=${idIdx}, pass=${passIdx}, content=${contentIdx}, uri=${uriIdx}`);

  // Generate SQL
  let sql = '-- Auto-generated from Airtable CSV export\n';
  sql += '-- Generated at: ' + new Date().toISOString() + '\n\n';

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue; // Skip empty rows

    const id = row[idIdx] || '';
    const pass = row[passIdx] || '';
    const content = row[contentIdx] || '';
    const uri = row[uriIdx] || '';

    if (!id) continue; // Skip rows without ID

    sql += `INSERT OR REPLACE INTO shorts (id, pass, content, uri) VALUES (${escapeSQL(id)}, ${escapeSQL(pass)}, ${escapeSQL(content)}, ${escapeSQL(uri)});\n`;
  }

  // Write to stdout
  console.log(sql);

  console.error('\nSQL generated successfully!');
  console.error('To import: wrangler d1 execute marker-db --remote --file=./import.sql');

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
