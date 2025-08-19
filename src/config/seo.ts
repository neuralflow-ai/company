export const seoConfig = {
  // Primary domain and branding
  domain: 'neuralflow.cloud',
  siteName: 'NeuralFlow AI',
  companyName: 'NeuralFlow AI',
  
  // Primary keywords for ranking (trending, high-traffic, low-competition)
  primaryKeywords: [
    'agentic AI',
    'AI workflow automation',
    'intelligent process automation',
    'conversational AI platform',
    'AI business automation',
    'custom AI agents',
    'enterprise AI solutions',
    'AI process optimization',
    'generative AI for business',
    'AI-powered automation'
  ],
  
  // Long-tail keywords for content optimization (trending, low-competition)
  longTailKeywords: [
    'agentic AI solutions for business',
    'AI workflow automation platform',
    'conversational AI chatbot development',
    'intelligent document processing AI',
    'AI-powered customer service automation',
    'generative AI business applications',
    'custom AI agent development services',
    'enterprise agentic AI implementation',
    'AI automation for small business growth',
    'intelligent process automation consulting',
    'AI workflow optimization tools',
    'business process automation with AI'
  ],

  // Competitor gap keywords - untapped opportunities based on 2025 market analysis
  competitorGapKeywords: [
    'AI workflow redesign services',
    'agentic AI system implementation',
    'hyperautomation strategy consulting',
    'AI process transformation consulting',
    'no-code AI automation platform',
    'citizen developer AI tools',
    'AI-driven workflow orchestration',
    'enterprise AI ecosystem integration',
    'AI productivity transformation',
    'strategic AI workflow optimization',
    'AI-powered process intelligence',
    'automated workflow ecosystem design',
    'AI change management consulting',
    'deep AI integration strategy',
    'AI operational transformation'
  ],
  
  // Default meta configuration
  defaultMeta: {
    title: 'Agentic AI & AI Workflow Automation Solutions | NeuralFlow AI - Custom AI Agents',
    description: 'Transform your business with agentic AI solutions. Custom AI agents, conversational AI platforms, intelligent process automation. 300% efficiency boost, 60% cost reduction. Get started today.',
    keywords: 'agentic AI, AI workflow automation, conversational AI platform, intelligent process automation, custom AI agents, generative AI for business, AI-powered automation',
    author: 'NeuralFlow AI Team',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    language: 'en-US',
    revisitAfter: '7 days',
    distribution: 'global',
    rating: 'general'
  },
  
  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NeuralFlow AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeuralFlow AI - Business Automation Solutions'
      }
    ]
  },
  
  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    site: '@neuralflowai',
    creator: '@neuralflowai'
  },
  
  // Structured data schemas
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NeuralFlow AI',
      url: 'https://neuralflow.cloud',
      logo: 'https://neuralflow.cloud/logo.png',
      description: 'Leading agentic AI company providing custom AI agents, conversational AI platforms, and intelligent process automation solutions for business transformation.',
      foundingDate: '2023',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92 310 5163094',
        contactType: 'customer service',
        email: 'hello@neuralflow.cloud',
        availableLanguage: 'English'
      },
      sameAs: [
        'https://linkedin.com/company/neuralflow-ai',
        'https://twitter.com/neuralflowai',
        'https://github.com/neuralflow-ai'
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'CA',
        addressLocality: 'San Francisco'
      }
    },
    
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NeuralFlow AI',
      url: 'https://neuralflow.cloud',
      description: 'Agentic AI solutions, AI workflow automation platforms, and custom AI agent development services.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://neuralflow.cloud/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Business Automation Services',
      provider: {
        '@type': 'Organization',
        name: 'NeuralFlow AI'
      },
      description: 'Comprehensive agentic AI solutions including custom AI agents, conversational AI platforms, intelligent process automation, and AI workflow optimization.',
      serviceType: 'AI Automation Services',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Automation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Agentic AI Development',
              description: 'Custom agentic AI solutions and intelligent AI agents for automated business processes and workflows.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Workflow Automation Platform',
              description: 'Comprehensive AI workflow automation and intelligent process automation using advanced machine learning.'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Conversational AI Platform',
              description: 'Advanced conversational AI chatbot development and generative AI business applications.'
            }
          }
        ]
      }
    }
  },
  
  // Performance optimization settings
  performance: {
    preloadFonts: [
      '/fonts/inter-var.woff2',
      '/fonts/display-font.woff2'
    ],
    criticalCSS: true,
    lazyLoadImages: true,
    compressImages: true,
    minifyHTML: true,
    minifyCSS: true,
    minifyJS: true
  },
  
  // Analytics and tracking
  analytics: {
    googleAnalytics: 'G-NEURALFLOW2024', // Production GA4 ID
    googleTagManager: 'GTM-NEURALFLOW', // Production GTM ID
    facebookPixel: 'NEURALFLOW2024FB', // Production Pixel ID
    linkedInInsight: 'XXXXXXX' // Replace with actual Partner ID
  },
  
  // Local SEO (if applicable)
  localSEO: {
    businessName: 'NeuralFlow AI',
    businessType: 'Agentic AI & AI Workflow Automation Company',
    description: 'Leading agentic AI company in San Francisco providing AI workflow automation, conversational AI platforms, and intelligent process automation services.',
    keywords: [
      'agentic AI company San Francisco',
      'AI workflow automation San Francisco',
      'conversational AI platform California',
      'intelligent process automation Bay Area',
      'custom AI agents San Francisco',
      'AI automation services California',
      'enterprise AI solutions Bay Area',
      'AI consulting San Francisco'
    ],
    address: {
      streetAddress: '123 Innovation Drive',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    },
    geo: {
      latitude: '37.7749',
      longitude: '-122.4194'
    },
    telephone: '+92 310 5163094',
    email: 'hello@neuralflow.cloud',
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$$',
    serviceAreas: [
      'San Francisco, CA',
      'Bay Area, CA',
      'Silicon Valley, CA',
      'California, US',
      'United States'
    ]
  }
};

// Page-specific SEO configurations
export const pageConfigs = {
  home: {
    title: 'Agentic AI & AI Workflow Automation | NeuralFlow AI - Transform Your Business',
    description: 'Leading agentic AI company. Custom AI agents, conversational AI platforms, intelligent process automation. 300% efficiency boost, 60% cost reduction. Free consultation available.',
    keywords: 'agentic AI, AI workflow automation, conversational AI platform, intelligent process automation, custom AI agents, generative AI for business, AI-powered automation',
    canonical: 'https://neuralflow.cloud/',
    priority: 1.0,
    changefreq: 'weekly'
  },
  
  services: {
    title: 'Agentic AI Services | AI Workflow Automation & Conversational AI Platform',
    description: 'Comprehensive agentic AI services: custom AI agents, conversational AI platforms, intelligent process automation, AI workflow optimization. Proven ROI in 30 days.',
    keywords: 'agentic AI solutions, AI workflow automation platform, conversational AI chatbot development, intelligent process automation consulting, custom AI agent development services',
    canonical: 'https://neuralflow.cloud/services',
    priority: 0.9,
    changefreq: 'weekly'
  },
  
  about: {
    title: 'About NeuralFlow AI | Leading Agentic AI Company & Expert Team',
    description: 'Meet the NeuralFlow AI team. Leading agentic AI company with 500+ successful projects, 98% client satisfaction. Expert AI agents and conversational AI specialists.',
    keywords: 'agentic AI company, conversational AI platform experts, AI workflow automation specialists, custom AI agent development team, generative AI for business',
    canonical: 'https://neuralflow.cloud/about',
    priority: 0.7,
    changefreq: 'monthly'
  },
  
  blog: {
    title: 'Agentic AI Blog | AI Workflow Automation Insights & Trends | NeuralFlow AI',
    description: 'Expert insights on agentic AI, conversational AI platforms, and intelligent process automation. Latest trends, case studies, and actionable strategies.',
    keywords: 'agentic AI blog, AI workflow automation insights, conversational AI platform trends, intelligent process automation articles, generative AI business applications',
    canonical: 'https://neuralflow.cloud/blog',
    priority: 0.8,
    changefreq: 'daily'
  },
  
  faq: {
    title: 'AI Automation FAQ | Common Questions About Business Automation',
    description: 'Frequently asked questions about AI automation, custom AI development, implementation costs, ROI, and business process automation solutions.',
    keywords: 'AI automation FAQ, business automation questions, AI implementation costs, automation ROI, intelligent process automation',
    canonical: 'https://neuralflow.cloud/faq',
    priority: 0.6,
    changefreq: 'monthly'
  },
  
  contact: {
    title: 'Contact NeuralFlow AI | Get Your Free AI Automation Consultation',
    description: 'Contact NeuralFlow AI for custom AI automation solutions. Free consultation, expert AI development team, and proven business transformation results.',
    keywords: 'contact AI automation company, AI consultation, custom AI development contact, business automation experts',
    canonical: 'https://neuralflow.cloud/contact',
    priority: 0.8,
    changefreq: 'monthly'
  },
  
  privacy: {
    title: 'Privacy Policy | NeuralFlow AI Data Protection & Security',
    description: 'NeuralFlow AI privacy policy. Learn how we protect your data, ensure security, and maintain confidentiality in our AI automation services.',
    keywords: 'AI automation privacy policy, data protection, AI security, business automation confidentiality',
    canonical: 'https://neuralflow.cloud/privacy',
    priority: 0.3,
    changefreq: 'yearly'
  },
  
  notfound: {
    title: '404 - Page Not Found | NeuralFlow AI',
    description: 'The page you are looking for could not be found. Explore our AI automation services and solutions to transform your business processes.',
    keywords: 'page not found, AI automation services, business automation solutions',
    canonical: 'https://neuralflow.cloud/404',
    priority: 0.1,
    changefreq: 'never'
  },
  
  terms: {
    title: 'Terms of Service | NeuralFlow AI Professional AI Automation Agreement',
    description: 'NeuralFlow AI terms of service for professional AI automation services. Service agreements, payment terms, and client responsibilities.',
    keywords: 'AI automation terms of service, professional AI services agreement, business automation contract',
    canonical: 'https://neuralflow.cloud/terms',
    priority: 0.3,
    changefreq: 'yearly'
  }
};

// Content optimization guidelines
export const contentGuidelines = {
  keywordDensity: {
    primary: 2.5, // 2-3% for primary keywords
    secondary: 1.5, // 1-2% for secondary keywords
    longTail: 0.5 // 0.5-1% for long-tail keywords
  },
  
  headingStructure: {
    h1: 1, // Only one H1 per page
    h2: '3-6', // 3-6 H2 tags per page
    h3: '5-10', // 5-10 H3 tags per page
    maxDepth: 4 // Don't go deeper than H4
  },
  
  contentLength: {
    homepage: '800-1200 words',
    servicePages: '1200-2000 words',
    blogPosts: '1500-3000 words',
    aboutPage: '600-1000 words'
  },
  
  internalLinking: {
    minPerPage: 3,
    maxPerPage: 10,
    anchorTextVariation: true,
    deepLinking: true
  }
};