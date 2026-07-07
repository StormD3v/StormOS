'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ListProps extends HTMLAttributes<HTMLUListElement> {
  variant?: 'default' | 'ordered';
}

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const Tag = variant === 'ordered' ? 'ol' : 'ul';

    return (
      <Tag
        ref={ref as any}
        className={cn('space-y-2', className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

List.displayName = 'List';

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn('text-neutral-400', className)}
        {...props}
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export { List, ListItem };
