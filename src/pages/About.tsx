import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEO/SEOHead';
import AdvancedSchema from '@/components/SEO/AdvancedSchema';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Brain,
  Zap,
  Target,
  Shield
} from 'lucide-react';
import NetworkBackground from '@/components/three/NetworkBackground';
import TrustBadges from '@/components/TrustBadges';

const stats = [
  { icon: Users, label: 'Happy Clients', value: '500+', description: 'Businesses transformed' },
  { icon: Award, label: 'Success Rate', value: '98%', description: 'Project completion' },
  { icon: TrendingUp, label: 'ROI Delivered', value: '300%', description: 'Average return' },
  { icon: Globe, label: 'Countries Served', value: '25+', description: 'Global presence' }
];

const team = [
  {
    name: 'Hamid Qureshi',
    role: 'Founder & CEO',
    expertise: 'AI Strategy, Business Automation, Machine Learning',
    experience: '12+ years in AI development and business automation',
    image: '/api/placeholder/150/150'
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO & Lead Developer',
    expertise: 'AI Architecture, Process Automation',
    experience: '8+ years in enterprise automation',
    image: '/api/placeholder/150/150'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of AI Solutions',
    expertise: 'Custom AI Agents, NLP',
    experience: '7+ years in AI implementation',
    image: '/api/placeholder/150/150'
  },
  {
    name: 'Emily Davis',
    role: 'Business Automation Expert',
    expertise: 'Workflow Optimization, IPA',
    experience: '6+ years in process improvement',
    image: '/api/placeholder/150/150'
  }
];

const values = [
  {
    icon: Brain,
    title: 'Innovation First',
    description: 'We leverage cutting-edge AI technologies to solve complex business challenges and drive innovation.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every solution is designed to deliver measurable ROI and tangible business outcomes.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Enterprise-grade security and compliance ensure your data and processes are always protected.'
  },
  {
    icon: Zap,
    title: 'Rapid Implementation',
    description: 'Fast deployment and quick wins help you see results within 30 days of implementation.'
  }
];

const About = () => {
  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead 
        title="About Neural Flow AI | Leading AI Business Automation Agency"
        description="Learn about Neural Flow AI, the premier AI business automation agency. Our expert team specializes in intelligent process automation, custom AI agents, and enterprise automation solutions with proven 300%+ ROI results."
        keywords="about Neural Flow AI, AI automation agency, intelligent process automation company, AI business solutions, enterprise automation experts, AI workflow optimization team"
        canonicalUrl="https://neuralflow.cloud/about"
      />
      <AdvancedSchema 
        type="organization" 
        data={{
          url: "https://neuralflow.cloud/about"
        }}
      />
      <div className="min-h-screen bg-dark-purple">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-transparent via-light-purple/20 to-transparent overflow-hidden">
        <NetworkBackground nodeCount={50} color="#00c2ff" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/20 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              About <span className="text-gradient">NeuralFlow AI</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-accent-blue font-semibold mb-4 px-4">
              Leading AI Automation Company • Custom AI Solutions • Business Process Automation
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto mb-8 px-4">
              We're a premier <strong>AI automation company</strong> pioneering the future of <strong>business automation</strong> with cutting-edge <strong>AI solutions</strong> that transform how companies operate, scale, and succeed in the digital age. Our <strong>custom AI automation solutions</strong> help businesses reduce costs by 60% and increase efficiency by 300%.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-4">
              <div className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full border border-accent-blue/30">
                <span>500+ Successful Projects</span>
              </div>
              <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
                <span>98% Client Satisfaction</span>
              </div>
              <div className="bg-accent-pink/10 text-accent-pink px-4 py-2 rounded-full border border-accent-pink/30">
                <span>24/7 AI Support</span>
              </div>
            </div>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-glass border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-light-purple p-4 rounded-lg border border-white/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-blue/30">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-accent-pink/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <stat.icon className="h-8 w-8 text-accent-blue relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-accent-blue font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-foreground/70">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Our Story: Pioneering AI Business Automation
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-accent-blue mb-4">
                  From Vision to AI Automation Leadership
                </h3>
                <p className="text-foreground/80 mb-6">
                  Founded with a simple observation: businesses were drowning in repetitive tasks while AI technology remained underutilized. Our founder Hamid Qureshi, with 12+ years in AI and business automation, set out to bridge this gap and democratize intelligent automation.
                </p>
                <p className="text-foreground/80 mb-6">
                  Today, we're recognized as a leading <strong>AI automation agency</strong>, having transformed operations for Fortune 500 companies and growing startups alike. Our expertise in <strong>intelligent process automation</strong> and <strong>custom AI development</strong> has delivered over $50M in cost savings for our clients.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-foreground/80">500+ successful AI automation projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-foreground/80">98% client satisfaction rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-foreground/80">$50M+ in cost savings delivered</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-blue/20 to-accent-pink/20 p-8 rounded-2xl border border-white/10">
                <h4 className="text-xl font-bold text-white mb-4">Our Mission</h4>
                <p className="text-foreground/80 mb-6">
                  To democratize AI automation and make intelligent process automation accessible to businesses of all sizes, driving efficiency, innovation, and growth through cutting-edge AI solutions.
                </p>
                <h4 className="text-xl font-bold text-white mb-4">Our Vision</h4>
                <p className="text-foreground/80">
                  A world where every business operates at peak efficiency through intelligent automation, freeing human potential for creativity, strategy, and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-r from-light-purple/50 to-dark-purple/50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Our Core Values
            </h2>
            <p className="text-lg text-foreground/80 text-center mb-12 max-w-3xl mx-auto">
              These principles guide every <strong>AI automation solution</strong> we develop and every client relationship we build.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-300 text-center relative group overflow-hidden hover:shadow-2xl hover:shadow-accent-blue/20 hover:-translate-y-2 hover:scale-105">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-pink/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue via-accent-pink to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="bg-light-purple p-4 rounded-lg border border-white/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-accent-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-foreground/80">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Meet Our AI Automation Experts
            </h2>
            <p className="text-lg text-foreground/80 text-center mb-12 max-w-3xl mx-auto">
              Our team of <strong>AI specialists</strong> and <strong>automation experts</strong> brings decades of combined experience in delivering enterprise-grade AI solutions.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-300 text-center relative group overflow-hidden hover:shadow-2xl hover:shadow-accent-pink/20 hover:-translate-y-2 hover:scale-105">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-purple-500/10 to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-pink via-purple-500 to-accent-blue opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-accent-blue/20 to-accent-pink/20 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/10">
                      <Users className="h-12 w-12 text-accent-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-accent-blue font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-foreground/70 mb-2">{member.expertise}</p>
                    <p className="text-xs text-foreground/60">{member.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join the ranks of successful companies that have revolutionized their operations with our <strong>AI automation solutions</strong>. Let's discuss your automation goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-4 text-lg"
            >
              Start Your AI Journey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 px-8 py-4 text-lg"
            >
              Download Case Studies
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;