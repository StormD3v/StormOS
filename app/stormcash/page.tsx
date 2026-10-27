import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { StormCashPageClient } from './StormCashPageClient';

export const metadata: Metadata = {
  title: 'StormCash',
  description:
    'A payment prototype built around settlement finality — a transfer either completes fully or never starts.',
};

export default function StormCashPage() {
  return (
    <PageWrapper enableDesktopBackground mobileBackgrounds={[
      '/images/wallpaper-stormcash.webp',
      '/images/wallpaper-lumicast.webp',
      '/images/hollow-world.webp',
      '/images/inner-code.webp',
    ]}>
      <StormCashPageClient />
    </PageWrapper>
  );
}
