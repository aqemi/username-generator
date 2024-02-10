import { type ReactNode } from 'react';
import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface GeneratorProps {
  title: string;
  children?: ReactNode;
}

export function Generator({ title, children }: GeneratorProps) {
  return (
    <section className="flex items-center gap-4 group flex-wrap md:flex-nowrap">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight min-w-[calc(100%_-_3.5rem)] md:min-w-32 ">{title}</h3>
      <Button variant="outline" size="icon" className="flex-shrink-0 md:ml-auto md:order-last opacity-50">
        <RefreshCcw className="h-4 w-4" />
      </Button>
      {children}
    </section>
  );
}
