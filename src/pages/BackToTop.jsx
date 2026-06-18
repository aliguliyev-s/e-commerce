import React, { useState, useEffect } from 'react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="btn btn-warning position-fixed bottom-0 end-0 m-4 shadow-lg rounded-circle"
      style={{ width: '45px', height: '45px', zIndex: 1050 }}
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up fw-bold"></i>
    </button>
  );
};