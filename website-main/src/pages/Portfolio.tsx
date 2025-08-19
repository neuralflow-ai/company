import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import PortfolioSection from '@/components/sections/PortfolioSection';
import NetworkBackground from '@/components/three/NetworkBackground';

const Portfolio = () => {
  return (
    <>
      <SEOHead page="portfolio" />
      <div className="min-h-screen relative overflow-hidden">
        {/* 3D Background */}
        <NetworkBackground 
          nodeCount={50}
          color="#00c2ff"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-purple/80 via-transparent to-dark-purple/80"></div>
        
        <div className="relative z-10">
          <PortfolioSection />
        </div>
      </div>
    </>
  );
};

export default Portfolio;