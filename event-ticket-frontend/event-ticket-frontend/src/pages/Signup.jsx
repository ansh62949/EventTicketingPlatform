import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';
import GradientButton from '../components/shared/GradientButton';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl -z-10" />
        
        <GlassCard className="p-10 !rounded-[3rem] text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter italic">Join Us</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Create Your Account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-white/40 ml-2 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="JOHN DOE"
                className="glass-input w-full py-3"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-white/40 ml-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="NAME@EXAMPLE.COM"
                className="glass-input w-full py-3"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-bold text-white/40 ml-2 uppercase tracking-widest">Security Code</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="glass-input w-full py-3"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mt-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'USER'})}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${formData.role === 'USER' ? 'bg-purple-600 text-white' : 'text-white/40'}`}
              >
                USER
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'ORGANIZER'})}
                className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${formData.role === 'ORGANIZER' ? 'bg-purple-600 text-white' : 'text-white/40'}`}
              >
                ORGANIZER
              </button>
            </div>

            <GradientButton type="submit" className="w-full mt-4 !py-3 !text-sm">
              Initialize Account
            </GradientButton>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/40 text-xs">
              Already have an account? <Link to="/login" className="text-purple-400 font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
