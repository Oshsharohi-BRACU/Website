import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 45 : 0
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className={`relative ${isHovering ? 'text-brand-red' : 'text-white'}`}>
        {/* Aerodynamic Arrowhead / Stealth Fighter Shape */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2L2 22L12 18L22 22L12 2Z" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 2L12 18" 
            stroke="black" 
            strokeWidth="1" 
            strokeOpacity="0.5" 
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default CustomCursor;