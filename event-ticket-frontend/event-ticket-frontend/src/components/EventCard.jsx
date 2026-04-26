import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/events/${event.id}`}>
        <div className="bg-[#1F1F1F] rounded-[2.5rem] overflow-hidden p-3 shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/5">
          {/* Image Container - Stadium Shape */}
          <div className="relative h-48 rounded-[2rem] overflow-hidden mb-4">
            <img 
              src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'} 
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Date Badge */}
            <div className="absolute bottom-4 left-4 bg-orange-500 rounded-2xl p-2 px-3 text-center min-w-[50px] shadow-lg">
              <span className="block text-[10px] font-bold uppercase leading-none text-black/60">
                {event.start ? new Date(event.start).toLocaleDateString(undefined, { day: '2-digit' }) : '23'}
              </span>
              <span className="block text-[8px] font-black uppercase text-white leading-none mt-1">
                {event.start ? new Date(event.start).toLocaleDateString(undefined, { month: 'short' }) : 'AUG'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="px-3 pb-3 space-y-2">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{event.name}</h3>
            <div className="flex items-center gap-4 text-white/40">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {event.start ? new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:30 PM'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
