import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Ticket as TicketIcon, 
  Layers,
  Bell,
  Zap,
  ArrowRight,
  Plus,
  Loader2,
  Calendar,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState([
    { title: 'Total Revenue', value: '$0.00', trend: '0%', icon: DollarSign },
    { title: 'Tickets Sold', value: '0', trend: '0%', icon: TicketIcon },
    { title: 'Interested', value: '0', trend: '0%', icon: Users },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await API.get('/events');
        const eventData = response.data.content || response.data;
        setEvents(eventData);

        const totalRevenue = eventData.reduce((acc, ev) => acc + (ev.ticketTypes?.[0]?.price || 0), 0);
        
        setStats([
          { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, trend: '+0%', icon: DollarSign },
          { title: 'Managed Events', value: eventData.length.toString(), trend: 'Active', icon: TicketIcon },
          { title: 'Network Pulse', value: '100%', trend: 'Stable', icon: Zap },
        ]);
      } catch (error) {
        // Silent fail for production-style telemetry
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] pb-40">
      <header className="px-8 pt-12 mb-10">
        <div className="flex items-center justify-between mb-10">
          <div className="p-3 bg-white/5 rounded-full"><Layers size={18} className="text-white" /></div>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white">Organizer Hub</span>
          </div>
          <button className="relative p-3 bg-white/5 rounded-full border border-white/5">
             <Bell size={18} className="text-white/60" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <h1 className="text-4xl font-bold text-white leading-tight">
                System <br /> Integrity <span className="text-white/40 italic font-black">Nominal</span>
              </h1>
           </div>
           <button 
             onClick={() => navigate('/create-event')}
             className="bg-orange-500 text-black px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
           >
              <Plus size={16} />
              <span>Initialize Experience</span>
           </button>
        </div>
      </header>

      <main className="px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {stats.map((stat, i) => (
             <div key={i} className="bg-[#1F1F1F] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-[4rem] -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-700" />
                <div className="flex justify-between items-start mb-8 relative z-10">
                   <div className="p-4 bg-white/5 rounded-2xl text-orange-500">
                      <stat.icon size={24} />
                   </div>
                   <span className="text-xs font-black text-emerald-500">{stat.trend}</span>
                </div>
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{stat.title}</p>
                   <p className="text-4xl font-black italic tracking-tighter text-white">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="space-y-8">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-4">
                 Your Managed Experiences <div className="h-[1px] w-20 bg-white/10" />
              </h2>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-10">
               <Loader2 className="animate-spin text-orange-500" size={32} />
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-6">
                {events.map((event) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1F1F1F] p-6 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between shadow-xl group hover:border-orange-500/20 transition-all"
                  >
                     <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                           <img 
                            src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop'} 
                            className="w-full h-full object-cover"
                            alt={event.name}
                           />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="text-white font-bold text-lg truncate">{event.name}</h3>
                           <div className="flex flex-wrap items-center gap-4 text-white/30 mt-1">
                              <div className="flex items-center gap-1">
                                 <Calendar size={12} className="text-orange-500" />
                                 <span className="text-[10px] font-bold uppercase">{new Date(event.start).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                 <MapPin size={12} className="text-orange-500" />
                                 <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{event.venue}</span>
                              </div>
                              <div className="px-3 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                                 <span className="text-[8px] font-black uppercase text-orange-500 tracking-widest">{event.status || 'Active'}</span>
                              </div>
                           </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end mr-8">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Sold</p>
                           <p className="text-xl font-black italic text-white">0 / 100</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/events/${event.id}`)}
                          className="p-4 bg-white/5 rounded-full text-white/20 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all"
                        >
                           <ArrowRight size={20} />
                        </button>
                     </div>
                  </motion.div>
                ))}

                {events.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No experiences initialized yet</p>
                    <button 
                      onClick={() => navigate('/create-event')}
                      className="mt-6 text-orange-500 text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                      Start Designing
                    </button>
                  </div>
                )}
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;