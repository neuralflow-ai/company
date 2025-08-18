import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Search, MessageCircle, ArrowRight, HelpCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import NetworkBackground from '@/components/three/NetworkBackground';
import SEOHead from '@/components/SEO/SEOHead';

const faqData = [
  {
    category: 'AI Automation Services',
    questions: [
      {
        question: 'What are AI automation services and how can they transform my business?',
        answer: 'AI automation services combine artificial intelligence with workflow automation to create intelligent systems that handle complex business processes autonomously. These services include AI workflow automation, custom AI automation solutions, and AI process automation for small businesses. They can reduce operational costs by 30-50%, improve accuracy by 80%, and enable 24/7 operations without human intervention.',
        keywords: 'ai automation services, ai workflow automation, custom ai automation solutions, ai process automation for small business'
      },
      {
        question: 'How much do AI automation services cost for small businesses?',
        answer: 'AI automation services for small businesses typically range from $500-2000 monthly for basic solutions, with custom implementations starting at $5,000-15,000. The cost depends on complexity, integration requirements, and customization needs. Most businesses see ROI within 3-6 months through reduced labor costs, improved efficiency, and fewer errors. We offer flexible pricing and can start with pilot projects to demonstrate value.',
        keywords: 'cost of ai automation services, ai automation for small business, ai automation company, affordable ai automation'
      }
    ]
  },
  {
    category: 'AI Chatbots & Customer Service',
    questions: [
      {
        question: 'What is the best AI chatbot for small business customer service?',
        answer: 'The best AI chatbot for small business depends on your specific needs, but key features include natural language processing, multi-platform support (website, WhatsApp, Facebook Messenger), lead generation capabilities, and CRM integration. Our AI customer service chatbots can handle 80% of routine inquiries, provide 24/7 support, and integrate with your existing systems. WhatsApp chatbot automation is particularly effective for businesses with mobile-first customers.',
        keywords: 'best ai chatbot for small business, ai customer service chatbot, whatsapp chatbot automation, ai chatbot for lead generation'
      },
      {
        question: 'How can AI chatbots help with lead generation and sales?',
        answer: 'AI chatbots for lead generation qualify prospects automatically, collect contact information, and nurture potential customers through intelligent conversation flows. They can increase conversion rates by 20-40% by providing instant responses, personalized recommendations, and seamless handoffs to sales teams. GPT-powered chatbot development creates more natural interactions that build trust and engagement with prospects.',
        keywords: 'ai chatbot for lead generation, gpt powered chatbot development, ai chat automation service, facebook messenger ai chatbot'
      }
    ]
  },
  {
    category: 'Industry-Specific AI Solutions',
    questions: [
      {
        question: 'How does AI automation work for e-commerce businesses?',
        answer: 'AI automation for e-commerce transforms online retail through intelligent inventory management, personalized customer experiences, automated marketing campaigns, and streamlined order processing. AI systems analyze sales patterns for demand forecasting, provide personalized product recommendations, handle customer inquiries through chatbots, and optimize pricing strategies. These improvements typically increase sales by 25-40% while reducing operational costs.',
        keywords: 'ai automation for e-commerce, ai tools for marketing agencies, ai for logistics and transport, ai chatbots for restaurants'
      },
      {
        question: 'What AI solutions work best for real estate lead generation?',
        answer: 'AI for real estate lead generation includes intelligent chatbots that qualify prospects 24/7, automated follow-up systems that nurture leads through email and SMS, predictive analytics that identify high-value prospects, and AI-powered CRM systems that optimize sales processes. These solutions can increase lead conversion rates by 40-60% while reducing manual prospecting time by 80%.',
        keywords: 'ai for real estate lead generation, ai tools for healthcare automation, ai automation for law firms, ai for financial advisors'
      },
      {
        question: 'How can restaurants and salons benefit from AI automation?',
        answer: 'AI chatbots for restaurants handle online orders, reservations, and customer inquiries automatically, integrating with POS systems for seamless operations. AI appointment scheduling for salons manages bookings, sends reminders, handles cancellations, and optimizes staff schedules. These solutions improve customer experience while reducing administrative workload by 70-80%.',
        keywords: 'ai chatbots for restaurants, ai appointment scheduling for salons, ai automation for education, ai for marketing agencies'
      }
    ]
  },
  {
    category: 'Workflow & Productivity Automation',
    questions: [
      {
        question: 'How can AI automate repetitive tasks in my business?',
        answer: 'AI can automate repetitive tasks including data entry, email management, document processing, meeting scheduling, and report generation. AI automation for data entry achieves 99%+ accuracy while processing documents 10x faster than manual methods. AI tools for email automation categorize messages, draft responses, and manage customer communications. These solutions typically save 20-30 hours per week per employee.',
        keywords: 'automate repetitive tasks with ai, ai automation for data entry, ai tools for email automation, ai for document processing'
      },
      {
        question: 'What are the best workflow automation tools?',
        answer: 'The best workflow automation tools combine AI capabilities with user-friendly interfaces, extensive integration options, and scalable architecture. Top features include AI meeting scheduling tools, AI-powered CRM automation, AI tools for project management, and AI for HR onboarding automation. These platforms offer both pre-built templates and custom workflow creation capabilities for maximum flexibility.',
        keywords: 'best workflow automation tools, ai meeting scheduling tools, ai powered crm automation, ai tools for project management'
      },
      {
        question: 'How does AI workflow automation help remote teams?',
        answer: 'AI workflow for remote teams includes automated project tracking, intelligent task assignment, progress monitoring, and communication management. These systems ensure team coordination and productivity regardless of geographical location. AI for HR onboarding automation streamlines new employee processes, while AI tools for project management optimize resource allocation and deadline management.',
        keywords: 'ai workflow for remote teams, ai for hr onboarding automation, remote team productivity, distributed team automation'
      }
    ]
  },
  {
    category: 'Content & Marketing Automation',
    questions: [
      {
        question: 'How can AI tools transform content marketing strategies?',
        answer: 'AI tools for content marketing revolutionize how businesses create, distribute, and optimize content across multiple channels. AI social media automation platforms create engaging posts, schedule content, and analyze performance metrics. AI for blog writing automation generates SEO-optimized content, while AI copywriting services create compelling marketing materials. These solutions enable consistent, high-quality content production while reducing time and resource requirements significantly.',
        keywords: 'ai tools for content marketing, ai social media automation, ai for blog writing automation, ai copywriting services'
      },
      {
        question: 'What AI tools are best for video and image creation?',
        answer: 'AI video creation tools generate promotional videos, explainer content, and social media clips automatically, combining text, images, and audio to create professional-quality videos without extensive production resources. AI image generation for marketing creates custom visuals, product mockups, and marketing graphics that align with brand guidelines. These solutions provide unlimited creative assets without expensive photography or design services.',
        keywords: 'ai video creation tools, ai image generation for marketing, ai for influencer marketing, ai powered ad copy optimization'
      },
      {
        question: 'How does AI email marketing automation improve results?',
        answer: 'AI email marketing automation platforms personalize content, optimize send times, segment audiences, and create automated drip campaigns. AI SEO content generators ensure keyword optimization while maintaining readability and engagement. These systems improve open rates by 25-40%, click-through rates by 30-50%, and conversion rates by 20-35% through intelligent automation and personalization.',
        keywords: 'ai email marketing automation, ai seo content generator, personalized email campaigns, automated marketing optimization'
      }
    ]
  },
  {
    category: 'Agentic AI & AI Agents',
    questions: [
      {
        question: 'What are agentic AI systems and how do they differ from traditional chatbots?',
        answer: 'Agentic AI systems are autonomous AI agents that can plan, execute, and adapt their strategies to achieve specific business objectives without constant human oversight. Unlike traditional chatbots that respond to queries, agentic AI can break down complex tasks into manageable steps, make independent decisions, and execute multi-step workflows. They represent the evolution from reactive AI to proactive, goal-oriented AI systems that can handle complex business processes end-to-end.',
        keywords: 'agentic AI, AI agents, autonomous AI systems, intelligent automation'
      },
      {
        question: 'How can AI voice agents transform my customer service operations?',
        answer: 'AI voice agents go far beyond traditional IVR systems. They can understand natural speech, detect emotions, maintain context across conversations, and handle complex multi-turn dialogues. These agents can process transactions, access customer data, schedule appointments, and provide personalized support 24/7. They integrate with your business systems to provide complete resolution without human handoff, improving customer satisfaction while reducing operational costs by 60-80%.',
        keywords: 'AI voice agents, conversational AI, voice automation, customer service AI'
      },
      {
        question: 'What is multimodal AI and how can it benefit my business?',
        answer: 'Multimodal AI can process and understand multiple types of data simultaneously - text, images, audio, and video. This enables more comprehensive business applications like analyzing customer emotions through voice tone and facial expressions during video calls, processing documents with both text and visual elements, or creating cohesive marketing campaigns across different media types. It provides a more human-like understanding of information, leading to better decision-making and customer experiences.',
        keywords: 'multimodal AI, visual AI, audio processing AI, comprehensive AI solutions'
      }
    ]
  },
  {
    category: 'Implementation & ROI',
    questions: [
      {
        question: 'How quickly can I deploy agentic AI systems in my business?',
        answer: 'Agentic AI deployment is significantly faster than traditional automation. Simple AI agents can be operational in 1-2 weeks, while complex multi-agent systems take 4-8 weeks. Our streamlined approach includes: Week 1: AI agent design and training, Week 2: Integration and testing, Week 3-4: Optimization and scaling. Advanced agentic AI systems can adapt and improve autonomously, reducing ongoing maintenance and accelerating time-to-value.',
        keywords: 'agentic AI implementation, AI agent deployment, rapid AI automation'
      },
      {
        question: 'What ROI can I expect from multimodal AI and voice agents?',
        answer: 'Multimodal AI and voice agents deliver exceptional ROI: 400-600% ROI within 12 months, 70-85% reduction in customer service costs, 90% improvement in customer satisfaction scores, 24/7 intelligent support without human intervention, 50-70% faster document processing with visual AI. Voice agents alone can handle 80-95% of customer inquiries without escalation, dramatically reducing operational costs while improving service quality.',
        keywords: 'multimodal AI ROI, voice agent benefits, AI automation savings'
      },
      {
        question: 'How do I integrate agentic AI with my existing business systems?',
        answer: 'Modern agentic AI systems are designed for seamless integration with existing infrastructure. They connect via APIs to CRM, ERP, databases, and cloud platforms without disrupting current operations. Our AI agents can work with popular systems like Salesforce, Microsoft 365, SAP, and custom applications. The integration process is automated and requires minimal IT involvement, with most connections established within hours rather than weeks.',
        keywords: 'AI system integration, agentic AI compatibility, seamless AI deployment'
      }
    ]
  },
  {
    category: 'Trending AI Technologies',
    questions: [
      {
        question: 'What makes hyperautomation different from traditional automation?',
        answer: 'Hyperautomation combines agentic AI, RPA, machine learning, and low-code platforms to create end-to-end intelligent automation ecosystems. Unlike traditional automation that handles single tasks, hyperautomation orchestrates multiple AI agents, systems, and processes to automate entire business functions. It includes self-healing capabilities, predictive optimization, and continuous learning, making it 10x more powerful than conventional automation approaches.',
        keywords: 'hyperautomation, intelligent process automation, AI orchestration, end-to-end automation'
      },
      {
        question: 'How can intelligent document processing transform my business operations?',
        answer: 'Intelligent document processing (IDP) uses multimodal AI to understand, extract, and process information from any document type - invoices, contracts, forms, emails, images, and videos. It can handle unstructured data, understand context, validate information, and automatically route documents through approval workflows. This eliminates 90% of manual document handling while improving accuracy and compliance.',
        keywords: 'intelligent document processing, document AI, automated data extraction, multimodal document analysis'
      },
      {
        question: 'What are the latest AI business optimization strategies?',
        answer: 'AI business optimization focuses on predictive analytics, real-time decision making, and autonomous process improvement. Key strategies include: AI-powered demand forecasting and inventory optimization, dynamic pricing and revenue optimization, predictive maintenance and resource allocation, customer behavior analysis and personalization, and autonomous supply chain management. These systems continuously optimize operations without human intervention.',
        keywords: 'AI business optimization, predictive analytics, autonomous optimization, AI-driven insights'
      }
    ]
  },
  {
    category: 'Security & Compliance',
    questions: [
      {
        question: 'How secure are agentic AI systems and multimodal AI platforms?',
        answer: 'Our AI systems feature advanced security including quantum-resistant encryption, zero-trust architecture, and AI-powered threat detection. Agentic AI systems operate within secure sandboxes with granular permission controls, while multimodal AI processes sensitive data through federated learning and differential privacy. We maintain SOC 2 Type II, ISO 27001, and emerging AI governance standards compliance with real-time security monitoring.',
        keywords: 'agentic AI security, multimodal AI privacy, quantum-resistant encryption, AI governance'
      },
      {
        question: 'What AI compliance standards are required?',
        answer: 'AI compliance includes traditional standards (GDPR, HIPAA, SOC 2) plus new AI-specific regulations like the EU AI Act, AI Risk Management Framework (NIST), and emerging algorithmic accountability laws. Our systems provide automated compliance monitoring, bias detection, and explainable AI capabilities to meet these evolving requirements. We maintain detailed AI decision audit trails and algorithmic impact assessments.',
        keywords: 'AI compliance, EU AI Act, algorithmic accountability, AI governance standards'
      },
      {
        question: 'How do you ensure responsible AI and prevent bias in agentic systems?',
        answer: 'Our agentic AI systems include built-in bias detection, fairness monitoring, and ethical decision-making frameworks. We implement continuous bias testing across different demographic groups, maintain diverse training datasets, and use explainable AI to ensure transparent decision-making. Regular algorithmic audits and human oversight mechanisms ensure our AI agents operate ethically and responsibly across all business applications.',
        keywords: 'responsible AI, AI bias prevention, ethical AI agents, algorithmic fairness, AI transparency'
      }
    ]
  },
  {
    category: 'Getting Started with AI',
    questions: [
      {
        question: 'How can I start implementing agentic AI and voice agents in my business?',
        answer: 'Starting with agentic AI is streamlined: 1) Free AI readiness assessment to identify high-impact use cases, 2) Design custom AI agents tailored to your specific workflows, 3) Rapid deployment within 1-2 weeks with minimal disruption, 4) Monitor and optimize agent performance with real-time analytics, 5) Scale successful agents across departments. Our no-code platform allows business users to configure and manage AI agents without technical expertise.',
        keywords: 'agentic AI implementation, voice agent deployment, AI readiness assessment, no-code AI platform'
      },
      {
        question: 'What do I need to prepare for multimodal AI and intelligent automation?',
        answer: 'Preparing for multimodal AI requires: existing data sources (documents, images, audio, video), current business processes documentation, integration requirements with existing systems, team training preferences, and success metrics definition. Our multimodal AI can work with any data format and integrates seamlessly with popular business platforms. We handle the technical complexity while you focus on business outcomes.',
        keywords: 'multimodal AI preparation, intelligent automation setup, AI data requirements, business integration'
      },
      {
        question: 'What ongoing support do you provide for AI technologies?',
        answer: 'Our AI support includes: 24/7 autonomous system monitoring with self-healing capabilities, continuous AI agent optimization and learning, regular updates with latest AI advancements, dedicated AI success manager, comprehensive analytics and performance reporting, and strategic guidance for expanding AI across your organization. Our agentic AI systems largely manage themselves, requiring minimal human intervention.',
        keywords: 'AI support, autonomous AI monitoring, AI success management, continuous AI optimization'
      }
    ]
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = ['all', ...faqData.map(cat => cat.category)];
  
  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(cat => cat.category === selectedCategory);

  const scrollToContact = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  const handleConsultation = () => {
    // Open email client with pre-filled consultation request
    const subject = encodeURIComponent('Free AI Consultation Request');
    const body = encodeURIComponent('Hi, I would like to schedule a free consultation to discuss AI automation for my business. Please let me know your availability.');
    window.open(`mailto:hello@neuralflow.cloud?subject=${subject}&body=${body}`, '_blank');
  };

  const handleBlogNavigation = () => {
    // Navigate to blog page
    window.location.href = '/blog';
  };

  return (
    <>
      <SEOHead 
        title="AI Automation FAQ - Agentic AI & Multimodal Solutions | NeuralFlow"
        description="Get expert answers about agentic AI systems, multimodal AI solutions, voice AI agents, and how cutting-edge automation technologies can transform your business."
        keywords="agentic AI, multimodal AI, voice AI agents, AI automation FAQ, intelligent automation, AI chatbots, workflow automation"
        canonical="https://neuralflow.cloud/faq"
      />
      <div className="min-h-screen bg-dark-purple relative overflow-hidden">
      {/* Network Background */}
      <NetworkBackground 
        nodeCount={50}
        color="#00c2ff"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/40 to-transparent"></div>
      
      {/* Header */}
      <section className="relative z-10 pt-32 pb-20 px-4 bg-gradient-to-b from-transparent via-light-purple/20 to-transparent">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Agentic AI & Automation
              <span className="text-gradient block">FAQ</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-accent-blue font-semibold mb-4 px-4">
              Everything You Need to Know About Agentic AI & Multimodal Automation
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto mb-8 px-4">
              Get expert answers about <strong>agentic AI systems</strong>, <strong>multimodal AI solutions</strong>, <strong>voice AI agents</strong>, and how cutting-edge automation technologies can transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10 py-8 bg-glass border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-accent-blue text-black" 
                  : "border-white/20 text-white hover:bg-white/10"
                }
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-accent-blue rounded"></div>
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <Card key={`${categoryIndex}-${faqIndex}`} className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-300 relative group overflow-hidden hover:shadow-2xl hover:shadow-accent-blue/20 hover:-translate-y-1 hover:scale-[1.02]">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-pink/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Animated border glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-pink to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
                      <CardContent className="p-0 relative z-10">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <h4 className="text-lg font-semibold text-white pr-4">
                            {faq.question}
                          </h4>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-accent-blue flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-accent-blue flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-foreground/80 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {faq.keywords.split(', ').map((keyword, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs bg-accent-blue/10 text-accent-blue px-2 py-1 rounded"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Still Have Questions About AI Automation?
          </h3>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Our <strong>AI automation experts</strong> are ready to answer your specific questions and help you design the perfect automation strategy for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold px-8 py-4 text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask Our Experts
            </Button>
            <Button 
              onClick={handleConsultation}
              size="lg"
              variant="outline"
              className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 px-8 py-4 text-lg"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleBlogNavigation}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              Read Our Blog
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default FAQ;