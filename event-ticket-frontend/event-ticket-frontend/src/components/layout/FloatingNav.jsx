import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Music, LayoutDashboard, Ticket as TicketIcon, Home, User, LogOut, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Music, path: '/events', label: 'Events' },
    { icon: TicketIcon, path: '/my-tickets', label: 'Tickets' },
  ];

  if (user?.role === 'ORGANIZER') {
    navItems.push({ icon: LayoutDashboard, path: '/dashboard', label: 'Dashboard' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs md:max-w-md px-6">
      <AnimatePresence>
        {showUserMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-24 left-6 right-6 bg-[#1F1F1F] border border-white/5 rounded-[2rem] p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-black font-black text-lg">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.name || 'Authorized User'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 truncate">{user?.role || 'Voter'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-red-500/10 rounded-xl transition-all group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-red-400">Terminate Session</span>
              <LogOut size={16} className="text-white/20 group-hover:text-red-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#1F1F1F]/90 backdrop-blur-2xl rounded-full px-8 py-4 flex items-center justify-between border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`transition-all duration-300 ${isActive ? 'text-orange-500 scale-110' : 'text-white/30 hover:text-white'}`}
            >
              <item.icon size={22} />
            </Link>
          );
        })}
        
        <button 
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`transition-all duration-300 relative ${showUserMenu ? 'text-orange-500' : 'text-white/30 hover:text-white'}`}
        >
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <span className="text-[8px] font-black">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          {showUserMenu && <motion.div layoutId="user-active" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />}
        </button>
      </div>
    </div>
  );
};

export default FloatingNav;
