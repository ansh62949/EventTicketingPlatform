import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const HighlightCard = ({ title, value, percentage }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-yellow-300 p-8 rounded-[2.5rem] shadow-lg shadow-yellow-300/10 flex flex-col justify-between h-full group transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="p-4 bg-[#1F2937] rounded-3xl text-yellow-300">
          <Activity size={24} />
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="stroke-[#1F2937]/10"
              strokeDasharray="100, 100"
              strokeWidth="4"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-[#1F2937]"
              strokeDasharray={`${percentage}, 100`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="fill-[#1F2937] font-bold text-[8px]" textAnchor="middle">{percentage}%</text>
          </svg>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="text-[#1F2937]/60 text-xs font-bold uppercase tracking-widest mb-2">{title}</h4>
        <h3 className="text-[#1F2937] text-4xl font-black italic tracking-tighter">{value}</h3>
      </div>
    </motion.div>
  );
};

export default HighlightCard;
