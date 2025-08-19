import { useState, useEffect } from 'react';

const POPUP_STORAGE_KEY = 'promo-popup-dismissed';
const POPUP_DELAY = 3000; // 3 seconds delay before showing popup
const POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours cooldown

export const usePromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = () => {
      // Check if popup was dismissed recently
      const dismissedTime = localStorage.getItem(POPUP_STORAGE_KEY);
      
      if (dismissedTime) {
        const timeSinceDismissed = Date.now() - parseInt(dismissedTime);
        if (timeSinceDismissed < POPUP_COOLDOWN) {
          return; // Don't show popup if within cooldown period
        }
      }

      // Show popup after delay if not already shown
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
        }, POPUP_DELAY);

        return () => clearTimeout(timer);
      }
    };

    checkAndShowPopup();
  }, [hasShown]);

  const closePopup = () => {
    setIsOpen(false);
    // Store dismissal time in localStorage
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  const openPopup = () => {
    setIsOpen(true);
    setHasShown(true);
  };

  return {
    isOpen,
    closePopup,
    openPopup,
  };
};

export default usePromoPopup;