import fs from 'fs/promises';
import { datasourcesDir } from '../../scripts/lib';

export async function getRandomLine(filename: string, totalSize: number, readBufferSize: number): Promise<string> {
  const filepath = datasourcesDir(filename);
  const handle = await fs.open(filepath, 'r');

  try {
    for (let i = 0; i < 10; i += 1) {
      const randomPos = Math.floor(Math.random() * totalSize);
      const buffer = Buffer.alloc(readBufferSize);
      await handle.read(buffer, 0, readBufferSize, randomPos);

      const [, firstFullString, nextString] = buffer.toString('utf-8').split('\n');
      if (nextString !== undefined) {
        return firstFullString;
      }
    }

    throw new Error('Maximum number of attempts to read line exceeded');
  } finally {
    await handle.close();
  }
}
