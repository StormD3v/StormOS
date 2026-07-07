import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StormOS | Premium Portfolio',
  description: 'A premium portfolio operating system for Storm, a software engineer specializing in building exceptional digital experiences.',
  keywords: ['portfolio', 'software engineer', 'developer', 'StormOS', 'Storm'],
  authors: [{ name: 'Storm' }],
  openGraph: {
    title: 'StormOS | Premium Portfolio',
    description: 'A premium portfolio operating system for Storm, a software engineer.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StormOS | Premium Portfolio',
    description: 'A premium portfolio operating system for Storm, a software engineer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
