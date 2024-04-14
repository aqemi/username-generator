import { getRandomLine } from '@/lib/text-file';

import { type Generator } from '../generator.interface';
import { type BibleGeneratorResult } from './result.interface';

export class BibleGenerator implements Generator<BibleGeneratorResult> {
  async generate() {
    return {
      name: await getRandomLine('bible.txt'),
    };
  }
}
