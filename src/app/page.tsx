import { Github } from 'lucide-react';

import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';

import { GeneratorCard } from './generator-card';
import { UuidGenerator } from '@/generators/uuid/uuid.generator';

export default async function Home() {
  const generatedValues = {
    uuid: await new UuidGenerator().generate(),
  };

  return (
    <>
      <header className="flex items-center justify-end p-4 space-x-4">
        <Button variant="ghost" size="icon">
          <a href="google.com" target="_blank">
            <Github />
          </a>
        </Button>
        <ThemeSwitch />
      </header>
      <main className="flex-1 flex items-center justify-center flex-col space-y-16 p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Usernames Generator
        </h1>
        <GeneratorCard {...generatedValues} />
        <div className="h-0 lg:h-12"></div>
      </main>
      <footer className="h-0 lg:h-[4.5rem]"></footer>
    </>
  );
}
