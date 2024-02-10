'use client';

import { Generator } from '@/components/generator';
import { Card, CardContent } from '@/components/ui/card';
import { Copyable } from '@/components/ui/copyable';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { type UuidGeneratorResult } from '@/generators/uuid/result.interface';

export interface GeneratorCardProps {
  uuid: UuidGeneratorResult;
}

export function GeneratorCard(props: GeneratorCardProps) {
  return (
    <Card className="w-full lg:w-[600px]">
      <CardContent className="p-4 space-y-4">
        <TooltipProvider>
          <Generator title="Anime">
            <Copyable disabled type="text" value={'Nashimoto'} />
            <Copyable disabled type="text" value={'Nashimoto Keisuke'} />
          </Generator>
          <Separator></Separator>
          <Generator title="Bible">
            <Copyable
              disabled
              type="text"
              value={
                'Irure dolor magna velit irure ipsum irure.Irure dolor magna velit irure ipsum irure.Irure dolor magna velit irure ipsum irure.'
              }
            />
            <Copyable
              disabled
              type="text"
              value={
                'Iruredolormagnavelitirureipsumirure.Iruredolormagnavelitirureipsumirure.Iruredolormagnavelitirureipsumirure.'
              }
            />
          </Generator>
          <Separator></Separator>
          <Generator title="Neutral"></Generator>
          <Separator></Separator>
          <Generator title="UUID">
            <Copyable disabled type="text" value={props.uuid.v4} />
          </Generator>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
