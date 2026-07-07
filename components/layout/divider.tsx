import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  vertical?: boolean;
}

export function Divider({ className, vertical = false }: DividerProps) {
  return (
    <div
      className={cn(
        'bg-neutral-800',
        vertical ? 'w-px h-full' : 'h-px w-full',
        className
      )}
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
    />
  );
}
