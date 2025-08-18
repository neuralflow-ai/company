import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Bot, MessageSquare, TrendingUp } from 'lucide-react';

const portfolioProjects = [
  {
    title: "AI Trading Bot",
    description: "Developed an intelligent trading bot that analyzes market patterns and executes trades automatically. Achieved 85% success rate with automated portfolio management.",
    technologies: ["Python", "Machine Learning", "API Integration"],
    category: "Financial AI",
    icon: TrendingUp,
    results: "85% success rate, 40% increased ROI"
  },
  {
    title: "WhatsApp Business Automation",
    description: "Created a comprehensive WhatsApp automation system that handles customer inquiries, processes orders, and integrates with CRM systems.",
    technologies: ["WhatsApp API", "Node.js", "AI Chatbot"],
    category: "Business Automation",
    icon: MessageSquare,
    results: "70% reduction in response time, 50% cost savings"
  },
  {
    title: "Multi-Platform Chatbot Network",
    description: "Designed and deployed AI chatbots across multiple platforms with unified conversation management and intelligent lead qualification.",
    technologies: ["Multi-platform APIs", "NLP", "Analytics"],
    category: "Customer Engagement",
    icon: Bot,
    results: "200% increase in lead generation, 24/7 availability"
  }
];

const PortfolioSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="portfolio-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-dark-purple/20 via-dark-purple/40 to-dark-purple/20">
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Discover how we've transformed businesses with cutting-edge AI automation solutions. 
            From trading bots to content generation, see our proven track record of success.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={index}
                className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-300 group hover:shadow-xl hover:shadow-accent-blue/20"
              >
                <CardContent className="p-6">
                  {/* Project Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-accent-blue/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {project.title}
                      </h3>
                      <span className="text-sm text-accent-pink">{project.category}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 mb-4">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="mb-4 p-3 bg-accent-blue/5 rounded-lg border border-accent-blue/20">
                    <h4 className="text-accent-blue font-semibold text-sm mb-1">Results:</h4>
                    <p className="text-white text-sm font-medium">{project.results}</p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-white/10 text-white px-2 py-1 rounded border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-glass border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Your Next AI Solution?
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can create custom AI automation solutions tailored to your business needs. 
              From concept to deployment, we'll transform your ideas into powerful AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-4"
              >
                Start Your Project
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => window.open('/contact', '_blank')}
                size="lg"
                variant="outline"
                className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 px-8 py-4"
              >
                View More Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;