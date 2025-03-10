import fs from 'fs/promises';
import path from 'path';

import metadata from '../../datasources/metadata.json' assert { type: 'json' };

export type Source = keyof typeof metadata;
export type SourceMetadata = {
  bufferSize: number;
  totalSize: number;
};

export type MetadataFile = Record<Source, SourceMetadata>;

function getMetadata(filename: Source): SourceMetadata {
  const sourceMetadata = metadata[filename];
  if (!sourceMetadata) {
    throw new Error(`Metadata for ${filename} not defined`);
  }
  return sourceMetadata;
}

export async function getRandomLine(filename: Source): Promise<string> {
  const { bufferSize, totalSize } = getMetadata(filename);
  const filepath = datasourcesDir(filename);
  const handle = await fs.open(filepath, 'r');
  try {
    for (let i = 0; i < 10; i += 1) {
      const randomPos = Math.floor(Math.random() * totalSize);
      const buffer = Buffer.alloc(bufferSize);
      await handle.read(buffer, 0, bufferSize, randomPos);

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

export function datasourcesDir(filename: string) {
  return path.resolve(process.cwd(), './datasources', filename);
}
