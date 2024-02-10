import * as React from 'react';
import { useId, type MouseEventHandler } from 'react';
import { ClipboardCopy } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipContext,
} from '@/components/ui/tooltip';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Copyable = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, value, ...props }, ref) => {
  const id = useId();
  const { openTooltipId, setOpenTooltipId } = React.useContext(TooltipContext);

  const isTooltipVisible = id === openTooltipId;

  const copy: MouseEventHandler = event => {
    navigator.clipboard.writeText(value as string);
    setOpenTooltipId(id);
  };

  return (
    <Tooltip open={isTooltipVisible}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'flex items-center h-10 px-3 space-x-1 rounded-md border border-input bg-background text-sm cursor-pointer selection:bg-amber-900 min-w-0',
            className
          )}
          onClick={copy}
          {...props}
        >
          <div className={cn('text-ellipsis overflow-hidden whitespace-nowrap')}>{value}</div>
          <ClipboardCopy className="flex-shrink-0 opacity-50 h-4 w-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={5} side="bottom" align="end">
        Copied!
      </TooltipContent>
    </Tooltip>
  );
});

Copyable.displayName = 'Copyable';

export { Copyable };
