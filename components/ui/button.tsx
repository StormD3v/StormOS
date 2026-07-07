'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const variantClasses = {
      primary:
        'bg-storm-blue text-white hover:bg-storm-blue-dark focus:ring-storm-blue',
      secondary:
        'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 focus:ring-neutral-600',
      ghost:
        'bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 focus:ring-neutral-600',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      // min-h-[44px] ensures WCAG 2.5.5 touch target at lg size
      lg: 'px-6 py-3 text-lg min-h-[44px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-all duration-fast',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
