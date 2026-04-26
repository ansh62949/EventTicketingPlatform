import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Calendar, 
  Settings, 
  Zap,
  ArrowRight,
  Shield,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Statistics' },
    { id: 'Activity', icon: Activity, label: 'Activity Logs' },
    { id: 'Schedule', icon: Calendar, label: 'Event Schedule' },
    { id: 'Settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="relative group/container z-50">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl bg-blue-500/10 rounded-full scale-150 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700" />
      
      <motion.aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`h-[80vh] fixed left-6 top-1/2 -translate-y-1/2 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col transition-all duration-500 ease-in-out relative overflow-hidden ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Header/Logo Area */}
        <div className="p-5 mb-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 min-w-[2.5rem] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                 <Zap size={20} className="text-white" />
              </div>
              <motion.span 
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                className={`font-bold text-lg text-white whitespace-nowrap overflow-hidden`}
              >
                Eventix <span className="text-blue-400">Pro</span>
              </motion.span>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-3">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative group/item ${
                  isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-white/40 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`w-10 h-10 min-w-[2.5rem] flex items-center justify-center rounded-xl transition-all ${
                  isActive ? 'bg-white/20' : 'bg-white/5 group-hover/item:bg-white/10'
                }`}>
                  <item.icon size={20} className={isActive ? 'scale-110' : ''} />
                </div>
                
                <motion.span
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                  transition={{ delay: isExpanded ? 0.1 : 0 }}
                  className="font-bold text-sm whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>

                {/* Collapsed Tooltip */}
                {!isExpanded && (
                  <div className="absolute left-20 px-3 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover/item:opacity-100 translate-x-[-10px] group-hover/item:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-3 mt-auto border-t border-white/5">
           <button className="w-full flex items-center gap-4 p-3 rounded-2xl text-white/20 hover:text-white transition-all group/footer">
              <div className="w-10 h-10 min-w-[2.5rem] flex items-center justify-center rounded-xl bg-white/5 group-hover/footer:bg-blue-500/10 group-hover/footer:text-blue-400 transition-all">
                <HelpCircle size={20} />
              </div>
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                className="font-bold text-xs whitespace-nowrap overflow-hidden"
              >
                Support Center
              </motion.span>
           </button>
        </div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
