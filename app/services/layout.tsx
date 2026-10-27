import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garden Maintenance, Balcony Setup & Society Lawn AMC in Pune',
  description:
    'Expert garden maintenance, society lawn AMC, balcony garden design, and landscaping services in Wakad, Hinjewadi, and across Pune. Book verified gardeners starting ₹1,499/mo.',
  keywords: [
    'garden maintenance pune',
    'society garden amc wakad',
    'balcony garden setup pune',
    'mali service wakad',
    'gardener near me pune',
    'terrace garden landscaping hinjewadi',
    'lawn maintenance pimpri chinchwad',
    'society landscape maintenance pune',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Garden Maintenance & Landscaping Services in Pune | Shivansh Rose Nursery',
    description:
      'Professional gardener visits, society garden maintenance AMC, plant repotting, and balcony setups in Wakad & Hinjewadi.',
    url: 'https://shivanshrosenursery.com/services',
    images: ['/images/hero-2.jpeg'],
  },
};

/**
 * Server layout component providing SEO metadata for the services routes.
 * @param props The layout component props containing child elements.
 * @returns The rendered layout wrapping service pages.
 */
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
