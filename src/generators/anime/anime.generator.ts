import { getRandomLine } from '@/lib/text-file';

import metadata from '../../../datasources/metadata.json';
import { type Generator } from '../generator.interface';
import { type AnimeGeneratorResult } from './result.interface';

export class AnimeGenerator implements Generator<AnimeGeneratorResult> {
  private async fetchRandomCharacter(): Promise<string> {
    return getRandomLine('anime.txt', metadata.anime.totalSize, metadata.anime.bufferSize);
  }

  private split(base: string): [string, string | undefined] {
    return base.split(',').map((x) => x.trim()) as [string, string | undefined];
  }

  private format(input: string): string {
    return input.replace(/ /g, '_');
  }

  async generate() {
    const promises = Array.from({ length: 3 }, () => this.fetchRandomCharacter());
    const [firstBase, lastBase, fullBase] = (await Promise.all(promises)).map(this.split);

    const [firstName] = firstBase;
    let [lastNameFallback, lastName] = lastBase;
    lastName = this.format(lastName ? lastName : lastNameFallback);
    const fullName = this.format(fullBase.reverse().join(' '));

    return {
      firstName: this.format(firstName),
      lastName,
      fullName,
    };
  }
}
