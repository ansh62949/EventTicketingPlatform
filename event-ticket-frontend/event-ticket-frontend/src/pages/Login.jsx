import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import GlassCard from '../components/shared/GlassCard';
import GradientButton from '../components/shared/GradientButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
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
        
        <GlassCard className="p-12 !rounded-[4rem] text-center aspect-square flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter italic">Login</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Identify Yourself</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-white/60 ml-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="glass-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-white/60 ml-2 uppercase tracking-widest">Security Code</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="glass-input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <GradientButton type="submit" className="w-full mt-4">
              Access Vault
            </GradientButton>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <p className="text-white/40 text-xs">
              Don't have an account? <Link to="/signup" className="text-purple-400 font-bold hover:underline">Register now</Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;