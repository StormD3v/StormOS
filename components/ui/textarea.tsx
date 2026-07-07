'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, id, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-md',
            'text-neutral-100 placeholder-neutral-500',
            'transition-colors duration-fast',
            'focus:outline-none focus:ring-2 focus:ring-storm-blue focus:border-transparent',
            'focus:shadow-[0_0_0_3px_rgba(10,132,255,0.2)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-y min-h-[120px]',
            error && 'border-error focus:ring-error focus:shadow-[0_0_0_3px_rgba(255,69,58,0.2)]',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
