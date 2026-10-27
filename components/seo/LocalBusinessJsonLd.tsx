import React from 'react';

/**
 * LocalBusinessJsonLd component renders Schema.org structured data (JSON-LD)
 * for Google Rich Snippets, Local Business Map Pack, and Knowledge Graph.
 *
 * This helps Shivansh Rose Nursery rank #1 for:
 * - "nursery near me"
 * - "best nursery in pune"
 * - "nursery in wakad"
 * - "plant nursery hinjewadi"
 */
export const LocalBusinessJsonLd: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'GardenStore', 'Florist'],
        '@id': 'https://shivanshrosenursery.com/#localbusiness-wakad',
        name: 'Shivansh Rose Nursery Wakad Pune',
        alternateName: [
          'Shivansh Nursery',
          'Shivansh Rose Nursery & Garden Care',
          'Best Plant Nursery in Wakad',
          'Nursery Near Me Wakad',
        ],
        url: 'https://shivanshrosenursery.com',
        logo: 'https://shivanshrosenursery.com/icon-512.png',
        image: 'https://shivanshrosenursery.com/images/hero-1.jpeg',
        description:
          'Pune’s leading nursery offering 500+ indoor & outdoor plants, exotic flowers, handcrafted ceramic pots, Chinese porcelain planters, red soil, fertilizers, and society garden maintenance services across Wakad & Hinjewadi.',
        telephone: '+918007634856',
        email: 'shivanshrosenursery.com@gmail.com',
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Google Pay, PhonePe, Paytm, Net Banking',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Datta Mandir, Shankar Kalat Nagar, Datta Mandir Road',
          addressLocality: 'Wakad, Pimpri-Chinchwad, Pune',
          addressRegion: 'Maharashtra',
          postalCode: '411057',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 18.5987,
          longitude: 73.7684,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '08:00',
            closes: '22:30',
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'Wakad' },
          { '@type': 'City', name: 'Hinjewadi' },
          { '@type': 'City', name: 'Baner' },
          { '@type': 'City', name: 'Balewadi' },
          { '@type': 'City', name: 'Pimple Saudagar' },
          { '@type': 'City', name: 'Pimple Nilakh' },
          { '@type': 'City', name: 'Aundh' },
          { '@type': 'City', name: 'Tathawade' },
          { '@type': 'City', name: 'Punawale' },
          { '@type': 'City', name: 'Ravet' },
          { '@type': 'City', name: 'Pune' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '240',
          reviewCount: '240',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Nursery Products & Garden Services',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Indoor Air-Purifying Plants',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Outdoor Flowering & Ornamental Plants',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Handcrafted Ceramic Pots & Planters',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Chinese Porcelain Luxury Pots',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Society Garden & Balcony Maintenance AMC',
            },
          ],
        },
      },
      {
        '@type': ['LocalBusiness', 'GardenStore'],
        '@id': 'https://shivanshrosenursery.com/#localbusiness-hinjewadi',
        name: 'Shweta Matka Bhandar & Nursery (Shivansh Rose Nursery Branch 2)',
        alternateName: ['Shweta Matka Bhandar Hinjewadi', 'Nursery Near Me Hinjewadi'],
        url: 'https://shivanshrosenursery.com/stores',
        logo: 'https://shivanshrosenursery.com/icon-512.png',
        image: 'https://shivanshrosenursery.com/images/hero-2.jpeg',
        description:
          'Branch store specializing in designer soil matka pots, fiber planters, exotic flowering plants, water fountains, and bonsai in Hinjewadi Link Road, Pune.',
        telephone: '+919175418744',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hinjewadi Link Road, Near Indian Oil Petrol Pump, Wakad',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          postalCode: '411057',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 18.5945,
          longitude: 73.7548,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '08:00',
            closes: '22:30',
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
