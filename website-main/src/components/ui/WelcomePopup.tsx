import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { Button } from './button';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      
      try {
        // Save email to localStorage (for local development)
        import('../../utils/emailStorage').then(({ saveEmail }) => {
          saveEmail(email, 'welcome-popup');
        });
        
        // Submit via email service
        const { submitEmail, getEmailConfig } = await import('../../utils/emailService');
        const config = getEmailConfig();
        await submitEmail(
          {
            email,
            source: 'welcome-popup'
          },
          {
            formspreeId: config.formspree.welcomePopupId
          }
        );
        
        console.log('✅ Email saved from welcome popup:', email);
      } catch (error) {
        console.error('Error submitting email:', error);
      }
      
      // Auto-close after showing success message
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const handleGetDiscount = () => {
    // Scroll to contact section or redirect to contact page
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      onClose();
    } else {
      // If no contact section, redirect to contact page
      window.location.href = '/contact';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-dark-purple via-light-purple to-dark-purple border border-accent-blue/30 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-pink/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-blue/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 rounded-full blur-2xl animate-spin-slow" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to NeuralFlow AI! 🎉
                </h2>
                <p className="text-accent-blue font-semibold text-lg">
                  Exclusive First-Time Visitor Offer
                </p>
              </div>

              {/* Discount offer */}
              <div className="bg-gradient-to-r from-accent-blue/20 to-accent-pink/20 border border-accent-blue/30 rounded-xl p-6 mb-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-accent-blue mr-2" />
                  <span className="text-3xl font-bold text-gradient">50% OFF</span>
                  <Sparkles className="w-6 h-6 text-accent-pink ml-2" />
                </div>
                <p className="text-white font-semibold mb-2">
                  Your First AI Automation Project
                </p>
                <p className="text-foreground/80 text-sm">
                  Transform your business with custom AI solutions
                </p>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center mb-6 p-3 bg-dark-purple/50 rounded-lg border border-accent-pink/30">
                <Clock className="w-5 h-5 text-accent-pink mr-2" />
                <span className="text-white font-semibold">
                  Offer expires in: <span className="text-accent-pink">{formatTime(timeLeft)}</span>
                </span>
              </div>

              {/* Email form */}
              <form 
                onSubmit={handleSubmit} 
                className="mb-6"
              >
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to claim discount"
                    className="w-full px-4 py-3 bg-dark-purple/50 border border-white/20 rounded-lg text-white placeholder:text-foreground/50 focus:outline-none focus:border-accent-blue transition-colors"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent-blue to-accent-pink hover:from-accent-blue/90 hover:to-accent-pink/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Claim 50% Discount
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {/* Additional benefits */}
              <div className="text-center">
                <p className="text-foreground/60 text-sm mb-3">
                  What you'll get:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-foreground/80">
                    <div className="w-2 h-2 bg-accent-blue rounded-full mr-2" />
                    Custom AI automation consultation
                  </div>
                  <div className="flex items-center justify-center text-foreground/80">
                    <div className="w-2 h-2 bg-accent-pink rounded-full mr-2" />
                    Personalized solution design
                  </div>
                  <div className="flex items-center justify-center text-foreground/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    30-day support included
                  </div>
                </div>
              </div>

              {/* Alternative actions */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-2">
                <button
                  onClick={handleGetDiscount}
                  className="text-accent-blue hover:text-accent-blue/80 text-sm underline transition-colors block w-full"
                >
                  Skip email and get discount now
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('neuralflow_visited', 'true');
                    onClose();
                  }}
                  className="text-gray-400 hover:text-gray-300 text-xs transition-colors block w-full"
                >
                  Don't show this again
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Discount Claimed! 🎉
              </h3>
              <p className="text-foreground/80 mb-4">
                Check your email for the discount code and next steps.
              </p>
              <p className="text-accent-blue font-semibold">
                We'll contact you within 24 hours!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;