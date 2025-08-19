
import React from 'react';
import SEOHead from '@/components/SEO/SEOHead';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
const Index = () => {

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <IndustriesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      

    </>
  );
};

export default Index;
