import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, ArrowRight, CheckCircle, MessageCircle, Star } from 'lucide-react';

interface FreeOrderSectionProps {
  variant?: 'default' | 'compact';
  showBackground?: boolean;
}

const FreeOrderSection: React.FC<FreeOrderSectionProps> = ({ 
  variant = 'default', 
  showBackground = true 
}) => {
  const handleClaimOffer = () => {
    window.location.href = '/contact';
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in claiming my first order completely free. Can you provide more details about your AI automation services?`;
    const whatsappUrl = `https://wa.me/923105163094?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    'Complete AI solution setup',
    'Custom automation workflow',
    'Full integration & testing',
    '30-day support included'
  ];

  const services = [
    { name: 'AI Chatbots', icon: '🤖' },
    { name: 'Process Automation', icon: '⚡' },
    { name: 'Trading Bots', icon: '📈' },
    { name: 'Voice AI Agents', icon: '🎤' }
  ];

  if (variant === 'compact') {
    return (
      <div className={`py-8 ${showBackground ? 'bg-gradient-to-r from-accent-blue/5 to-accent-pink/5' : ''}`}>
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 border-accent-blue/30 hover:border-accent-blue/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-accent-blue mr-2" />
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  🎉 First Order <span className="text-gradient">Completely FREE!</span>
                </h3>
              </div>
              <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                Get started with our premium AI automation services at absolutely no cost. 
                Perfect for testing our capabilities before committing to larger projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleClaimOffer}
                  className="bg-gradient-to-r from-accent-blue to-accent-pink hover:from-accent-blue/90 hover:to-accent-pink/90 text-white font-bold px-6 py-3"
                >
                  Claim Free Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleWhatsAppContact}
                  variant="outline"
                  className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 relative overflow-hidden ${showBackground ? 'bg-gradient-to-r from-accent-blue/5 to-accent-pink/5' : ''}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-pink/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Gift className="h-16 w-16 text-accent-blue animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping" />
              <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-spin" />
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            🎉 First Order <span className="text-gradient animate-gradient-shift">Completely FREE!</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Experience the power of AI automation with zero risk. Get a complete AI solution 
            tailored to your business needs - <strong>absolutely free</strong> for your first order.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
              <span>✅ No Hidden Costs</span>
            </div>
            <div className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full border border-accent-blue/30">
              <span>🚀 Full Implementation</span>
            </div>
            <div className="bg-accent-pink/10 text-accent-pink px-4 py-2 rounded-full border border-accent-pink/30">
              <span>⭐ Premium Support</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Services */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Free Service:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-glass border-white/10 hover:border-accent-blue/50 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <h4 className="font-semibold text-white group-hover:text-accent-blue transition-colors">
                      {service.name}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - What's Included */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">What's Included (FREE):</h3>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 p-6 rounded-lg border border-accent-blue/20">
              <h4 className="font-bold text-white mb-2">💎 Estimated Value: $2,000 - $5,000</h4>
              <p className="text-foreground/70 text-sm">
                This offer includes everything you'd normally pay for in a premium AI automation project.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              onClick={handleClaimOffer}
              size="lg"
              className="bg-gradient-to-r from-accent-blue to-accent-pink hover:from-accent-blue/90 hover:to-accent-pink/90 text-white font-bold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/25"
            >
              Claim Free Order
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleWhatsAppContact}
              size="lg"
              variant="outline"
              className="border-green-500/50 text-green-500 hover:bg-green-500/10 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
          
          <p className="text-xs text-foreground/60 mt-6 max-w-2xl mx-auto">
            * Limited time offer. One free order per customer. Terms and conditions apply. 
            Free order value up to $5,000. Additional features or complex requirements may incur charges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeOrderSection;