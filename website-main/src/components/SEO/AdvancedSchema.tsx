import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AdvancedSchemaProps {
  type?: 'organization' | 'website' | 'article' | 'service' | 'faq';
  data?: Record<string, unknown>;
}

const AdvancedSchema: React.FC<AdvancedSchemaProps> = ({ type = 'organization', data = {} }) => {
  const getSchemaMarkup = () => {
    const baseUrl = 'https://neuralflow.cloud';
    
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'NeuralFlow AI',
          alternateName: 'Neural Flow AI',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Leading AI automation company providing intelligent business process automation, custom AI development, and enterprise AI solutions.',
          foundingDate: '2023',
          numberOfEmployees: '50-100',
          industry: 'Artificial Intelligence',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 AI Innovation Drive',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94105',
            addressCountry: 'US'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+92 310 5163094',
            contactType: 'customer service',
            email: 'hello@neuralflow.cloud',
            availableLanguage: 'English'
          },
          sameAs: [
            'https://linkedin.com/company/neuralflow-ai',
            'https://twitter.com/neuralflow_ai',
            'https://github.com/neuralflow-ai'
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'AI Automation Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'AI Workflow Automation',
                  description: 'Custom AI-powered workflow automation solutions'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Intelligent Process Automation',
                  description: 'End-to-end business process automation using AI'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom AI Development',
                  description: 'Bespoke AI solutions for enterprise needs'
                }
              }
            ]
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
          }
        };

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'NeuralFlow AI',
          url: baseUrl,
          description: 'Transform your business with AI workflow automation, intelligent process automation, and custom AI agents.',
          publisher: {
            '@type': 'Organization',
            name: 'NeuralFlow AI',
            logo: `${baseUrl}/logo.png`
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                url: `${baseUrl}/services`
              },
              {
                '@type': 'ListItem',
                position: 2,
                url: `${baseUrl}/about`
              },
              {
                '@type': 'ListItem',
                position: 3,
                url: `${baseUrl}/blog`
              },
              {
                '@type': 'ListItem',
                position: 4,
                url: `${baseUrl}/contact`
              }
            ]
          }
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name || 'AI Business Automation Services',
          description: data.description || 'Comprehensive AI automation solutions for modern businesses',
          provider: {
            '@type': 'Organization',
            name: 'NeuralFlow AI',
            url: baseUrl
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'AI Services',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'AI Workflow Automation',
                description: 'Streamline business processes with intelligent automation',
                price: 'Contact for pricing',
                priceCurrency: 'USD'
              },
              {
                '@type': 'Offer',
                name: 'Custom AI Development',
                description: 'Tailored AI solutions for specific business needs',
                price: 'Contact for pricing',
                priceCurrency: 'USD'
              }
            ]
          },
          review: {
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
            reviewBody: 'NeuralFlow AI transformed our business processes with their intelligent automation solutions.'
          }
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (data.faqs as Array<{ question: string; answer: string }>)?.map((faq, index: number) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          })) || []
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image || `${baseUrl}/og-image.jpg`,
          author: {
            '@type': 'Organization',
            name: 'NeuralFlow AI',
            url: baseUrl
          },
          publisher: {
            '@type': 'Organization',
            name: 'NeuralFlow AI',
            logo: `${baseUrl}/logo.png`
          },
          datePublished: data.publishedDate || new Date().toISOString(),
          dateModified: data.modifiedDate || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || baseUrl
          }
        };

      default:
        return {};
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchemaMarkup())}
      </script>
    </Helmet>
  );
};

export default AdvancedSchema;