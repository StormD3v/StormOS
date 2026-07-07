'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Set true when the badge communicates a live status (e.g. project state).
   *  Adds role="status" so screen readers announce the value. */
  asStatus?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', asStatus, children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-neutral-800 text-neutral-300',
      success: 'bg-success/20 text-success border border-success/30',
      warning: 'bg-warning/20 text-warning-dark border border-warning/30',
      error: 'bg-error/20 text-error border border-error/30',
      info: 'bg-info/20 text-info border border-info/30',
    };

    // role="status" when the badge conveys state information
    const isStatus = asStatus || variant === 'success' || variant === 'warning' || variant === 'error';

    return (
      <span
        ref={ref}
        role={isStatus ? 'status' : undefined}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
