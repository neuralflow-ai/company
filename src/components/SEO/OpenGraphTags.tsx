import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface OpenGraphTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
}

const OpenGraphTags: React.FC<OpenGraphTagsProps> = ({
  title = 'NeuralFlow AI - Intelligent Process Automation & AI Solutions',
  description = 'Transform your business with cutting-edge AI automation. Custom AI development, workflow optimization, and intelligent process automation for enterprise success.',
  image = 'https://neuralflow.cloud/og-image.jpg',
  url,
  type = 'website',
  siteName = 'NeuralFlow AI',
  locale = 'en_US',
  article
}) => {
  const location = useLocation();
  const baseUrl = 'https://neuralflow.cloud';
  const currentUrl = url || `${baseUrl}${location.pathname}`;

  // Generate page-specific content based on route
  const getPageSpecificContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/services':
        return {
          title: 'AI Automation Services - NeuralFlow AI',
          description: 'Comprehensive AI automation services including process automation, workflow optimization, custom AI development, and business intelligence solutions.',
          image: `${baseUrl}/services-og.jpg`
        };
      case '/about':
        return {
          title: 'About NeuralFlow AI - Leading AI Automation Company',
          description: 'Learn about NeuralFlow AI, the premier AI automation company specializing in intelligent process automation and custom AI solutions for businesses.',
          image: `${baseUrl}/about-og.jpg`
        };
      case '/blog':
        return {
          title: 'AI Automation Blog - NeuralFlow AI Insights',
          description: 'Stay updated with the latest AI automation trends, best practices, and industry insights from NeuralFlow AI experts.',
          image: `${baseUrl}/blog-og.jpg`,
          type: 'blog'
        };
      case '/contact':
        return {
          title: 'Contact NeuralFlow AI - Get Your AI Automation Quote',
          description: 'Ready to transform your business with AI automation? Contact NeuralFlow AI for a free consultation and custom AI solution quote.',
          image: `${baseUrl}/contact-og.jpg`
        };
      default:
        return { title, description, image, type };
    }
  };

  const pageContent = getPageSpecificContent();

  return (
    <Helmet>
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageContent.title} />
      <meta property="og:description" content={pageContent.description} />
      <meta property="og:image" content={pageContent.image} />
      <meta property="og:image:alt" content={pageContent.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={pageContent.type || type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@neuralflowai" />
      <meta name="twitter:creator" content="@neuralflowai" />
      <meta name="twitter:title" content={pageContent.title} />
      <meta name="twitter:description" content={pageContent.description} />
      <meta name="twitter:image" content={pageContent.image} />
      <meta name="twitter:image:alt" content={pageContent.title} />

      {/* LinkedIn specific */}
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="linkedin:owner" content="neuralflow-ai" />

      {/* Facebook specific */}
      <meta property="fb:app_id" content="NEURALFLOW2024FB" />
      <meta property="og:see_also" content="https://www.linkedin.com/company/neuralflow-ai" />
      <meta property="og:see_also" content="https://twitter.com/neuralflowai" />

      {/* Article specific tags */}
      {article && type === 'article' && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional social media optimization */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="pinterest:id" content="neuralflowai" />
      
      {/* WhatsApp sharing optimization */}
      <meta property="og:image:secure_url" content={pageContent.image} />
      <meta property="og:video" content={`${baseUrl}/demo-video.mp4`} />
      <meta property="og:video:type" content="video/mp4" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />

      {/* Rich snippets for social sharing */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
    </Helmet>
  );
};

export default OpenGraphTags;