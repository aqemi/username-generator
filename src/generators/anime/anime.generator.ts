import { random } from '@/lib/utils';
import { type Generator } from '../generator.interface';
import { AnimeGeneratorResult } from './result.interface';

const MAL_CLIENT_ID = '';

export class AnimeGenerator implements Generator<AnimeGeneratorResult> {
  private async fetchRandomCharacter(): Promise<string> {
    const limit = random(0, 2000);

    const requestInit = {
      // headers: {
      //   accept:
      //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      //   'accept-language': 'en-US,en;q=0.9',
      //   'cache-control': 'no-cache',
      //   pragma: 'no-cache',
      //   'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
      //   'sec-ch-ua-mobile': '?0',
      //   'sec-ch-ua-platform': '"Windows"',
      //   'sec-fetch-dest': 'document',
      //   'sec-fetch-mode': 'navigate',
      //   'sec-fetch-site': 'same-origin',
      //   'sec-fetch-user': '?1',
      //   'upgrade-insecure-requests': '1',
      // },
      // referrer: `https://myanimelist.net/topanime.php?limit=${limit}`,
      // method: 'GET',
    };
    const animeListHtml = await (
      await fetch(`https://myanimelist.net/topanime.php?limit=${limit}`, requestInit)
    ).text();
    const animeListDom = parse(animeListHtml);
    const animeURL = animeListDom('a[class="hoverinfo_trigger fl-l ml12 mr8"]').eq(0).attr('href')!;
    const animePageHtml = await (await fetch(animeURL, requestInit)).text();
    const animePageDom = parse(animePageHtml);
    const charactersDom = animePageDom('h3[class="h3_characters_voice_actors"] > a');
    const characterIndex = random(0, charactersDom.length);
    const characterName = charactersDom.eq(characterIndex).text();
    return characterName;
  }

  private split(base: string): [string, string | undefined] {
    return base.split(',').map(x => x.trim()) as [string, string | undefined];
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
