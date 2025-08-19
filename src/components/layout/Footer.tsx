
import React from 'react';
import { Logo } from '../Logo';
import { Twitter, Linkedin, MessageCircle, Users, Calendar, Youtube, DollarSign, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const joinDiscord = () => {
    window.open('https://discord.gg/Ew8kkNH8ny', '_blank');
  };

  const openCalendly = () => {
    window.open('https://calendly.com/neuralflow-cloud/30min', '_blank', 'width=800,height=600');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Fiverr Icon Component
  const FiverrIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm4.8 18.1h-2.6v-1.5c-.4.8-1.2 1.7-2.6 1.7-1.8 0-3.2-1.4-3.2-3.6 0-2.2 1.4-3.6 3.2-3.6 1.3 0 2.1.8 2.6 1.6V9.2h2.6v8.9zM9.4 6.9c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM8.9 18.1H6.3V9.2h2.6v8.9z"/>
    </svg>
  );

  // Custom Upwork Icon Component
  const UpworkIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.004-2.439-5.457-5.439-5.457z"/>
    </svg>
  );

  // Custom Instagram Icon Component
  const InstagramIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  return (
    <footer className="py-12 glass-card m-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div onClick={scrollToTop} className="cursor-pointer">
              <Logo />
            </div>
            <p className="max-w-md text-foreground/60 mt-4">
              Leading <strong>AI automation agency</strong> specializing in <strong>intelligent process automation</strong>, <strong>custom AI agents</strong>, and business workflow optimization. Transform your operations with proven AI solutions.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={openCalendly} size="sm" className="bg-accent-blue hover:bg-accent-blue/90 text-black">
                <Calendar className="h-4 w-4 mr-2" />
                Book Demo
              </Button>
              <Button onClick={joinDiscord} size="sm" variant="outline" className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10">
                <Users className="h-4 w-4 mr-2" />
                Connect Discord
              </Button>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0">
            <h4 className="font-bold text-white mb-4">AI Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-foreground/60 hover:text-white transition-colors">
                  AI Business Automation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/60 hover:text-white transition-colors">
                  Intelligent Process Automation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/60 hover:text-white transition-colors">
                  Custom AI Agents
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/60 hover:text-white transition-colors">
                  AI Workflow Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/60 hover:text-white transition-colors">
                  AI Chatbots & Virtual Assistants
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 md:mt-0">
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-foreground/60 hover:text-white transition-colors">
                  AI Automation Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground/60 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/60 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/60 hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 md:mt-0">
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-foreground/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 lg:mt-0">
            <h4 className="font-bold text-white mb-4">Connect & Support</h4>
            <div className="space-y-3">
              {/* Social Media Icons */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <a 
                  href="https://www.fiverr.com/neuralflow/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-green-400/10 flex items-center justify-center"
                  title="Fiverr"
                >
                  <FiverrIcon />
                </a>
                <a 
                  href="https://www.upwork.com/freelancers/~01d485e79288c75193" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-600/10 flex items-center justify-center"
                  title="Upwork"
                >
                  <UpworkIcon />
                </a>
                <a 
                  href="https://x.com/NeuralFlowCloud" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-400/10 flex items-center justify-center"
                  title="X (Twitter)"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@NeuralFlow-cloud" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10 flex items-center justify-center"
                  title="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/neuralflow.cloud/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-pink-500/10 flex items-center justify-center"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a 
                  href="#" 
                  className="text-foreground/60 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-600/10 flex items-center justify-center"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
              
              <div className="space-y-2">
                <a 
                  href="https://wa.me/923105163094" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-foreground/60 hover:text-green-400 transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Support
                </a>
                <button 
                  onClick={joinDiscord}
                  className="flex items-center text-foreground/60 hover:text-purple-400 transition-colors text-sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Discord Community
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 text-center text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Neural Flow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
