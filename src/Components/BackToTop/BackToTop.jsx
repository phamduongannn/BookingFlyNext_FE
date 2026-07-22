import React, { useState, useEffect } from 'react';
import './BackToTop.scss';
import SmoothScroll from 'smooth-scroll';
// yarn add smooth-scroll
const scroll = new SmoothScroll();
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.animateScroll(0);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className="back_to_top"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <a href="#0">
        <i className="fa-solid fa-chevron-up"></i>
      </a>
    </div>
  );
};

export default BackToTop;
