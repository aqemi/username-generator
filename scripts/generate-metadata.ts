import fs from 'fs/promises';
import { SourceMetadata, datasourcesDir } from '../src/lib/text-file';

(async function () {
  const files = await fs.readdir(datasourcesDir(''));
  const txtFiles = files.filter((x) => x.endsWith('.txt'));

  const metadata = await txtFiles.reduce(async (pre, filename) => {
    const file = datasourcesDir(filename);
    const acc = await pre;
    const data = await fs.readFile(file, 'utf-8');
    const lines = data.split('\n');
    const bufferSize = Math.max(...lines.map((l) => Buffer.byteLength(l, 'utf8'))) * 2 + 2;
    const stats = await fs.stat(file);
    const totalSize = stats.size;

    if (totalSize <= bufferSize) {
      throw new Error(`Buffer size ${bufferSize} <= total file size ${totalSize}`);
    }

    return {
      ...acc,
      [filename]: {
        bufferSize,
        totalSize: stats.size,
      },
    };
  }, Promise.resolve({} as Record<string, SourceMetadata>));

  const metadataFile = datasourcesDir('metadata.json');
  await fs.writeFile(datasourcesDir(metadataFile), JSON.stringify(metadata, null, 2), 'utf-8');
  console.info('Wrote metadata:', metadata);
})();
