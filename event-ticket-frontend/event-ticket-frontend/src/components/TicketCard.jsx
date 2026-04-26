import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const TicketCard = ({ ticket, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#1A1F2E] rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/3 aspect-video md:aspect-auto">
          <img 
            src={ticket.eventImageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop'} 
            className="w-full h-full object-cover"
            alt={ticket.eventName}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-1 block">Verified Access</span>
                <h3 className="text-xl font-bold text-white">{ticket.eventName}</h3>
              </div>
              <div className="bg-white p-2 rounded-xl">
                 <QRCodeSVG value={`ticket-${ticket.id}`} size={60} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-white/60">
                <Calendar size={14} />
                <span className="text-xs">{new Date(ticket.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={14} />
                <span className="text-xs truncate">{ticket.venue}</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            <Download size={16} />
            Download Ticket
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;
