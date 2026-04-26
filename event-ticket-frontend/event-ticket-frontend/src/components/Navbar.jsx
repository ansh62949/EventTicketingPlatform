import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Calendar, 
  Ticket, 
  LayoutDashboard, 
  User, 
  LogOut,
  Sparkles,
  Settings,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  const globalItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Calendar, path: '/events', label: 'Events' },
    { icon: Ticket, path: '/my-tickets', label: 'My Tickets' },
    { icon: LayoutDashboard, path: '/dashboard', label: 'Dashboard', restricted: 'ORGANIZER' },
  ];

  const filteredItems = globalItems.filter(item => 
    !item.restricted || (user && user.role === item.restricted)
  );

  return (
    <>
      {/* Premium Glow behind Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 w-[120px] h-[400px] bg-blue-500/20 blur-[80px] z-40 hidden lg:block rounded-full pointer-events-none" />

      <nav className="fixed lg:left-6 lg:top-1/2 lg:-translate-y-1/2 bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 z-50 transition-all duration-500">
        <div className="flex lg:flex-col items-center gap-5 px-3 py-6 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group/nav">
          
          {/* Neon Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

          {/* Logo / Spark */}
          <div className="mb-6 hidden lg:block">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer"
            >
               <Sparkles size={20} className="text-white" />
            </motion.div>
          </div>

          <div className="flex lg:flex-col gap-4">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && isDashboard);
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-110' 
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-active-shine"
                        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
                      />
                    )}
                    <item.icon size={22} className="relative z-10" />
                  </motion.div>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)] hidden lg:block"
                    />
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none hidden lg:block whitespace-nowrap shadow-2xl">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="lg:mt-8 pt-8 border-t border-white/10 flex lg:flex-col items-center gap-4">
            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  onClick={logout}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all"
                >
                  <LogOut size={22} />
                </motion.button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px] hidden lg:block">
                   <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-[10px] font-bold">
                     {user.name?.[0]}
                   </div>
                </div>
              </>
            ) : (
              <Link to="/login">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                >
                  <User size={22} />
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;