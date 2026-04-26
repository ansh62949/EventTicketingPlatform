import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`container-cinematic py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
