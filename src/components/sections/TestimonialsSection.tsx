
import React, { useEffect, useRef } from 'react';
// Removed NetworkBackground import - using unified background from App.tsx

const testimonials = [
  {
    name: 'Jane Doe',
    company: 'CEO, Tech Innovators',
    quote: "Neural Flow's automation solution saved us over 1,000 hours a month. It's been a game-changer for our entire operation.",
  },
  {
    name: 'John Smith',
    company: 'Founder, Creative Co.',
    quote: 'The AI agent they built for us handles customer queries with 98% accuracy. Our support team can now focus on high-value interactions.',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/40 via-transparent to-dark-purple/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">Trusted by Industry Leaders</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 scroll-reveal animate-float"
              style={{ 
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${5 + index * 0.5}s`
              }}
            >
              <p className="text-lg text-foreground/80 italic mb-6 animate-slide-in-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                "{testimonial.quote}"
              </p>
              <div className="animate-slide-in-left" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-foreground/60">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
