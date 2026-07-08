import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { AboutPageContent } from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'StormD3v is the studio of Friday Gift Chinecherem Azunda. Ambitious ideas, built with patience.',
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutPageContent />
    </PageWrapper>
  );
}
