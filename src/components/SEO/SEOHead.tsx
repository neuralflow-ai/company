import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../../config/seo';
import OpenGraphTags from './OpenGraphTags';
import BreadcrumbSchema from './BreadcrumbSchema';
import LocalBusinessSchema from './LocalBusinessSchema';
import ResourceHints from '../Performance/ResourceHints';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  article?: {
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  canonicalUrl,
  article
}) => {
  const location = useLocation();
  const currentUrl = `${seoConfig.siteUrl}${location.pathname}`;
  
  const pageTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const pageDescription = description || seoConfig.defaultDescription;
  const pageKeywords = keywords || seoConfig.defaultKeywords;
  const pageImage = image || `${seoConfig.siteUrl}/og-image.jpg`;
  const canonical = canonicalUrl || currentUrl;

  // Generate hreflang for international SEO
  const generateHrefLang = () => {
    const languages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'];
    return languages.map(lang => (
      <link
        key={lang}
        rel="alternate"
        hrefLang={lang}
        href={`${seoConfig.siteUrl}/${lang}${location.pathname}`}
      />
    ));
  };

  return (
    <>
      <ResourceHints />
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content={seoConfig.author} />
        <link rel="canonical" href={canonical} />
        
        {/* Enhanced Robots */}
        {noIndex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <>
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          </>
        )}
        
        {/* Language and Location */}
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Francisco, California" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        
        {/* International SEO */}
        <link rel="alternate" hrefLang="x-default" href={`${seoConfig.siteUrl}${location.pathname}`} />
        {generateHrefLang()}
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={seoConfig.siteName} />
        <meta name="application-name" content={seoConfig.siteName} />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        
        {/* Rich Snippets */}
        <meta name="rating" content="5" />
        <meta name="price" content="Contact for Quote" />
        <meta name="priceCurrency" content="USD" />
        <meta name="availability" content="InStock" />
        
        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="123 AI Innovation Drive" />
        <meta name="business:contact_data:locality" content="San Francisco" />
        <meta name="business:contact_data:region" content="CA" />
        <meta name="business:contact_data:postal_code" content="94105" />
        <meta name="business:contact_data:country_name" content="United States" />
        <meta name="business:contact_data:email" content="hello@neuralflow.cloud" />
        <meta name="business:contact_data:phone_number" content="+92 310 5163094" />
        <meta name="business:contact_data:website" content="https://neuralflow.cloud" />
        
        {/* Performance Optimization */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Analytics and Verification */}
        <meta name="google-site-verification" content="neuralflow-google-verification" />
        <meta name="msvalidate.01" content="neuralflow-bing-verification" />
        <meta name="yandex-verification" content="neuralflow-yandex-verification" />
        <meta name="p:domain_verify" content="neuralflow-pinterest-verification" />
        
        {/* Article specific meta tags */}
        {article && (
          <>
            <meta name="article:author" content={article.author} />
            <meta name="article:published_time" content={article.publishedTime} />
            <meta name="article:modified_time" content={article.modifiedTime} />
            <meta name="article:section" content={article.section} />
            <meta name="news_keywords" content={article.tags?.join(', ')} />
          </>
        )}
      </Helmet>
      
      {/* Enhanced Schema Components */}
      <OpenGraphTags
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        url={currentUrl}
        type={article ? 'article' : 'website'}
        article={article}
      />
      <BreadcrumbSchema />
      <LocalBusinessSchema />
    </>
  );
};

export default SEOHead;