import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  businessName?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string[];
  priceRange?: string;
  services?: string[];
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  businessName = 'NeuralFlow AI',
  description = 'Leading AI automation company specializing in intelligent process automation, custom AI development, and business workflow optimization.',
  address = {
    streetAddress: '123 AI Innovation Drive',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US'
  },
  phone = '+92 310 5163094',
  email = 'hello@neuralflow.cloud',
  website = 'https://neuralflow.cloud',
  openingHours = ['Mo-Fr 09:00-18:00'],
  priceRange = '$$$',
  services = [
    'AI Automation',
    'Process Automation',
    'Workflow Optimization',
    'Custom AI Development',
    'Business Intelligence',
    'AI Consulting'
  ]
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${website}#localbusiness`,
    name: businessName,
    description,
    url: website,
    telephone: phone,
    email,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749',
      longitude: '-122.4194'
    },
    openingHoursSpecification: openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1]
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Automation Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service,
          description: `Professional ${service.toLowerCase()} services for businesses`
        }
      }))
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        reviewBody: 'NeuralFlow AI transformed our business processes with their intelligent automation solutions. ROI was achieved within 3 months.',
        datePublished: '2024-11-15'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Michael Chen'
        },
        reviewBody: 'Exceptional AI workflow optimization. Their team delivered custom solutions that exceeded our expectations.',
        datePublished: '2024-10-28'
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/neuralflow-ai',
      'https://twitter.com/neuralflowai',
      'https://www.facebook.com/neuralflowai',
      'https://www.instagram.com/neuralflowai'
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${website}/logo.png`,
      width: '300',
      height: '100'
    },
    image: {
      '@type': 'ImageObject',
      url: `${website}/og-image.jpg`,
      width: '1200',
      height: '630'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;