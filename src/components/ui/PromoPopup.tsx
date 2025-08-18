import React, { useState, useEffect } from 'react';
import { X, Bot, TrendingUp, Zap, Gift, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleServiceClick = (serviceName: string) => {
    const message = `Hi! I'm interested in your ${serviceName} service. I'd like to claim my first order completely free. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/923105163094?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  const handleClaimOffer = () => {
    window.location.href = '/contact';
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup Content - Half screen on mobile */}
      <Card className={`relative w-full max-h-[50vh] sm:max-h-[80vh] max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-dark-purple via-dark-purple/95 to-black border-2 border-accent-blue/30 shadow-2xl transform transition-all duration-300 overflow-y-auto ${
        isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-white group-hover:text-accent-blue transition-colors" />
        </button>

        <CardContent className="p-3 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-2 sm:mb-4">
              <div className="relative">
                <Gift className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-accent-pink animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping" />
              </div>
            </div>
            <h2 className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
              🎉 First Order <span className="text-gradient">Completely FREE!</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-foreground/80 max-w-md mx-auto">
              Get started with our premium AI automation services at absolutely no cost
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button 
              onClick={() => handleServiceClick('Trading Bots')}
              className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 p-3 sm:p-4 rounded-lg border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-accent-blue mr-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base">Trading Bots</h3>
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-blue ml-auto opacity-70" />
              </div>
              <p className="text-xs text-foreground/70">
                AI-powered trading automation
              </p>
            </button>

            <button 
              onClick={() => handleServiceClick('Signal Services')}
              className="bg-gradient-to-br from-accent-pink/10 to-accent-pink/5 p-3 sm:p-4 rounded-lg border border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-pink mr-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base">Signal Services</h3>
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-accent-pink ml-auto opacity-70" />
              </div>
              <p className="text-xs text-foreground/70">
                Real-time market signals
              </p>
            </button>

            <button 
              onClick={() => handleServiceClick('Process Automation')}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-3 sm:p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mr-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base">Process Automation</h3>
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 ml-auto opacity-70" />
              </div>
              <p className="text-xs text-foreground/70">
                Streamline workflows
              </p>
            </button>

            <button 
              onClick={() => handleServiceClick('AI Chatbots')}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-3 sm:p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer hover:scale-105 text-left"
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mr-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base">AI Chatbots</h3>
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 ml-auto opacity-70" />
              </div>
              <p className="text-xs text-foreground/70">
                Custom conversational AI
              </p>
            </button>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-accent-blue/5 to-accent-pink/5 p-2 sm:p-4 rounded-lg border border-white/10 mb-3 sm:mb-6">
            <h4 className="font-semibold text-white mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">What's Included:</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs text-foreground/80">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-blue rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                Complete setup and configuration
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-pink rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                30 days of premium support
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                Custom integration assistance
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                Performance optimization
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button 
              className="flex-1 bg-gradient-to-r from-accent-blue to-accent-pink hover:from-accent-blue/90 hover:to-accent-pink/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/25"
              onClick={handleClaimOffer}
            >
              Claim Free Order
              <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-white/20 text-white hover:bg-white/10 py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm md:text-base transition-all duration-300"
              onClick={handleClose}
            >
              Maybe Later
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-foreground/60 text-center mt-2 sm:mt-4">
            * Limited time offer. Terms and conditions apply. One free order per customer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoPopup;