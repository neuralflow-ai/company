import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import IndustriesSection from '@/components/sections/IndustriesSection';
import NetworkBackground from '@/components/three/NetworkBackground';

const Industries = () => {
  return (
    <>
      <SEOHead page="industries" />
      <div className="min-h-screen relative overflow-hidden">
        {/* 3D Background */}
        <NetworkBackground 
          nodeCount={50}
          color="#00c2ff"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-purple/80 via-transparent to-dark-purple/80"></div>
        
        <div className="relative z-10">
          <IndustriesSection />
        </div>
      </div>
    </>
  );
};

export default Industries;