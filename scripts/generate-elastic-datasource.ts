import fs from 'fs/promises';
import { deduplicate, safeFetch, untrim } from './lib';
import { datasourcesDir } from '../src/lib/text-file';

(async function () {
  const file = datasourcesDir('elastic.txt');
  await fs.writeFile(file, '', 'utf-8');

  const response = await safeFetch(
    'https://raw.githubusercontent.com/elastic/elasticsearch/v2.4.6/core/src/main/resources/config/names.txt'
  );
  const text = await response.text();
  await fs.writeFile(file, text, 'utf-8');
  await deduplicate(file);
  await untrim(file);
})();
