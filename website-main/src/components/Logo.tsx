import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to it first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation to complete, then scroll to hero
      setTimeout(() => {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to hero section
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <a 
      href="/" 
      onClick={handleLogoClick}
      className="font-display text-2xl font-bold tracking-wider cursor-pointer"
    >
      <span className="text-white">Neural</span>
      <span className="text-accent-blue">Flow</span>
    </a>
  );
};
