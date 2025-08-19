import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Bot } from 'lucide-react';
import { useState } from 'react';
import NetworkBackground from '../three/NetworkBackground';
import NeuralFlowAgent from '../ai/NeuralFlowAgent';

const HeroSection = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openCalendly = () => {
    window.open('https://calendly.com/neuralflow-cloud/30min', '_blank', 'width=800,height=600');
  };

  return (
    <>
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-light-purple/20 to-transparent">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/20 to-transparent"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in parallax-bg" style={{ animationDelay: '0.5s'}}>
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold tracking-tight text-white leading-tight animate-scale-in">
            Agentic AI & AI Workflow Automation
            <br />
            <span className="text-gradient animate-gradient-shift">
              That Scales Your Success
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/90 animate-slide-in-up px-4" style={{ animationDelay: '0.6s' }}>
            Transform your business with agentic AI solutions, conversational AI platforms, and intelligent process automation that work 24/7
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up px-4" style={{ animationDelay: '1.1s' }}>
            <Button
              onClick={openCalendly}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto button-3d"
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Book a Free Demo
            </Button>
            <Button
              onClick={() => setIsAgentOpen(true)}
              size="lg"
              variant="outline"
              className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 hover:text-accent-pink px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto button-3d"
            >
              <Bot className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Talk to AI Agent
            </Button>
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 hover:text-accent-blue px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto button-3d"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Floating Agent Button - shows when agent is closed */}
      {!isAgentOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setIsAgentOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-accent-pink to-accent-pink/80 hover:from-accent-pink/90 hover:to-accent-pink/70 text-white font-bold p-4 rounded-full shadow-lg hover:shadow-accent-pink/25 transition-all duration-300 transform hover:scale-110"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      {/* AI Agent */}
      <NeuralFlowAgent isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
    </>
  );
};

export default HeroSection;
