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
    <PageWrapper mobileBackground="/images/inner-code.webp">
      <StormCashPageClient />
    </PageWrapper>
  );
}
