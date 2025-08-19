
import React from 'react';
import ContactSection from '@/components/sections/ContactSection';
import SEOHead from '@/components/SEO/SEOHead';
import AdvancedSchema from '@/components/SEO/AdvancedSchema';

const Contact = () => {
  return (
    <>
      <SEOHead 
        title="Contact NeuralFlow AI | Get Your Free AI Automation Consultation"
        description="Ready to transform your business with AI automation? Contact NeuralFlow AI for a free consultation. Get expert guidance on intelligent automation solutions tailored to your needs."
        keywords="contact neuralflow ai, ai automation consultation, free ai consultation, intelligent automation contact, ai solutions inquiry"
        canonicalUrl="https://neuralflow.cloud/contact"
        page="contact"
      />
      <AdvancedSchema 
        type="organization" 
        data={{
          url: "https://neuralflow.cloud/contact"
        }}
      />
      <div className="pt-24 sm:pt-28 md:pt-32">
        <ContactSection />
      </div>
    </>
  );
};

export default Contact;
