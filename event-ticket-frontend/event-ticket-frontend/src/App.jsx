import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion } from 'framer-motion';

// Modules
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import MyTicketsPage from './pages/MyTicketsPage';
import CheckoutPage from './pages/CheckoutPage';
import CreateEventPage from './pages/CreateEventPage';
import StaffScanPage from './pages/StaffScanPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FloatingNav from './components/layout/FloatingNav';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A]">
      <div className="w-12 h-12 border-4 border-white/5 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(pathname);
  const showFloatingNav = !isAuthPage;
  
  return (
    <div className={`min-h-screen ${pathname === '/' ? 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0B2447]' : 'bg-[#121212]'} text-white selection:bg-blue-500/30 relative overflow-hidden`}>
      {/* Landing Visual Decor */}
      {pathname === '/' && (
        <>
          <div className="glow-blue top-[-10%] left-[-10%] w-[40%] h-[40%] opacity-50" />
          <div className="absolute blur-3xl bg-indigo-500/20 rounded-full bottom-[-10%] right-[-10%] w-[40%] h-[40%] opacity-50" />
        </>
      )}
      
      {showFloatingNav && <FloatingNav />}
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
            <Route path="/events/:id" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/my-tickets" element={
              <ProtectedRoute>
                <MyTicketsPage />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute role="ORGANIZER">
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/create-event" element={
              <ProtectedRoute role="ORGANIZER">
                <CreateEventPage />
              </ProtectedRoute>
            } />

            <Route path="/staff/scan" element={
              <ProtectedRoute role="STAFF">
                <StaffScanPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;