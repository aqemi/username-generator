import { VT323 } from 'next/font/google';
import { type ReactNode } from 'react';
import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface GeneratorProps {
  title: string;
  onRegenerate: () => void;
  children?: ReactNode;
}

const font = VT323({ weight: '400', subsets: ['latin'] });

export function Generator({ title, children, onRegenerate }: GeneratorProps) {
  return (
    <section className="flex items-center gap-4 group flex-wrap md:flex-nowrap">
      <h3 className={`${font.className} scroll-m-20 text-4xl tracking-tight min-w-[calc(100%_-_3.5rem)] md:min-w-24`}>{title}</h3>
      <Button
        variant="outline"
        onClick={onRegenerate}
        size="icon"
        className="flex-shrink-0 md:ml-auto md:order-last opacity-50"
        aria-label="Regenerate"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
      {children || <div className="flex items-center px-3 text-sm selection:bg-amber-900">Click to generate</div>}
    </section>
  );
}
