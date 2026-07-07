'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="radio"
          id={id}
          className={cn(
            'w-4 h-4 bg-neutral-900 border border-neutral-700 text-storm-blue focus:ring-2 focus:ring-storm-blue focus:ring-offset-2 focus:ring-offset-neutral-950 transition-colors duration-300 cursor-pointer',
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="ml-2 text-sm text-neutral-300 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
