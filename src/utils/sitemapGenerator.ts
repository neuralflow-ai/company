import { pageConfigs } from '@/config/seo';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://neuralflow.cloud';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Main pages from pageConfigs
    ...Object.entries(pageConfigs).map(([key, config]) => ({
      loc: config.canonical || `${baseUrl}/${key === 'home' ? '' : key}`,
      lastmod: currentDate,
      changefreq: config.changefreq || 'weekly',
      priority: config.priority || 0.5
    })),
    
    // Blog posts (dynamic content)
    {
      loc: `${baseUrl}/blog/ai-automation-guide`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}/blog/intelligent-process-automation`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}/blog/ai-workflow-optimization`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}/blog/hyperautomation-guide`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    {
      loc: `${baseUrl}/blog/ai-business-optimization`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.7
    },
    
    // Service-specific landing pages
    {
      loc: `${baseUrl}/services/ai-automation`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/process-automation`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/workflow-optimization`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services/custom-ai-development`,
      lastmod: currentDate,
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    
    // Industry pages
    {
      loc: `${baseUrl}/industries/healthcare`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.6
    },
    {
      loc: `${baseUrl}/industries/finance`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.6
    },
    {
      loc: `${baseUrl}/industries/manufacturing`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.6
    },
    {
      loc: `${baseUrl}/industries/ecommerce`,
      lastmod: currentDate,
      changefreq: 'monthly' as const,
      priority: 0.6
    }
  ];

  // Sort by priority (highest first)
  urls.sort((a, b) => b.priority - a.priority);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://neuralflow.cloud';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for better server performance
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Block access to admin or sensitive areas
Disallow: /admin/
Disallow: /api/
Disallow: /node_modules/
Disallow: /.git/

# Allow important files
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /.well-known/

# Host directive
Host: ${baseUrl}`;
};