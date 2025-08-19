import { useState, useEffect } from 'react';

const STORAGE_KEY = 'neuralflow_visited';
const POPUP_DELAY = 3000; // 3 seconds delay before showing popup

export const useWelcomePopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    
    // For testing: always show popup (remove this in production)
    const isDebugMode = window.location.search.includes('debug=popup') || window.location.search.includes('showpopup') || !hasVisited;
    
    if (isDebugMode) {
      setIsNewVisitor(true);
      
      // Show popup after delay
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, POPUP_DELAY);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
    // Mark user as visited
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const resetVisitor = () => {
    // For testing purposes - remove visitor flag
    localStorage.removeItem(STORAGE_KEY);
    setIsNewVisitor(true);
    setIsPopupOpen(true);
  };

  return {
    isPopupOpen,
    isNewVisitor,
    closePopup,
    resetVisitor, // For testing
  };
};