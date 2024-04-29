import { Github } from 'lucide-react';

import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';

import { AnimeGenerator } from '@/generators/anime/anime.generator';
import { BibleGenerator } from '@/generators/bible/bible.generator';
import { ElasticGenerator } from '@/generators/elastic/elastic.generator';
import { UuidGenerator } from '@/generators/uuid/uuid.generator';
import { VT323 } from 'next/font/google';
import { GeneratorPanel } from './generator-panel';
import logo from './logo.png';
import Image from 'next/image';

const font = VT323({ weight: '400', subsets: ['latin'] });

export default async function Home() {
  const generatedValues = {
    anime: await new AnimeGenerator().generate(),
    bible: await new BibleGenerator().generate(),
    elastic: await new ElasticGenerator().generate(),
    uuid: await new UuidGenerator().generate(),
  };
  return (
    <>
      <header className="flex-grow basis-1/5 flex items-start justify-end space-x-4">
        <Button variant="ghost" size="icon" aria-labelledby="ghlink">
          <a href="https://github.com/aqemi/username-generator" target="_blank" aria-label="Github" id="ghlink">
            <Github />
          </a>
        </Button>
        <ThemeSwitch />
      </header>
      <main className="flex-grow basis-3/5 flex flex-col items-center">
        <section className="flex-grow basis-0 content-end">
          <div className="flex items-center gap-4 p-4 min-[480px]:p-6 md:p-8">
            <Image src={logo} height={50} alt="chibi" className="min-height-0"></Image>
            <h1
              className={`${font.className} scroll-m-20 font-extrabold tracking-tight text-center text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl whitespace-nowrap uppercase`}
            >
              usernames generator
            </h1>
          </div>
        </section>
        <GeneratorPanel {...generatedValues} className="w-full md:w-[700px]" />
        <section className="flex-grow basis-0"></section>
      </main>
      <footer className="flex-grow basis-1/5"></footer>
    </>
  );
}

export const dynamic = 'force-dynamic';
