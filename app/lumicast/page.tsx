import type { Metadata } from 'next';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { LumiCastPageClient } from './LumiCastPageClient';

export const metadata: Metadata = {
    title: 'LumiCast',
    description:
        'LumiCast translates weather forecasts into actionable daily decisions. Not raw data — just what you need to know.',
};

export default function LumiCastPage() {
    return (
        <PageWrapper>
            <LumiCastPageClient />
        </PageWrapper>
    );
}
