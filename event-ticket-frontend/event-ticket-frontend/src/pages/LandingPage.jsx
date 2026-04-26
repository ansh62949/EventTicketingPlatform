import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden selection:bg-orange-500/30">
      
      {/* Visual Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="min-h-screen relative flex items-center justify-center py-20 px-6">
        
        {/* Background Immersive Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Concert Experience"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Hero Section */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                <Sparkles size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Cinematic Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.95] mb-10">
                Hey <br />
                Ready for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic">Tonight?</span>
              </h1>
              
              <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                Discover and secure access to the world's most exclusive live experiences. From underground raves to global summits, your next memory starts here.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Link to="/events" className="group bg-orange-500 text-black px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-4">
                  <span>{user ? 'Explore Events' : 'Start Discovery'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                {user?.role === 'ORGANIZER' ? (
                  <Link to="/dashboard" className="px-10 py-5 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                    Control Center
                  </Link>
                ) : (
                  <Link to={user ? "/events" : "/signup"} className="px-10 py-5 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                    {user ? 'My Tickets' : 'Initialize Account'}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Featured Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[450px]"
          >
            <div className="bg-[#1F1F1F] rounded-[3rem] p-4 shadow-2xl border border-white/5 group">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  alt="Trending Performance"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="px-4 py-1.5 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest text-black">Trending</div>
                      <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">Live</div>
                   </div>
                   <h3 className="text-3xl font-bold text-white leading-tight mb-4">Midnight City <br /> Soundcheck</h3>
                   <div className="flex items-center gap-6 text-white/60">
                      <div className="flex items-center gap-2">
                         <MapPin size={14} className="text-orange-500" />
                         <span className="text-xs font-bold">New York</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Calendar size={14} className="text-orange-500" />
                         <span className="text-xs font-bold">Oct 24</span>
                      </div>
                   </div>
                </div>
              </div>

              <Link to="/events" className="w-full py-6 bg-white/5 border border-white/10 rounded-[2rem] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-orange-500 hover:text-black hover:border-transparent transition-all flex items-center justify-center gap-4">
                <span>View Experiences</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* System Telemetry Row */}
        <div className="absolute bottom-12 left-0 right-0 px-12 hidden md:flex items-center justify-between opacity-20">
           <span className="text-[9px] font-black uppercase tracking-[0.5em]">System Nominal // 2026</span>
           <div className="flex gap-10">
              <span className="text-[9px] font-black uppercase tracking-[0.5em]">Privacy</span>
              <span className="text-[9px] font-black uppercase tracking-[0.5em]">Telemetry</span>
           </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
