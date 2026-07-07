'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const variantClasses = {
      info: 'bg-info/10 border-info/30 text-info',
      success: 'bg-success/10 border-success/30 text-success',
      warning: 'bg-warning/10 border-warning/30 text-warning-dark',
      error: 'bg-error/10 border-error/30 text-error',
    };

    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertCircle,
      error: XCircle,
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg border',
          variantClasses[variant],
          className
        )}
        role="alert"
        {...props}
      >
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
