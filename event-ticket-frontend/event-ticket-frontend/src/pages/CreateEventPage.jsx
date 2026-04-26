import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Type, 
  DollarSign,
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    venue: '',
    start: '',
    end: '',
    imageUrl: '',
    price: ''
  });

  const presets = [
    { name: 'Concert', url: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1200' },
    { name: 'Conference', url: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?q=80&w=1200' },
    { name: 'Festival', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200' },
    { name: 'Nightlife', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=1200' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const formatDateTime = (dt) => {
        if (!dt) return null;
        const d = new Date(dt);
        return d.toISOString().slice(0, 19);
      };

      const eventStart = formatDateTime(formData.start);
      const eventEnd = formatDateTime(formData.end);
      const salesStart = new Date().toISOString().slice(0, 19);

      const payload = {
        name: formData.name,
        description: formData.description || "No description provided.",
        venue: formData.venue,
        start: eventStart,
        end: eventEnd,
        salesStart: salesStart,
        salesEnd: eventStart,
        status: "PUBLISHED",
        imageUrl: formData.imageUrl || presets[0].url,
        ticketTypes: [
          {
            name: "General Admission",
            price: parseFloat(formData.price) || 0,
            totalAvailable: 100,
            description: "Standard entry pass"
          }
        ]
      };

      await API.post('/events', payload);
      navigate('/dashboard');
    } catch (error) {
      const serverMsg = error.response?.data?.message || error.response?.data?.error || "Unknown error";
      alert(`Initialization Failed: ${serverMsg}. Please ensure all dates are valid.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-32">
      <header className="px-8 pt-12 mb-12">
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => navigate(-1)} className="p-3 bg-white/5 rounded-full"><ArrowLeft size={18} className="text-white" /></button>
          <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white">Event Architect</span>
          </div>
          <div className="p-3 bg-white/5 rounded-full"><Sparkles size={18} className="text-orange-500" /></div>
        </div>

        <h1 className="text-4xl font-bold text-white leading-tight">
          Initialize <br /> New <span className="text-white/40 italic font-black">Experience</span>
        </h1>
      </header>

      <main className="px-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-12">
           <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Visual Atmosphere</label>
              <div className="relative aspect-[21/9] w-full bg-[#1F1F1F] rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center group overflow-hidden">
                <img 
                  src={formData.imageUrl || presets[0].url} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
                  alt="Preview" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                   {presets.map(preset => (
                     <button
                       key={preset.name}
                       type="button"
                       onClick={() => setFormData({...formData, imageUrl: preset.url})}
                       className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${formData.imageUrl === preset.url ? 'bg-orange-500 text-black' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'}`}
                     >
                       {preset.name}
                     </button>
                   ))}
                </div>
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Experience Name</label>
                 <div className="relative">
                    <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
                    <input 
                      type="text" 
                      required
                      placeholder="E.G. MIDNIGHT RAVE"
                      className="w-full bg-[#1F1F1F] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Starting Price ($)</label>
                 <div className="relative">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
                    <input 
                      type="number" 
                      required
                      step="0.01"
                      placeholder="45.00"
                      className="w-full bg-[#1F1F1F] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Location / Venue</label>
              <div className="relative">
                 <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
                 <input 
                   type="text" 
                   required
                   placeholder="CENTRAL PARK, NEW YORK"
                   className="w-full bg-[#1F1F1F] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all"
                   value={formData.venue}
                   onChange={(e) => setFormData({...formData, venue: e.target.value})}
                 />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Commencement</label>
                 <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
                    <input 
                      type="datetime-local" 
                      required
                      className="w-full bg-[#1F1F1F] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all [color-scheme:dark]"
                      value={formData.start}
                      onChange={(e) => setFormData({...formData, start: e.target.value})}
                    />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Conclusion</label>
                 <div className="relative">
                    <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
                    <input 
                      type="datetime-local" 
                      required
                      className="w-full bg-[#1F1F1F] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-orange-500/50 transition-all [color-scheme:dark]"
                      value={formData.end}
                      onChange={(e) => setFormData({...formData, end: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Experience Brief</label>
              <textarea 
                required
                rows="4"
                placeholder="DESCRIBE THE UNIQUE ATMOSPHERE..."
                className="w-full bg-[#1F1F1F] border border-white/5 rounded-[2rem] p-8 text-xs font-medium leading-relaxed text-white focus:outline-none focus:border-orange-500/50 transition-all"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
           </div>

           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-orange-500 text-black py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-4"
           >
             {loading ? <Loader2 className="animate-spin" size={20} /> : (
               <>
                 <Plus size={20} />
                 <span>Deploy Experience</span>
               </>
             )}
           </button>
        </form>
      </main>
    </div>
  );
};

export default CreateEventPage;
