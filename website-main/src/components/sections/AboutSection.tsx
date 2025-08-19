
import React, { useEffect, useRef, useState } from 'react';
import { Brain, Target, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Removed NetworkBackground import - using unified background from App.tsx
import NeuralFlowAgent from '../ai/NeuralFlowAgent';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  const values = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We pioneer cutting-edge AI solutions that transform industries and unlock new possibilities for growth.',
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Every automation delivers measurable ROI, streamlined processes, and competitive advantages.',
    },
    {
      icon: Users,
      title: 'Human-Centered',
      description: 'Our AI amplifies human potential, enhancing creativity and productivity without replacement.',
    },
    {
      icon: Rocket,
      title: 'Future Ready',
      description: 'Scalable solutions that evolve with your business, ensuring long-term success and adaptability.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section ref={sectionRef} id="about-section" className="py-20 relative overflow-hidden section-transition">
        {/* Using unified background from App.tsx */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-purple/40 via-transparent to-dark-purple/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20 scroll-reveal">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gradient mb-8">
              About NeuralFlow - Leading AI Automation Company
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed mb-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                Transforming Tomorrow Through <span className="text-gradient">AI Bots, AI Agents & AI Automation</span>
              </p>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                We are the #1 AI automation company and leading AI automation agency dedicated to revolutionizing businesses through 
                cutting-edge AI bots, AI agents, and intelligent automation solutions. Our mission is to democratize AI automation technology, making it 
                accessible, powerful, and transformative for organizations seeking 100k+ growth across all industries and scales.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <div className="scroll-reveal animate-slide-in-left space-y-6">
              <div className="space-y-4">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white">Our Vision</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full"></div>
              </div>
              
              <div className="space-y-6 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  To become the <span className="text-white font-semibold">global leader in AI bots, AI agents, and AI automation</span>, 
                  empowering every business to harness the transformative power of our AI automation services 
                  and unlock their full potential with our proven AI agencies solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  We envision a future where agentic AI enhances human creativity and productivity, creating 
                  <span className="text-accent-blue font-medium"> unprecedented opportunities</span> for 
                  innovation and growth across every sector through intelligent process automation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => setIsAgentOpen(true)}
                  className="bg-gradient-to-r from-accent-pink to-accent-pink/80 hover:from-accent-pink/90 hover:to-accent-pink/70 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-accent-pink/25 transition-all duration-300"
                >
                  Talk to Our AI Agent
                </Button>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  className="border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 font-bold px-8 py-3 text-lg"
                >
                  Start Your Journey
                </Button>
              </div>
            </div>

            <div className="glass-card p-8 md:p-10 scroll-reveal animate-slide-in-right space-y-6">
              <div className="space-y-3">
                <h4 className="font-display text-2xl md:text-3xl font-bold text-white">Why Choose Neural Flow?</h4>
                <div className="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full"></div>
              </div>
              
              <ul className="space-y-5">
                <li className="flex items-start animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full mt-2 mr-4 flex-shrink-0 animate-pulse-glow"></div>
                  <span className="text-lg text-foreground/90">
                    <span className="text-white font-semibold">500+</span> successful AI implementations across diverse industries
                  </span>
                </li>
                <li className="flex items-start animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full mt-2 mr-4 flex-shrink-0 animate-pulse-glow"></div>
                  <span className="text-lg text-foreground/90">
                    <span className="text-white font-semibold">98%</span> client satisfaction with proven, measurable ROI
                  </span>
                </li>
                <li className="flex items-start animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full mt-2 mr-4 flex-shrink-0 animate-pulse-glow"></div>
                  <span className="text-lg text-foreground/90">
                    Expert team with <span className="text-white font-semibold">10+ years</span> in AI and automation excellence
                  </span>
                </li>
                <li className="flex items-start animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="w-3 h-3 bg-gradient-to-r from-accent-blue to-accent-pink rounded-full mt-2 mr-4 flex-shrink-0 animate-pulse-glow"></div>
                  <span className="text-lg text-foreground/90">
                    <span className="text-white font-semibold">24/7</span> dedicated support and continuous optimization
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-16">
            <div className="text-center space-y-4 scroll-reveal">
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">Our Core Values</h3>
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                The principles that drive our innovation and shape our commitment to excellence
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="glass-card p-8 text-center scroll-reveal animate-float group hover:border-accent-blue/50 transition-all duration-500"
                  style={{ 
                    animationDelay: `${index * 0.2 + 0.5}s`,
                    animationDuration: `${5 + index * 0.3}s`
                  }}
                >
                  <div className="bg-gradient-to-br from-light-purple to-dark-purple/50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 border border-accent-blue/20 flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-accent-blue" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 font-display">{value.title}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NeuralFlowAgent 
        isOpen={isAgentOpen} 
        onClose={() => setIsAgentOpen(false)} 
      />
    </>
  );
};

export default AboutSection;
