
import React, { useEffect, useRef } from 'react';
import { Building2, Factory, ShoppingCart, HeartHandshake, GraduationCap, Car, Plane, Banknote } from 'lucide-react';
// Removed NetworkBackground import - using unified background from App.tsx

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const industries = [
    {
      icon: Building2,
      title: 'Real Estate',
      description: 'Automate property management, lead qualification, and customer communications for real estate agencies.',
      features: ['Lead scoring', 'Property matching', 'Client follow-ups']
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Optimize production workflows, quality control, and supply chain management with intelligent automation.',
      features: ['Quality inspection', 'Inventory optimization', 'Predictive maintenance']
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Enhance customer experience with personalized recommendations, automated support, and inventory management.',
      features: ['Product recommendations', 'Chatbot support', 'Demand forecasting']
    },
    {
      icon: HeartHandshake,
      title: 'Healthcare',
      description: 'Streamline patient care, appointment scheduling, and medical record management with AI-driven solutions.',
      features: ['Patient scheduling', 'Medical imaging', 'Treatment planning']
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Transform learning experiences with personalized education, automated grading, and student analytics.',
      features: ['Personalized learning', 'Automated assessment', 'Student insights']
    },
    {
      icon: Banknote,
      title: 'Finance',
      description: 'Enhance financial services with fraud detection, risk assessment, and automated trading systems.',
      features: ['Fraud detection', 'Risk analysis', 'Algorithmic trading']
    },
    {
      icon: Car,
      title: 'Automotive',
      description: 'Revolutionize vehicle manufacturing and autonomous driving with advanced AI technologies.',
      features: ['Autonomous systems', 'Predictive maintenance', 'Supply chain optimization']
    },
    {
      icon: Plane,
      title: 'Logistics',
      description: 'Optimize delivery routes, warehouse operations, and supply chain visibility with intelligent automation.',
      features: ['Route optimization', 'Warehouse automation', 'Demand planning']
    }
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

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden section-transition">
      {/* Using unified background from App.tsx */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 scroll-reveal">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-6">
            Industries We Serve
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            Neural Flow delivers cutting-edge AI automation solutions across diverse industries, 
            helping businesses of all sizes transform their operations and achieve unprecedented efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="glass-card p-6 group scroll-reveal animate-float"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${6 + index * 0.2}s`
              }}
            >
              <div className="bg-light-purple p-4 rounded-full w-16 h-16 mx-auto mb-4 border border-white/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-all duration-500 animate-pulse-glow">
                <industry.icon className="h-8 w-8 text-accent-blue" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 text-center">
                {industry.title}
              </h3>
              
              <p className="text-foreground/70 text-sm leading-relaxed mb-4 text-center">
                {industry.description}
              </p>
              
              <div className="space-y-2">
                {industry.features.map((feature, featureIndex) => (
                  <div 
                    key={`${index}-${featureIndex}`} 
                    className="flex items-center text-sm animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1 + featureIndex * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mr-2 flex-shrink-0 animate-pulse-glow"></div>
                    <span className="text-foreground/60">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center scroll-reveal">
          <div className="glass-card p-8 max-w-3xl mx-auto animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="font-display text-2xl font-bold text-white mb-4 text-gradient">
              Don't See Your Industry?
            </h3>
            <p className="text-foreground/80 mb-6">
              Our AI automation solutions are highly adaptable and can be customized for any industry. 
              Contact us to discuss how we can transform your specific business processes.
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 button-3d"
            >
              Get Custom Solution
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
