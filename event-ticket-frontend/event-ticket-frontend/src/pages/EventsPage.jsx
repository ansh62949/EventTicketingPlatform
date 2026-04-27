import React, { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';
import EventCard from '../components/EventCard';
import { Search, SlidersHorizontal, MapPin, Sparkles, Loader2, Navigation, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userCity, setUserCity] = useState('Global');
  const [locating, setLocating] = useState(false);

  const categories = ['All', 'Music', 'Tech', 'Arts', 'Sports'];

  useEffect(() => {
    const initializeDiscovery = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventData = await eventService.getPublishedEvents();
        setEvents(eventData);
        detectLocation();
      } catch (err) {
        setError("Unable to retrieve discovery feed. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    initializeDiscovery();
  }, []);

  const detectLocation = async () => {
    if (!navigator.geolocation) return;
    
    setLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const locationData = await response.json();
        const city = locationData.address.city || locationData.address.town || locationData.address.state || 'India';
        setUserCity(city);
      } catch (err) {
        // Location detection failure is handled gracefully
      } finally {
        setLocating(false);
      }
    }, () => {
      setLocating(false);
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
        <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-[2rem] text-center max-w-md">
           <AlertCircle className="text-orange-500 mx-auto mb-4" size={48} />
           <p className="text-white font-bold mb-4">{error}</p>
           <button 
             onClick={() => window.location.reload()}
             className="text-orange-500 text-xs font-black uppercase tracking-widest hover:underline"
           >
             Refresh Discovery Feed
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pb-40">
      <header className="px-8 pt-12 mb-10">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 rounded-full"><Sparkles size={18} className="text-orange-500" /></div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Discovery Feed</p>
                 <button onClick={detectLocation} className="flex items-center gap-2 text-white group">
                    <span className="text-lg font-bold group-hover:text-orange-500 transition-colors">Experiences in {userCity}</span>
                    <Navigation size={14} className={`text-orange-500 ${locating ? 'animate-pulse' : ''}`} />
                 </button>
              </div>
           </div>
           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
              <SlidersHorizontal size={20} className="text-white/40" />
           </div>
        </div>

        <div className="relative group">
           <div className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
           <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] px-8 py-5 focus-within:border-orange-500/50 transition-all">
              <Search className="text-white/20 mr-4" size={20} />
              <input 
                type="text"
                placeholder="Search local experiences..."
                className="bg-transparent border-none text-white text-sm font-medium focus:outline-none w-full placeholder:text-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
      </header>

      <div className="px-8 mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
         {categories.map(cat => (
           <button
             key={cat}
             onClick={() => setSelectedCategory(cat)}
             className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-orange-500 text-black border-transparent' : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'}`}
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="px-8 space-y-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Modulating Experience Grid...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <MapPin size={48} className="text-white/5 mx-auto mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No experiences found in this sector</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
