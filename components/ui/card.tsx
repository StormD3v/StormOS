'use client';

import { HTMLAttributes, KeyboardEvent, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat' | 'interactive';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', onClick, children, ...props }, ref) => {
    const baseClasses = 'rounded-xl p-6';

    const variantClasses = {
      elevated:
        'bg-neutral-900 border border-neutral-800 shadow-md',
      flat:
        'bg-neutral-900 border border-neutral-800',
      interactive:
        'bg-neutral-900 border border-neutral-800 shadow-md cursor-pointer ' +
        'hover:-translate-y-1 hover:shadow-lg hover:border-storm-blue ' +
        'transition-all duration-[200ms] focus:outline-none focus:ring-2 ' +
        'focus:ring-storm-blue focus:ring-offset-2 focus:ring-offset-neutral-950',
    };

    // Keyboard activation for interactive cards (Enter / Space)
    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      if (variant === 'interactive' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={variant === 'interactive' ? 'button' : undefined}
        tabIndex={variant === 'interactive' ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
