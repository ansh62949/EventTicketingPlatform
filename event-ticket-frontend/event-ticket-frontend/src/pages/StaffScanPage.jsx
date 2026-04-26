import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ShieldCheck, ShieldAlert, Loader2, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const StaffScanPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [ticketId, setTicketId] = useState('');

  const handleScan = async (id = ticketId) => {
    setIsScanning(true);
    setScanResult(null);
    
    try {
      // Simulate scan delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, call the API
      // const response = await API.post('/ticket-validations', { ticketId: id });
      // setScanResult(response.data);
      
      // MOCK RESULT
      if (id.includes('valid')) {
        setScanResult({ valid: true, attendee: 'Ansh Pathak', ticketType: 'VIP' });
      } else {
        setScanResult({ valid: false, message: 'Invalid or Expired Ticket' });
      }
    } catch (error) {
      setScanResult({ valid: false, message: 'Network Error' });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-2xl mx-auto min-h-screen">
       <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-white/40 hover:text-white mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase tracking-widest text-xs">Back</span>
      </button>

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Gate <span className="text-accent-blue">Control</span></h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Staff Entry Management System</p>
      </header>

      <div className="space-y-8">
        {/* Scanner UI */}
        <div className="glass-card aspect-square relative overflow-hidden flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 group">
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10" />
          
          <div className="relative z-20 flex flex-col items-center">
            <div className={`p-8 rounded-full mb-6 transition-all duration-500 ${isScanning ? 'bg-accent-blue/20 scale-110' : 'bg-white/5'}`}>
              {isScanning ? (
                <Loader2 size={48} className="animate-spin text-accent-blue" />
              ) : (
                <Camera size={48} className="text-white/40 group-hover:text-white transition-colors" />
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">Position QR Code</h3>
            <p className="text-sm text-white/40 text-center max-w-[200px]">Align the attendee's ticket QR inside the camera frame</p>
          </div>

          {/* Decorative Corner Borders */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-accent-blue rounded-tl-xl" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-accent-blue rounded-tr-xl" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-accent-blue rounded-bl-xl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-accent-blue rounded-br-xl" />

          {/* Animated Scanning Line */}
          {isScanning && (
            <motion.div 
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute left-8 right-8 h-[2px] bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,1)] z-30"
            />
          )}
        </div>

        {/* Input Fallback */}
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Ticket ID manually..."
            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent-blue"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
          <button 
            onClick={() => handleScan()}
            className="btn-primary !px-8"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-8 rounded-3xl border-2 flex flex-col items-center text-center ${
                scanResult.valid 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-red-500/10 border-red-500/20'
              }`}
            >
              {scanResult.valid ? (
                <>
                  <ShieldCheck size={64} className="text-green-500 mb-6" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-green-500 mb-2">Access Granted</h2>
                  <p className="text-lg font-bold mb-1">{scanResult.attendee}</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest">{scanResult.ticketType} Holder</p>
                </>
              ) : (
                <>
                  <ShieldAlert size={64} className="text-red-500 mb-6" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-red-500 mb-2">Access Denied</h2>
                  <p className="text-lg font-bold text-white/60">{scanResult.message}</p>
                </>
              )}
              
              <button 
                onClick={() => setScanResult(null)}
                className="mt-8 text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
              >
                Clear Result
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StaffScanPage;
