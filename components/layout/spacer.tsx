import { cn } from '@/lib/utils';

interface SpacerProps {
  className?: string;
  size?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32;
  vertical?: boolean;
}

const sizeClasses = {
  1: 'h-1 w-1',
  2: 'h-2 w-2',
  3: 'h-3 w-3',
  4: 'h-4 w-4',
  6: 'h-6 w-6',
  8: 'h-8 w-8',
  12: 'h-12 w-12',
  16: 'h-16 w-16',
  24: 'h-24 w-24',
  32: 'h-32 w-32',
};

export function Spacer({ className, size = 4, vertical = true }: SpacerProps) {
  const dimension = vertical ? 'h' : 'w';
  const otherDimension = vertical ? 'w' : 'h';
  
  return (
    <div
      className={cn(
        `${dimension}-${size} ${otherDimension}-0`,
        className
      )}
      aria-hidden="true"
    />
  );
}
