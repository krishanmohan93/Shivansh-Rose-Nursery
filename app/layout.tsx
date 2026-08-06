import type { Metadata, Viewport } from 'next';
import { playfair, inter, poppins } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shivansh Rose Nursery — Premium Nursery & Garden Care Pune',
  description: 'Explore 500+ varieties of plants, luxury planters, landscape design, and garden maintenance services across Wakad & Hinjawadi branches in Pune.',
  keywords: ['Nursery Pune', 'Shivansh Rose Nursery', 'Plants Wakad', 'Hinjewadi Nursery', 'Ceramic Pots Pune', 'Indoor Plants Wakad'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="font-body text-slate-800 bg-background antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
