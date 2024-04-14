'use client';

import { useState } from 'react';

import { Generator } from '@/components/generator';
import { Card, CardContent } from '@/components/ui/card';
import { Copyable } from '@/components/ui/copyable';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import { type AnimeGeneratorResult } from '@/generators/anime/result.interface';
import { type BibleGeneratorResult } from '@/generators/bible/result.interface';
import { type ElasticGeneratorResult } from '@/generators/elastic/result.interface';
import { type UuidGeneratorResult } from '@/generators/uuid/result.interface';
import { UuidGenerator } from '@/generators/uuid/uuid.generator';

export interface GeneratorCardProps {
  anime: AnimeGeneratorResult;
  bible: BibleGeneratorResult;
  elastic: ElasticGeneratorResult;
  uuid: UuidGeneratorResult;
}

export function GeneratorCard(props: GeneratorCardProps) {
  const [state, setState] = useState(props);
  const updateState = (newState: Partial<GeneratorCardProps>) => setState({ ...state, ...newState });

  const regenerateRequest = async <R = unknown,>(generator: 'anime' | 'elastic' | 'bible'): Promise<R | null> => {
    try {
      const response = await fetch(`http://localhost:3000/api/generate/${generator}`);
      return await response.json();
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      return null;
    }
  };

  const regenerateAnime = async () => {
    const result = await regenerateRequest<AnimeGeneratorResult>('anime');
    result && updateState({ anime: result });
  };

  const regenerateBible = async () => {
    const result = await regenerateRequest<BibleGeneratorResult>('bible');
    result && updateState({ bible: result });
  };

  const regenerateElastic = async () => {
    const result = await regenerateRequest<BibleGeneratorResult>('bible');
    result && updateState({ elastic: result });
  };

  const regenerateUuid = async () => {
    const result = await new UuidGenerator().generate();
    updateState({ uuid: result });
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
          <Generator title="Bible" onRegenerate={regenerateBible}>
            <Copyable disabled type="text" value={state.bible.name} />
          </Generator>
          <Separator></Separator>
          <Generator title="Neutral" onRegenerate={regenerateElastic}>
            <Copyable disabled type="text" value={state.elastic.name} />
          </Generator>
          <Separator></Separator>
          <Generator title="UUID" onRegenerate={regenerateUuid}>
            <Copyable disabled type="text" value={state.uuid.v4} />
          </Generator>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
