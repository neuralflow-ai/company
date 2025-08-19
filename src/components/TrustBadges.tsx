import React from 'react';
import { Shield, Award, CheckCircle, Star, Cloud, Cpu, Zap, Globe } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      name: "Google Cloud",
      icon: Cloud,
      description: "Certified Cloud AI Partner",
      isLucideIcon: true,
      color: "text-blue-400"
    },
    {
      name: "Microsoft Azure",
      icon: Cpu,
      description: "Azure AI Solutions Partner",
      isLucideIcon: true,
      color: "text-blue-500"
    },
    {
      name: "OpenAI Partner",
      icon: Zap,
      description: "AI Technology Partner",
      isLucideIcon: true,
      color: "text-green-400"
    },
    {
      name: "AWS Services",
      icon: Globe,
      description: "Amazon Web Services Partner",
      isLucideIcon: true,
      color: "text-orange-400"
    },
    {
      name: "ISO 27001 Certified",
      icon: Shield,
      description: "Information Security Management",
      isLucideIcon: true,
      color: "text-green-500"
    },
    {
      name: "SOC 2 Compliant",
      icon: CheckCircle,
      description: "Security & Compliance Certified",
      isLucideIcon: true,
      color: "text-blue-400"
    },
    {
      name: "5-Star Rated",
      icon: Star,
      description: "98% Client Satisfaction Rate",
      isLucideIcon: true,
      color: "text-yellow-400"
    },
    {
      name: "Industry Leader",
      icon: Award,
      description: "AI Automation Excellence",
      isLucideIcon: true,
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-dark-purple/50 to-light-purple/30 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-foreground/70">
            Certified partnerships and industry recognition
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-hover:border-accent-blue/50 transition-colors">
                <badge.icon className={`w-8 h-8 ${badge.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h4 className="text-sm font-medium text-white mb-1 leading-tight">
                {badge.name}
              </h4>
              <p className="text-xs text-foreground/60 leading-tight">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-foreground/70">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>500+ Projects Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;