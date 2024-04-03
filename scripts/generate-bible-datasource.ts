import fs from 'fs/promises';
import { deduplicate, safeFetch } from './lib';
import { datasourcesDir } from '../src/lib/text-file';

(async function () {
  const file = datasourcesDir('bible.txt');
  await fs.writeFile(file, '', 'utf-8');

  const response = await safeFetch(
    'https://raw.githubusercontent.com/robertrouse/theographic-bible-metadata/master/json/people.json'
  );
  const json = await response.json();
  const names = json.map((x: { fields: { name: string } }) => x.fields.name);
  const text = names.join('\n');
  await fs.writeFile(file, text, 'utf-8');

  await deduplicate(file);
})();
