import type { Metadata, Viewport } from 'next';
import { playfair, inter, poppins } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTAs } from '@/components/layout/FloatingCTAs';
import { MainContentWrapper } from '@/components/layout/MainContentWrapper';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivanshrosenursery.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shivansh Rose Nursery — Best Plant Nursery in Pune | Wakad & Hinjewadi',
    template: '%s | Shivansh Rose Nursery Pune',
  },
  description:
    'Top-rated plant nursery in Wakad & Hinjewadi, Pune. 500+ Indoor & outdoor plants, exotic flowers, handcrafted ceramic pots, Chinese porcelain planters, red soil & vermicompost, and society garden maintenance. Visit us or order via WhatsApp!',
  keywords: [
    'nursery near me',
    'best nursery in pune',
    'nursery in wakad',
    'nearest plant nursery in wakad hinjewadi',
    'plant nursery pune',
    'flower nursery wakad',
    'plant shop pune',
    'indoor plants pune',
    'outdoor flowering plants wakad',
    'ceramic pots pune',
    'chinese porcelain planters wakad',
    'fiber pots pune',
    'soil matka pots wakad',
    'garden maintenance pune',
    'balcony garden setup pune',
    'society lawn maintenance wakad',
    'society garden amc hinjewadi',
    'air purifying indoor plants',
    'bonsai plants pune',
    'succulents and cactus wakad',
    'plants home delivery pune',
    'wholesale plants pune',
    'shweta matka bhandar wakad',
    'shivansh rose nursery wakad',
    'plants near hinjewadi phase 1',
  ],
  authors: [{ name: 'Shivansh Rose Nursery', url: siteUrl }],
  creator: 'Shivansh Rose Nursery',
  publisher: 'Shivansh Rose Nursery',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Shivansh Rose Nursery — Best Plant Nursery in Pune | Wakad & Hinjewadi',
    description:
      'Explore 500+ fresh indoor/outdoor plants, handcrafted pots, Chinese planters, and garden maintenance services across Wakad & Hinjewadi, Pune.',
    url: siteUrl,
    siteName: 'Shivansh Rose Nursery Pune',
    images: [
      {
        url: '/images/hero-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Shivansh Rose Nursery - Lush Plants, Ceramic Pots & Nursery in Pune',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Rose Nursery — Best Plant Nursery in Pune',
    description:
      '500+ Plants, Ceramic Pots & Society Garden Maintenance in Wakad & Hinjewadi, Pune. Quick WhatsApp inquiries!',
    images: ['/images/hero-1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#064e3b',
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
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="font-body text-slate-800 bg-background-cream antialiased flex flex-col min-h-screen">
        <Header />
        <MainContentWrapper>{children}</MainContentWrapper>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
