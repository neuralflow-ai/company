import React, { useState } from 'react';
import { Logo } from '../Logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (item.path) {
      window.location.href = item.path;
    }
  };

  const openCalendly = () => {
    setIsMobileMenuOpen(false);
    window.open('https://calendly.com/neuralflow-cloud/30min', '_blank', 'width=800,height=600');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 lg:sticky lg:top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 glass-card mt-4 px-6">
            <Logo />
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-foreground/80 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={openCalendly}
                variant="outline"
                className="border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Demo
              </Button>
              <Button
                onClick={() => handleNavClick({ path: '/contact' })}
                className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-2 glass-card p-6">
              <nav className="flex flex-col space-y-4 mb-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="text-foreground/80 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={openCalendly}
                  variant="outline"
                  className="border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Demo
                </Button>
                <Button
                  onClick={() => handleNavClick({ path: '/contact' })}
                  className="bg-accent-blue hover:bg-accent-blue/90 text-black font-bold w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
