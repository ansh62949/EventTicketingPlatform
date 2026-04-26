import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', animate = true }) => {
  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
    whileHover: { scale: 1.01 }
  } : {};

  return (
    <Component 
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg transition-all duration-300 hover:bg-white/20 ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
