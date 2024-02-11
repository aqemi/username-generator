import fs from 'fs/promises';
import path from 'path';
import { setTimeout } from 'timers/promises';

export async function safeFetch(url: string) {
  console.info(`Fetching ${url}`);
  await setTimeout(2000);
  return fetch(url);
}

export function datasourcesDir(filename: string) {
  return path.resolve(process.cwd(), './datasources', filename);
}

export async function deduplicate(filepath: string) {
  const content = await fs.readFile(filepath, 'utf-8');
  const lines = content.split('\n');
  const deduplicated =  [...new Set(lines)];
  const newContent = deduplicated.join('\n');
  await fs.writeFile(filepath, newContent, 'utf-8');
}
