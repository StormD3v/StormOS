import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { WorldForgePageClient } from './WorldForgePageClient';

export const metadata: Metadata = {
  title: 'WorldForge',
  description:
    'WorldForge is a living world built around permanence, identity, and legacy. Join the First Crossing.',
};

export default function WorldForgePage() {
  return (
    <PageWrapper enableDesktopBackground mobileBackgrounds={[
      '/images/wallpaper-worldforge.webp',
      '/images/hollow-world.webp',
      '/images/descent-projects.webp',
      '/images/wallpaper-identity.webp',
    ]}>
      <WorldForgePageClient />
    </PageWrapper>
  );
}
