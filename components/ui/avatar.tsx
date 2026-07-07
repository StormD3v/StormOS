'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = 'Avatar', size = 'md', fallback, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 32px, (max-width: 1024px) 48px, 64px"
          />
        ) : fallback ? (
          <span className="font-medium text-neutral-300">{fallback}</span>
        ) : (
          <User className="w-1/2 h-1/2 text-neutral-500" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
