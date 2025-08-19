import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import SEOHead from '@/components/SEO/SEOHead';
import NetworkBackground from '@/components/three/NetworkBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead page="notfound" />
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <NetworkBackground 
          nodeCount={50}
          color="#00c2ff"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/40 to-transparent"></div>
        
        <div className="text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gradient font-display">404</h1>
        <p className="text-xl text-foreground/80 mb-6">Oops! The page you're looking for doesn't exist</p>
        <p className="text-foreground/60 mb-8">It might have been moved, deleted, or you entered the wrong URL.</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-pink text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 transform hover:scale-105"
        >
          Return to Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
