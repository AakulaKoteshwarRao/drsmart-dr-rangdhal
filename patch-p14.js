const fs = require('fs');
const path = require('path');

// 1. Write new config.ts
const configContent = `import type { ClinicConfig } from './types'
import defaultConfig from '../data/default.json'

export async function getConfig(): Promise<ClinicConfig> {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

  if (!clientId) {
    return defaultConfig as ClinicConfig
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return defaultConfig as ClinicConfig
  }

  try {
    const res = await fetch(
      supabaseUrl + '/rest/v1/configs?client_id=eq.' + clientId + '&select=config_json',
      {
        headers: {
          apikey: supabaseKey,
          Authorization: 'Bearer ' + supabaseKey,
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) return defaultConfig as ClinicConfig

    const rows = await res.json()
    if (!rows || rows.length === 0) return defaultConfig as ClinicConfig

    const configJson = rows[0].config_json
    if (!configJson) return defaultConfig as ClinicConfig

    // Merge with defaultConfig so missing fields fall back gracefully
    return { ...defaultConfig, ...configJson } as ClinicConfig
  } catch {
    return defaultConfig as ClinicConfig
  }
}
`;

fs.writeFileSync('lib/config.ts', configContent);
console.log('✅ lib/config.ts updated');

// 2. Make all app pages async and await getConfig
function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) results = results.concat(walk(full));
    else if (f.endsWith('.tsx')) results.push(full);
  });
  return results;
}

let changed = 0;
walk('app').forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('getConfig')) return;

  const before = c;
  c = c.replace(/const cfg = getConfig\(\)/g, 'const cfg = await getConfig()');
  c = c.replace(/export default function (\w+)/g, 'export default async function $1');
  // Also fix generateMetadata if sync
  c = c.replace(/export function generateMetadata/g, 'export async function generateMetadata');

  if (c !== before) {
    fs.writeFileSync(file, c);
    console.log('✅ Updated:', file);
    changed++;
  }
});

console.log('Done. ' + changed + ' page files updated.');
