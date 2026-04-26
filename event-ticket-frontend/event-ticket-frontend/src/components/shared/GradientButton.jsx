import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30',
    cta: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-500/20',
    secondary: 'bg-white/5 border border-white/10 hover:bg-white/10'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`py-3 px-8 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-white shadow-md ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default GradientButton;
