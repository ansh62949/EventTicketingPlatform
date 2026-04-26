import React from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';

const ChartCard = ({ title, type = 'bar', data = [] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-[#27272A] p-8 rounded-3xl border border-white/5 shadow-md flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{title}</h3>
        <div className="flex gap-3">
          {type === 'bounce' ? (
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold text-white/60 hover:text-white transition-colors border border-white/5">
              Weekly <ChevronDown size={14} />
            </button>
          ) : (
            <button className="p-2 bg-white/5 rounded-xl text-white/40 hover:text-yellow-300 transition-colors">
              <Download size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-end gap-3 min-h-[160px]">
        {type === 'bar' ? (
          data.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="w-full bg-white/10 rounded-t-xl group-hover:bg-yellow-300 transition-all duration-500"
              />
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
            </div>
          ))
        ) : (
          <div className="w-full h-full relative overflow-hidden rounded-2xl bg-white/[0.02] flex items-center justify-center p-8">
             <div className="text-center">
                <p className="text-4xl font-black text-white italic mb-2">84.2%</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Optimized Performance</p>
             </div>
             {/* Simple Line Graphic Simulation */}
             <svg className="absolute bottom-0 left-0 w-full h-24" preserveAspectRatio="none">
                <path 
                  d="M0,80 Q100,20 200,60 T400,40" 
                  fill="none" 
                  stroke="rgba(253, 224, 71, 0.2)" 
                  strokeWidth="4" 
                />
             </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChartCard;
