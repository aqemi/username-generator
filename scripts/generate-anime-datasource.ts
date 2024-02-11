import fs from 'fs/promises';
import { load } from 'cheerio';
import { datasourcesDir, deduplicate, safeFetch } from './lib';

(async function () {
  const file = datasourcesDir('anime.txt');
  await fs.writeFile(file, '', 'utf-8');

  let page = 1;
  for (let limit = 0; limit < 3000; limit += 50) {
    const animeListHtml = await (await safeFetch(`https://myanimelist.net/topanime.php?limit=${limit}`)).text();
    const animeList = load(animeListHtml);
    const animeUrls = animeList('a[class="hoverinfo_trigger fl-l ml12 mr8"]')
      .map((i, el) => animeList(el).attr('href'))
      .toArray();

    for (const [index, animeUrl] of animeUrls.entries()) {
      try {
        const animePageHtml = await (await safeFetch(animeUrl)).text();
        const animePage = load(animePageHtml);
        const characters = animePage('h3[class="h3_characters_voice_actors"] > a')
          .map((i, el) => animePage(el).text())
          .toArray();

        const chunk = characters.join('\n') + '\n';
        await fs.appendFile(file, chunk, 'utf-8');

        console.info(`Page ${page}, item ${index + 1}`);
      } catch (err) {
        console.error(err);
      }
    }
    page += 1;
  }
  await deduplicate(file);
})();
