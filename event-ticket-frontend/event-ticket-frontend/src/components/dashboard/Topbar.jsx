import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

const Topbar = ({ title }) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent">
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <div className="relative group hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-300 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search statistics..."
            className="bg-[#1F2937] border border-white/5 rounded-xl py-2.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-yellow-300/30 transition-all w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="bg-yellow-300 text-[#1F2937] px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-300/10 transition-all active:scale-95">
          <Plus size={18} />
          Upgrade Plan
        </button>
        <button className="relative p-2.5 rounded-xl bg-[#1F2937] border border-white/5 text-white/40 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full border-2 border-[#1F2937]" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
