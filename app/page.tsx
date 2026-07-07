import { PageWrapper } from '@/components/layout/page-wrapper';
import { Hero } from '@/components/sections/hero';
import { Building } from '@/components/sections/building';
import { WorldForge } from '@/components/sections/worldforge';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <Building />
      <WorldForge />
      <About />
      <Contact />
    </PageWrapper>
  );
}
