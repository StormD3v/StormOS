import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { AboutPageContent } from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Friday Gift Chinechenum Azunda, known as StormD3v. Building WorldForge and LumiCast inside Storm-OS.',
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutPageContent />
    </PageWrapper>
  );
}
