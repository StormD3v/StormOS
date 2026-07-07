import Link from 'next/link';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-storm-blue mb-4">404</h1>
          <p className="text-xl text-neutral-400 mb-2">Page not found</p>
          <p className="text-neutral-500 mb-8">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
