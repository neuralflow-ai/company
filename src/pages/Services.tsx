import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEO/SEOHead';
import AdvancedSchema from '@/components/SEO/AdvancedSchema';
// Removed NetlifyStyleHeader import - using unified background from App.tsx
import { 
  Bot, 
  Zap, 
  BrainCircuit, 
  Code, 
  Camera, 
  MessageSquare, 
  Mic, 
  Image,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';
import NetworkBackground from '@/components/three/NetworkBackground';
import TrustBadges from '@/components/TrustBadges';
import FreeOrderSection from '@/components/sections/FreeOrderSection';

const services = [
  {
    icon: BrainCircuit,
    title: 'Intelligent Process Automation (IPA)',
    shortDesc: 'AI-powered business process automation that learns and adapts',
    fullDesc: 'Transform your business operations with our advanced Intelligent Process Automation solutions. Unlike traditional RPA, our IPA systems use machine learning and AI to understand context, make decisions, and continuously optimize processes. Reduce manual tasks by 90% while improving accuracy and speed.',
    benefits: [
      '90% reduction in manual tasks',
      'Self-learning and adaptive workflows',
      'Real-time process optimization',
      'Seamless integration with existing systems',
      'Predictive analytics and insights'
    ],
    useCases: [
      'Invoice processing and approval workflows',
      'Customer onboarding automation',
      'Data extraction and validation',
      'Compliance monitoring and reporting',
      'Supply chain optimization'
    ],
    pricing: 'Starting from $5,000/month',
    roi: '300% ROI in 6 months',
    keywords: 'intelligent process automation, IPA, business process automation, AI workflow automation'
  },
  {
    icon: Zap,
    title: 'AI Workflow Optimization',
    shortDesc: 'Identify bottlenecks and optimize workflows with AI',
    fullDesc: 'Our AI Workflow Optimization service analyzes your current processes, identifies inefficiencies, and implements intelligent solutions to streamline operations. Using advanced analytics and machine learning, we create optimized workflows that adapt to changing business needs.',
    benefits: [
      '60% faster process completion',
      'Automated bottleneck detection',
      'Dynamic workflow adaptation',
      'Real-time performance monitoring',
      'Continuous improvement algorithms'
    ],
    useCases: [
      'Sales pipeline optimization',
      'Manufacturing process improvement',
      'Customer service workflow enhancement',
      'HR process automation',
      'Financial reporting automation'
    ],
    pricing: 'Starting from $3,500/month',
    roi: '250% ROI in 4 months',
    keywords: 'AI workflow optimization, workflow automation tools, process optimization, business efficiency'
  },
  {
    icon: Bot,
    title: 'Custom AI Agent Development',
    shortDesc: 'Bespoke AI agents for your specific business needs',
    fullDesc: 'We develop custom AI agents tailored to your unique business requirements. From customer service bots to complex data analysis agents, our solutions work 24/7 to drive results. Each agent is designed with your specific workflows, data, and objectives in mind.',
    benefits: [
      '24/7 automated operations',
      'Custom-built for your needs',
      'Multi-platform integration',
      'Scalable architecture',
      'Advanced natural language processing'
    ],
    useCases: [
      'Customer support automation',
      'Sales lead qualification',
      'Data analysis and reporting',
      'Content moderation',
      'Inventory management'
    ],
    pricing: 'Starting from $8,000/project',
    roi: '400% ROI in 8 months',
    keywords: 'custom AI agents, AI agent development, business AI solutions, automated AI assistants'
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots & Virtual Assistants',
    shortDesc: 'Intelligent conversational AI for customer engagement',
    fullDesc: 'Deploy sophisticated AI chatbots and virtual assistants that understand context, handle complex queries, and provide personalized experiences. Our conversational AI solutions integrate seamlessly with your existing systems and learn from every interaction.',
    benefits: [
      '80% reduction in support tickets',
      'Instant 24/7 customer support',
      'Multi-language capabilities',
      'Sentiment analysis and escalation',
      'Integration with CRM and helpdesk'
    ],
    useCases: [
      'Customer support automation',
      'Lead generation and qualification',
      'Appointment scheduling',
      'FAQ automation',
      'Product recommendations'
    ],
    pricing: 'Starting from $2,500/month',
    roi: '200% ROI in 3 months',
    keywords: 'AI chatbots, virtual assistants, conversational AI, customer service automation'
  },
  {
    icon: Code,
    title: 'Enterprise AI Automation Systems',
    shortDesc: 'Large-scale intelligent automation for enterprises',
    fullDesc: 'Comprehensive AI automation solutions designed for large enterprises. We integrate AI across multiple departments and systems, creating a unified intelligent automation ecosystem that scales with your business growth.',
    benefits: [
      'Enterprise-grade security',
      'Multi-department integration',
      'Scalable architecture',
      'Advanced analytics dashboard',
      'Compliance and governance'
    ],
    useCases: [
      'Cross-department workflow automation',
      'Enterprise resource planning (ERP) integration',
      'Supply chain automation',
      'Financial process automation',
      'Regulatory compliance automation'
    ],
    pricing: 'Custom enterprise pricing',
    roi: '500% ROI in 12 months',
    keywords: 'enterprise AI automation, intelligent automation systems, AI integration, business automation'
  },
  {
    icon: Camera,
    title: 'AI-Powered Content Automation',
    shortDesc: 'Automate content creation and media processing',
    fullDesc: 'Leverage AI to automate content creation, image processing, and media production. Our solutions generate high-quality content at scale, process images and videos automatically, and maintain brand consistency across all channels.',
    benefits: [
      '10x faster content production',
      'Consistent brand messaging',
      'Automated image/video processing',
      'Multi-format content generation',
      'SEO-optimized content creation'
    ],
    useCases: [
      'Social media content automation',
      'Product image processing',
      'Blog post generation',
      'Video content creation',
      'Marketing material automation'
    ],
    pricing: 'Starting from $4,000/month',
    roi: '350% ROI in 5 months',
    keywords: 'AI content automation, automated content creation, AI image processing, content generation'
  },
  {
    icon: Mic,
    title: 'AI Voice Agents & Conversational AI',
    shortDesc: 'Human-like voice AI agents for customer service and automation',
    fullDesc: 'Deploy advanced AI voice agents that understand context, emotion, and intent. Our voice AI technology provides human-like conversations, multilingual support, and seamless integration with your existing systems for 24/7 automated customer service.',
    benefits: [
      'Human-like voice interactions',
      'Multilingual real-time translation',
      '95% customer satisfaction rate',
      'Emotional intelligence and tone adaptation',
      'Seamless handoff to human agents'
    ],
    useCases: [
      'Customer service automation',
      'Appointment scheduling',
      'Order processing and tracking',
      'Technical support calls',
      'Sales lead qualification'
    ],
    pricing: 'Starting from $6,000/month',
    roi: '400% ROI in 6 months',
    keywords: 'AI voice agents, conversational AI, voice automation, intelligent voice assistants'
  },
  {
    icon: Image,
    title: 'Multimodal AI Solutions',
    shortDesc: 'AI that processes text, images, video, and audio simultaneously',
    fullDesc: 'Revolutionary multimodal AI that understands and processes multiple data types simultaneously. Our multimodal solutions enable real-time video analysis, AI-powered design tools, and fully interactive virtual assistants that work across all media formats.',
    benefits: [
      'Simultaneous multi-format processing',
      'Real-time video and image analysis',
      'Cross-modal understanding and reasoning',
      'Automated multimedia content generation',
      'Enhanced user experience across platforms'
    ],
    useCases: [
      'Real-time video content analysis',
      'Automated design and creative tools',
      'Interactive multimedia assistants',
      'Document processing with images and text',
      'Social media content moderation'
    ],
    pricing: 'Starting from $8,500/month',
    roi: '450% ROI in 8 months',
    keywords: 'multimodal AI, AI video analysis, multimedia AI processing, cross-modal AI'
  },
  {
    icon: BrainCircuit,
    title: 'Agentic AI Systems',
    shortDesc: 'Autonomous AI agents that reason, plan, and execute tasks independently',
    fullDesc: 'Next-generation agentic AI that goes beyond simple automation. Our autonomous AI agents can reason, plan multi-step workflows, make independent decisions, and continuously learn from interactions without constant human oversight.',
    benefits: [
      'Autonomous decision-making capabilities',
      'Multi-step workflow planning and execution',
      'Continuous learning and adaptation',
      'Reduced need for human intervention',
      'Intelligent problem-solving and reasoning'
    ],
    useCases: [
      'Complex workflow automation',
      'Autonomous business process management',
      'Intelligent resource allocation',
      'Predictive maintenance systems',
      'Dynamic supply chain optimization'
    ],
    pricing: 'Starting from $12,000/month',
    roi: '600% ROI in 10 months',
    keywords: 'agentic AI, autonomous AI agents, intelligent automation, AI reasoning systems'
  },
  {
    icon: MessageSquare,
    title: 'AI Customer Support Automation',
    shortDesc: 'Intelligent customer service that handles 95% of inquiries automatically',
    fullDesc: 'Deploy advanced AI customer support systems that understand context, emotion, and intent. Our customer service AI handles complex queries, provides personalized responses, and seamlessly escalates to human agents when needed, reducing support costs by 60%.',
    benefits: [
      '95% of customer inquiries handled automatically',
      '60% reduction in support costs',
      '24/7 multilingual customer support',
      'Emotional intelligence and empathy detection',
      'Seamless human agent handoff'
    ],
    useCases: [
      'Automated ticket resolution',
      'Real-time customer query handling',
      'Order status and tracking support',
      'Technical troubleshooting assistance',
      'Billing and account management'
    ],
    pricing: 'Starting from $4,500/month',
    roi: '350% ROI in 4 months',
    keywords: 'AI customer support automation, intelligent customer service, automated support systems, AI helpdesk'
  },
  {
    icon: Code,
    title: 'Intelligent Document Processing (IDP)',
    shortDesc: 'AI-powered document automation that processes any format instantly',
    fullDesc: 'Revolutionary intelligent document processing that extracts, validates, and processes information from any document format. Our IDP solutions use advanced OCR, NLP, and machine learning to automate document workflows with 99% accuracy.',
    benefits: [
      '99% document processing accuracy',
      '10x faster document processing',
      'Supports all document formats',
      'Automated data extraction and validation',
      'Intelligent document classification'
    ],
    useCases: [
      'Invoice processing and approval',
      'Contract analysis and extraction',
      'Insurance claims processing',
      'Legal document review',
      'Compliance document management'
    ],
    pricing: 'Starting from $3,800/month',
    roi: '400% ROI in 5 months',
    keywords: 'intelligent document processing, IDP, AI document automation, automated document processing'
  },
  {
    icon: TrendingUp,
    title: 'Predictive AI Analytics & Business Intelligence',
    shortDesc: 'AI-powered analytics that predict trends and optimize business decisions',
    fullDesc: 'Advanced predictive AI that analyzes your business data to forecast trends, identify opportunities, and optimize decision-making. Our AI analytics platform provides real-time insights and automated reporting for data-driven business growth.',
    benefits: [
      'Predictive trend analysis and forecasting',
      'Real-time business intelligence dashboards',
      'Automated report generation',
      'Risk assessment and mitigation',
      'Performance optimization recommendations'
    ],
    useCases: [
      'Sales forecasting and pipeline optimization',
      'Customer behavior prediction',
      'Inventory demand forecasting',
      'Financial risk assessment',
      'Market trend analysis'
    ],
    pricing: 'Starting from $5,500/month',
    roi: '450% ROI in 6 months',
    keywords: 'predictive AI analytics, AI business intelligence, automated analytics, predictive business insights'
  },
  {
    icon: DollarSign,
    title: 'AI Sales Automation & Lead Generation',
    shortDesc: 'Intelligent sales automation that qualifies leads and closes deals automatically',
    fullDesc: 'Comprehensive AI sales automation that identifies prospects, qualifies leads, nurtures relationships, and closes deals. Our intelligent sales systems increase conversion rates by 300% while reducing sales cycle time by 50%.',
    benefits: [
      '300% increase in lead conversion rates',
      '50% reduction in sales cycle time',
      'Automated lead scoring and qualification',
      'Personalized outreach campaigns',
      'Intelligent sales pipeline management'
    ],
    useCases: [
      'Automated lead generation and qualification',
      'Personalized email marketing campaigns',
      'Sales pipeline optimization',
      'Customer relationship management',
      'Revenue forecasting and planning'
    ],
    pricing: 'Starting from $4,200/month',
    roi: '500% ROI in 4 months',
    keywords: 'AI sales automation, automated lead generation, intelligent sales systems, AI CRM automation'
  },
  {
    icon: Zap,
    title: 'Hyperautomation & Intelligent Workflows',
    shortDesc: 'End-to-end business process automation with AI, RPA, and machine learning',
    fullDesc: 'Complete hyperautomation solutions that combine AI, RPA, machine learning, and process mining to automate entire business workflows. Our intelligent automation platform connects all your systems for seamless end-to-end automation.',
    benefits: [
      'End-to-end process automation',
      '80% reduction in manual tasks',
      'Intelligent workflow orchestration',
      'Real-time process monitoring',
      'Continuous optimization and learning'
    ],
    useCases: [
      'Complete order-to-cash automation',
      'Employee onboarding workflows',
      'Financial close processes',
      'Supply chain automation',
      'Regulatory compliance workflows'
    ],
    pricing: 'Starting from $7,500/month',
    roi: '550% ROI in 8 months',
    keywords: 'hyperautomation, intelligent workflows, end-to-end automation, business process automation'
  }
];

const Services = () => {
  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const servicesKeywords = services.map(service => service.keywords).join(', ');
  
  return (
    <div className="min-h-screen bg-dark-purple">
      <SEOHead 
        title="AI Business Automation Services | Intelligent Process Automation Solutions"
        description="Comprehensive AI automation services including intelligent process automation, custom AI agents, workflow optimization, and enterprise automation solutions. Transform your business with cutting-edge AI technology."
        keywords={`AI business automation services, intelligent process automation, custom AI agents, workflow automation, enterprise AI solutions, ${servicesKeywords}`}
        canonicalUrl="https://neuralflow.cloud/services"
      />
      <AdvancedSchema 
        type="service" 
        data={{
          name: "AI Automation Services",
          description: "Comprehensive AI automation solutions including custom AI agents, intelligent process automation, workflow optimization, and enterprise AI solutions.",
          url: "https://neuralflow.cloud/services"
        }}
      />
      {/* SEO-Optimized Header with Animated Background */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-background/50 via-background/30 to-transparent overflow-hidden">
        <NetworkBackground nodeCount={50} color="#00c2ff" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              AI Business Automation
              <span className="text-gradient block">Services & Solutions</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-accent-blue font-semibold mb-4 px-4">
              Intelligent Process Automation • AI Workflow Optimization • Custom AI Development
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto mb-8 px-4">
              Transform your business with our comprehensive <strong>AI automation services</strong>. From <strong>intelligent process automation</strong> to <strong>custom AI agent development</strong>, we deliver proven solutions that boost efficiency by 300% and reduce costs by 60%.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-4">
              <div className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full border border-accent-blue/30 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>300% Efficiency Boost</span>
              </div>
              <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>60% Cost Reduction</span>
              </div>
              <div className="bg-accent-pink/10 text-accent-pink px-4 py-2 rounded-full border border-accent-pink/30 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>ROI in 30 Days</span>
              </div>
            </div>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-4 text-lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-500 group relative overflow-hidden hover:shadow-2xl hover:shadow-accent-blue/20 hover:-translate-y-2 hover:scale-[1.02]">
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-pink/0 to-purple-500/0 group-hover:from-accent-blue/10 group-hover:via-accent-pink/10 group-hover:to-purple-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-blue/0 via-accent-pink/0 to-purple-500/0 group-hover:from-accent-blue/30 group-hover:via-accent-pink/30 group-hover:to-purple-500/30 blur-sm transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="bg-light-purple p-3 rounded-lg border border-white/10 group-hover:border-accent-blue/50 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-accent-blue/20 group-hover:to-accent-pink/20 group-hover:scale-110 group-hover:rotate-3">
                      <service.icon className="h-6 w-6 text-accent-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white group-hover:text-accent-blue transition-colors mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-foreground/70 text-sm mb-3">
                        {service.shortDesc}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-accent-blue/10 text-accent-blue px-2 py-1 rounded">
                          {service.pricing}
                        </span>
                        <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded">
                          {service.roi}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-foreground/80 mb-6">
                    {service.fullDesc}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={`benefit-${index}-${idx}`} className="text-sm text-foreground/70 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent-pink" />
                        Use Cases
                      </h4>
                      <ul className="space-y-2">
                        {service.useCases.slice(0, 3).map((useCase, idx) => (
                          <li key={`usecase-${index}-${idx}`} className="text-sm text-foreground/70 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent-pink rounded-full mt-2 flex-shrink-0"></div>
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={scrollToContact}
                      className="bg-accent-blue hover:bg-accent-blue/90 text-black font-semibold flex-1"
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 flex-1"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Free Order Promotion */}
      <FreeOrderSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business with AI Automation?
          </h3>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join 500+ companies that have already transformed their operations with our <strong>AI business automation solutions</strong>. Get a free consultation and custom automation strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-4 text-lg"
            >
              Book Free Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 px-8 py-4 text-lg"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;