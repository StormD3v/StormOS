'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
}

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-neutral-900 border border-neutral-800',
      accent: 'bg-neutral-900 border border-accent-purple',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg p-4', variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = 'Panel';

export { Panel };
