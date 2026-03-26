import React, { useRef, useState, useEffect } from 'react';
import './PartnerLogos.css';
import { partnerImages } from './PartnerLogosImages'; 

export const PartnerLogos = () => {
  const trackRef = useRef(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      
      setShowLeftArrow(scrollLeft > 0);
      
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    handleScroll(); 
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 300; 
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="partner-logos-section">
      <div className="partner-logos-container">
        <h2 className="partner-heading">
          Learn from 350+ leading universities and companies
        </h2>
        
        <div className="track-wrapper">
          {showLeftArrow && (
            <button 
              className="nav-arrow left-arrow" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          <div className="logos-track" ref={trackRef} onScroll={handleScroll}>
            {Object.entries(partnerImages).map(([name, logoElement]) => (
              <div key={name} className="logo-pill">
                <div className="logo-img-wrapper">
                  {logoElement}
                </div>
                <span className="logo-text">{name}</span>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button 
              className="nav-arrow right-arrow" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};