import { type Generator } from '../generator.interface';
import { UuidGeneratorResult } from './result.interface';

export class UuidGenerator implements Generator<UuidGeneratorResult> {
  async generate() {
    return {
      v4: crypto.randomUUID(),
      short: crypto.randomUUID().slice(0, 7),
    };
  }
}
