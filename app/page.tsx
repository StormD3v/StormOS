import { PageWrapper } from '@/components/layout/page-wrapper';
import { ArrivalOverlay } from '@/components/sections/arrival-overlay';
import { Hero } from '@/components/sections/hero';
import { Building } from '@/components/sections/building';
import { WorldForge } from '@/components/sections/worldforge';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      {/* ArrivalOverlay is a client component rendered as a sibling above the page.
          The homepage already exists beneath it — the overlay introduces the space,
          then lifts. No blocking. No loading screen. */}
      <ArrivalOverlay />
      <PageWrapper>
        <Hero />
        <Building />
        <WorldForge />
        <About />
        <Contact />
      </PageWrapper>
    </>
  );
}
