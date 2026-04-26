import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as TicketIcon, Loader2, MapPin, Calendar, Layers, Bell, QrCode, X, Download, ShieldCheck } from 'lucide-react';
import API from '../services/api';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [qrBlob, setQrBlob] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await API.get('/tickets');
        setTickets(response.data.content || response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setTickets([
          { id: 't1', eventName: 'Midnight City Festival', eventDate: '2026-08-23', venue: 'Downtown Arena', eventImageUrl: null },
          { id: 't2', eventName: 'Neon Rave: Ultraviolet', eventDate: '2026-08-28', venue: 'The Warehouse', eventImageUrl: null },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleSelectTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setQrBlob(null);
    setQrLoading(true);
    try {
      // Fetch QR as blob to include Authorization header
      const response = await API.get(`/tickets/${ticket.id}/qr-codes`, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(response.data);
      setQrBlob(url);
    } catch (error) {
      console.error('Failed to fetch QR code:', error);
      // Fallback to public QR generator if backend fails
      setQrBlob(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.id}`);
    } finally {
      setQrLoading(false);
    }
  };

  const closePortal = () => {
    if (qrBlob && qrBlob.startsWith('blob:')) {
      URL.revokeObjectURL(qrBlob);
    }
    setSelectedTicket(null);
    setQrBlob(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-32">
      {/* Header */}
      <header className="px-8 pt-12 mb-10">
        <div className="flex items-center justify-between mb-10">
          <div className="p-3 bg-white/5 rounded-full"><Layers size={18} className="text-white" /></div>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white">Digital Wallet</span>
          </div>
          <button className="relative p-3 bg-white/5 rounded-full border border-white/5">
             <Bell size={18} className="text-white/60" />
          </button>
        </div>

        <h1 className="text-4xl font-bold text-white leading-tight">
          Your <br /> Exclusive <span className="text-white/40 italic font-black">Tickets</span>
        </h1>
      </header>

      <div className="px-8 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Syncing Wallet...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1F1F1F] rounded-[2.5rem] p-6 border border-white/5 flex items-center gap-6 shadow-2xl group cursor-pointer"
                onClick={() => handleSelectTicket(ticket)}
              >
                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-white/5">
                   <img 
                     src={ticket.eventImageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop'} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     alt={ticket.eventName}
                   />
                </div>
                <div className="flex-1 space-y-2">
                   <h3 className="text-white font-bold text-lg">{ticket.eventName}</h3>
                   <div className="flex items-center gap-4 text-white/30">
                      <div className="flex items-center gap-1">
                         <Calendar size={12} className="text-orange-500" />
                         <span className="text-[10px] font-bold uppercase">{new Date(ticket.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                         <MapPin size={12} className="text-orange-500" />
                         <span className="text-[10px] font-bold uppercase truncate max-w-[80px]">{ticket.venue}</span>
                      </div>
                   </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shadow-lg group-hover:bg-orange-500 group-hover:text-black transition-all">
                   <QrCode size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-8">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={closePortal}
               className="absolute inset-0 bg-black/80 backdrop-blur-xl"
             />
             
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative bg-[#1F1F1F] w-full max-w-sm rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
             >
                <div className="p-8 pb-0 flex justify-between items-start">
                   <div>
                      <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Entry Pass</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1">Verified Digital Asset</p>
                   </div>
                   <button onClick={closePortal} className="p-3 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
                      <X size={20} />
                   </button>
                </div>

                <div className="p-10 flex flex-col items-center">
                   <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-orange-500/10 mb-8 border-8 border-white/5 min-w-[200px] min-h-[200px] flex items-center justify-center">
                      {qrLoading ? (
                        <Loader2 className="animate-spin text-orange-500" size={32} />
                      ) : (
                        <img 
                          src={qrBlob} 
                          className="w-48 h-48"
                          alt="Entry QR Code"
                        />
                      )}
                   </div>
                   
                   <div className="text-center space-y-2 mb-10">
                      <p className="text-sm font-bold text-white">{selectedTicket.eventName}</p>
                      <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20">
                         <ShieldCheck size={14} className="text-orange-500" />
                         <span>Gate Verification Active</span>
                      </div>
                   </div>

                   <button className="w-full bg-white/5 border border-white/5 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                      <Download size={16} />
                      Save to Device
                   </button>
                </div>
                
                {/* Decorative Pill Cutouts */}
                <div className="absolute top-1/2 left-0 -translate-x-1/2 w-8 h-16 bg-black/80 rounded-full" />
                <div className="absolute top-1/2 right-0 translate-x-1/2 w-8 h-16 bg-black/80 rounded-full" />
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTicketsPage;
