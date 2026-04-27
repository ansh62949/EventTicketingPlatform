import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, ArrowLeft, Loader2, Heart, Share2, Users, ShieldCheck } from 'lucide-react';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        // Explicitly check if ID is valid
        if (!id) throw new Error("No event ID provided");
        
        const response = await API.get(`/api/v1/published-events/${id}`);
        const eventData = response.data;
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
        // Fallback for demo purposes if backend fails
        setEvent({
          id,
          name: 'Midnight City Festival 2026',
          description: 'Join us for a night of incredible music, visual arts, and community. Featuring top artists from around the globe, this is an experience you won\'t want to miss.',
          start: '2026-08-23T20:30:00',
          venue: 'Downtown Arena, Los Angeles',
          imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
          price: 45.00
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handlePurchase = () => {
    // Navigate to checkout with the event ID and first ticket type ID if available
    const ticketType = event?.ticketTypes?.[0];
    navigate('/checkout', { 
      state: { 
        eventId: id, 
        eventName: event?.name, 
        price: ticketType?.price || event?.price || 45,
        ticketTypeId: ticketType?.id
      } 
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <Loader2 className="animate-spin text-orange-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212] pb-40">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img 
          src={event.imageUrl && event.imageUrl.startsWith('http') ? event.imageUrl : 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'} 
          className="w-full h-full object-cover"
          alt={event.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
        
        {/* Top Controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between z-20">
           <button onClick={() => navigate('/events')} className="p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white hover:bg-black/60 transition-all">
              <ArrowLeft size={24} />
           </button>
           <div className="flex gap-4">
              <button className="p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white hover:text-orange-500 transition-all">
                 <Heart size={24} />
              </button>
              <button className="p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white hover:text-orange-500 transition-all">
                 <Share2 size={24} />
              </button>
           </div>
        </div>

        {/* Hero Info */}
        <div className="absolute bottom-12 left-8 right-8 z-20">
           <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="px-4 py-1.5 bg-orange-500 rounded-full text-[10px] font-black uppercase tracking-widest text-black">Featured Experience</div>
                 <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                    <ShieldCheck size={12} className="text-orange-500" /> Verified
                 </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic mb-6">
                {event.name}
              </h1>
           </div>
        </div>
      </div>

      {/* Main Info Section */}
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-16 -mt-8 relative z-30">
         
         {/* Details Col */}
         <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Date</p>
                  <div className="flex items-center gap-3 text-white">
                     <Calendar size={18} className="text-orange-500" />
                     <span className="text-sm font-bold">{new Date(event.start).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Time</p>
                  <div className="flex items-center gap-3 text-white">
                     <Clock size={18} className="text-orange-500" />
                     <span className="text-sm font-bold">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
               </div>
               <div className="space-y-2 col-span-2 md:col-span-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Location</p>
                  <div className="flex items-start gap-3 text-white">
                     <MapPin size={18} className="text-orange-500 min-w-[18px] mt-0.5" />
                     <span className="text-sm font-bold leading-relaxed">{event.venue}</span>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-xl font-black uppercase italic tracking-widest text-white flex items-center gap-4">
                  About Event <div className="h-[1px] flex-1 bg-white/10" />
               </h3>
               <p className="text-base leading-relaxed text-white/40 font-medium max-w-3xl">
                 {event.description}
               </p>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/5">
               <div className="flex -space-x-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#121212] overflow-hidden bg-white/5">
                       <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" />
                    </div>
                  ))}
               </div>
               <div>
                  <p className="text-sm font-bold text-white">500+ Attendees</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Joining this experience</p>
               </div>
            </div>
         </div>

         {/* Pricing/Booking Sidebar (Desktop) */}
         <div className="hidden lg:block">
            <div className="bg-[#1F1F1F] p-8 rounded-[3rem] border border-white/5 sticky top-8 shadow-2xl">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Pricing starts from</p>
               <h2 className="text-5xl font-black text-white mb-8 italic tracking-tighter">${event.price?.toFixed(2) || '45.00'}</h2>
               
               <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between text-xs font-bold">
                     <span className="text-white/40">Base Entry</span>
                     <span className="text-white">${event.price?.toFixed(2) || '45.00'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                     <span className="text-white/40">Processing Fee</span>
                     <span className="text-white">$2.50</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-sm font-black uppercase">
                     <span className="text-white">Total</span>
                     <span className="text-orange-500">${((event.price || 45) + 2.5).toFixed(2)}</span>
                  </div>
               </div>

               <button 
                onClick={handlePurchase}
                className="w-full bg-orange-500 text-black py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
               >
                  Buy Ticket
               </button>
            </div>
         </div>
      </div>

      {/* Mobile Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#121212]/90 backdrop-blur-3xl border-t border-white/5 px-8 py-8 flex items-center justify-between z-50 lg:hidden">
         <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Starting From</span>
            <span className="text-2xl font-bold text-white">${event.price?.toFixed(2) || '45.00'}</span>
         </div>
         <button 
          onClick={handlePurchase}
          className="bg-orange-500 text-black px-12 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
         >
            Buy Ticket
         </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
