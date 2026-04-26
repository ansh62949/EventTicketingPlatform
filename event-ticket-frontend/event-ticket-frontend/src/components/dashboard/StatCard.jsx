import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtext, trend, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#27272A] p-6 rounded-3xl shadow-md border border-white/5 space-y-6 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white/5 rounded-2xl text-yellow-300">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-white font-bold text-3xl mb-1">{value}</h3>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{title}</p>
      </div>

      {subtext && (
        <div className="pt-4 border-t border-white/5 text-[10px] text-white/20 font-bold uppercase tracking-widest">
          {subtext}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
