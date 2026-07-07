'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <Card variant="elevated" className="text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-error mb-4">Something went wrong</h2>
        <p className="text-neutral-400 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return home if the problem
          persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Link href="/">
            <Button variant="secondary" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
