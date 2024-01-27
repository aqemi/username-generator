'use client';

import Image from 'next/image';
import { Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { ThemeSwitch } from '@/components/theme-switch';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-end p-4 space-x-4">
        <Button variant="ghost" size="icon">
          <a href="google.com" target="_blank">
            <Github></Github>
          </a>
        </Button>
        <ThemeSwitch />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Usernames Generator</h1>
        <Card></Card>
      </main>
    </>
  );
}
