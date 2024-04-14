import { getRandomLine } from '@/lib/text-file';

import { type Generator } from '../generator.interface';
import { type ElasticGeneratorResult } from './result.interface';

export class ElasticGenerator implements Generator<ElasticGeneratorResult> {
  async generate() {
    return {
      name: await getRandomLine('elastic.txt'),
    };
  }
}
