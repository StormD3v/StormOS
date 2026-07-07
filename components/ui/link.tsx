'use client';

import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variantClasses = {
      primary: 'text-storm-blue hover:text-storm-blue-light hover:underline',
      secondary: 'text-neutral-300 hover:text-neutral-100 hover:underline',
      ghost: 'text-neutral-400 hover:text-neutral-200',
    };

    return (
      <a
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 focus:ring-offset-neutral-950 rounded',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

export { Link };
