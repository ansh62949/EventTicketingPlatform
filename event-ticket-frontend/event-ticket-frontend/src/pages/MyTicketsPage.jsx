import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';
import { 
  Ticket as TicketIcon, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Download, 
  X, 
  Sparkles,
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const ticketData = await ticketService.getMyTickets();
        setTickets(ticketData);
      } catch (err) {
        setError("Unable to retrieve your digital vault. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserTickets();
  }, []);

  const handleOpenTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setQrLoading(true);
    try {
      const url = await ticketService.getQRCode(ticket.id);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Failed to fetch QR verification:", err);
    } finally {
      setQrLoading(false);
    }
  };

  const handleCloseTicket = () => {
    if (qrCodeUrl) {
      URL.revokeObjectURL(qrCodeUrl);
      setQrCodeUrl(null);
    }
    setSelectedTicket(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-8">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] text-center max-w-md">
           <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
           <p className="text-white font-bold mb-4">{error}</p>
           <button onClick={() => window.location.reload()} className="text-red-500 text-xs font-black uppercase tracking-widest hover:underline">
             Retry Synchronization
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
              <div className="p-3 bg-white/5 rounded-full">
                <Sparkles size={18} className="text-orange-500" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Digital Vault</p>
                 <h1 className="text-2xl font-bold text-white">Your Managed Assets</h1>
              </div>
           </div>
           <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">{tickets.length} Verified</span>
           </div>
        </div>
      </header>

      <main className="px-8 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Synchronizing Vault...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {tickets.map((ticket, index) => (
              <motion.div 
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOpenTicket(ticket)}
                className="bg-[#1F1F1F] rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-pointer hover:border-orange-500/30 transition-all shadow-xl"
              >
                <div className="flex flex-col md:flex-row">
                   <div className="w-full md:w-32 h-32 md:h-auto bg-white/5 overflow-hidden flex-shrink-0">
                      <img 
                        src={ticket.event?.imageUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={ticket.event?.name}
                      />
                   </div>
                   <div className="p-6 flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white/40 border border-white/10">Verified Asset</span>
                         <span className="px-3 py-1 bg-emerald-500/10 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                            <ShieldCheck size={10} /> Active
                         </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{ticket.event?.name}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-white/40">
                         <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-orange-500" />
                            <span className="text-xs font-bold uppercase">{new Date(ticket.event?.start).toLocaleDateString()}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-orange-500" />
                            <span className="text-xs font-bold uppercase truncate max-w-[150px]">{ticket.event?.venue}</span>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5">
                      <div className="p-4 bg-white/5 rounded-full text-white/20 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all">
                         <ChevronRight size={24} />
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}

            {!loading && tickets.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                <TicketIcon size={48} className="text-white/5 mx-auto mb-6" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">No verified assets found</p>
                <button 
                  onClick={() => window.location.href = '/events'}
                  className="mt-6 text-orange-500 text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Acquire Experiences
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedTicket && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseTicket} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#1A1A1A] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="relative h-48 bg-white/5">
                 <img 
                    src={selectedTicket.event?.imageUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'} 
                    className="w-full h-full object-cover"
                    alt={selectedTicket.event?.name}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                 <button 
                    onClick={handleCloseTicket}
                    className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white/60 hover:text-white transition-all"
                 >
                    <X size={20} />
                 </button>
              </div>
              
              <div className="px-8 pb-10 text-center">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest text-black mb-6 -mt-6 relative z-10">
                    <ShieldCheck size={14} /> Gate Entry Node
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">{selectedTicket.event?.name}</h2>
                 <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">{selectedTicket.event?.venue}</p>
                 
                 <div className="relative aspect-square w-full bg-white rounded-[2rem] p-8 mb-8 flex items-center justify-center overflow-hidden">
                    {qrLoading ? (
                      <Loader2 className="animate-spin text-[#1A1A1A]" size={40} />
                    ) : qrCodeUrl ? (
                      <img src={qrCodeUrl} className="w-full h-full object-contain" alt="Entry QR" />
                    ) : (
                      <div className="text-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-center">
                         Verification <br /> Unavailable
                      </div>
                    )}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] rounded-full shadow-inner" />
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] rounded-full shadow-inner" />
                 </div>
                 
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">System Integrity Verified</p>
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                       <Download size={16} /> Save to offline vault
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTicketsPage;
