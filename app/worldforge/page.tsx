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
    <PageWrapper>
      <WorldForgePageClient />
    </PageWrapper>
  );
}
