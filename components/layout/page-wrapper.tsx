import { ReactNode } from 'react';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { MobileBackground } from '@/components/ui/mobile-background';

interface PageWrapperProps {
  children: ReactNode;
  mobileBackground?: string;
}

export function PageWrapper({ children, mobileBackground }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {mobileBackground && (
        <>
          <div className="absolute inset-0 bg-neutral-950 -z-30" />
          <MobileBackground src={mobileBackground} effects="glow" extend={false} />
        </>
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neutral-100 focus:text-neutral-950 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" role="main" className="flex-1 pt-16 overflow-x-clip relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
