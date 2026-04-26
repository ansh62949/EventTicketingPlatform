import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const CinematicLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isLandingPage = pathname === '/';
  const isDashboard = pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white selection:bg-purple-500/30 relative overflow-x-hidden">
      {/* Cinematic Foundation */}
      <div className="fixed inset-0 z-0">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A] to-[#111827]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 cinematic-grid opacity-30" />
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Layout Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex-grow ${!isLandingPage ? 'pt-40 pb-20' : ''}`}
        >
          <div className={`${!isLandingPage ? 'max-w-[1400px] mx-auto px-6' : ''}`}>
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default CinematicLayout;
