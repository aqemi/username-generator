'use client';

import { SetStateAction, useState } from 'react';
import { Generator } from '@/components/generator';
import { Card, CardContent } from '@/components/ui/card';
import { Copyable } from '@/components/ui/copyable';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { type UuidGeneratorResult } from '@/generators/uuid/result.interface';
import { AnimeGenerator } from '@/generators/anime/anime.generator';
import {type  AnimeGeneratorResult } from '@/generators/anime/result.interface';
import { UuidGenerator } from '@/generators/uuid/uuid.generator';

export interface GeneratorCardProps {
  anime: AnimeGeneratorResult;
  uuid: UuidGeneratorResult;
}

export function GeneratorCard(props: GeneratorCardProps) {
  const [state, setState] = useState(props);

  const updateState = (newState: Partial<GeneratorCardProps>) => setState({ ...state, ...newState });

  const regenerateUuid = async () => {
    const result = await new UuidGenerator().generate();
    updateState({ uuid: result });
  };

  const regenerateAnime = async () => {
    const result = await new AnimeGenerator().generate();
    updateState({ anime: result });
  };

  return (
    <Card className="w-full lg:w-[684px]">
      <CardContent className="p-4 space-y-4">
        <TooltipProvider>
          <Generator title="Anime" onRegenerate={regenerateAnime}>
            <Copyable disabled type="text" value={state.anime.firstName} />
            <Copyable disabled type="text" value={state.anime.lastName} />
            <Copyable disabled type="text" value={state.anime.fullName} />
          </Generator>
          <Separator></Separator>
          <Generator title="Bible" onRegenerate={() => {}}>
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
          <Generator title="Neutral" onRegenerate={() => {}}></Generator>
          <Separator></Separator>
          <Generator title="UUID" onRegenerate={regenerateUuid}>
            <Copyable disabled type="text" value={state.uuid.v4} />
          </Generator>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
