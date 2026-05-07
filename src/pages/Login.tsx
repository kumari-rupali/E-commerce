import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Phone, ArrowLeft, Loader2, ShieldCheck, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

export default function Login() {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back to the Collective.");
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate access.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Identity verified via Google.");
      navigate('/profile');
    } catch (error: any) {
      toast.error("Google verify failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-sahrika-red selection:text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Cinematic Backdrop */}
        <div className="hidden lg:block relative group overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80" 
            alt="Fashion" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-24 text-white">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-8xl font-serif italic mb-6 tracking-tighter"
            >
              SAHRIKA
            </motion.h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-6"
            >
              <span className="w-12 h-px bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 italic">
                Archives of Identity
              </p>
            </motion.div>
          </div>
        </div>

        {/* Secure Access Portal */}
        <div className="flex flex-col justify-center p-8 md:p-24 relative bg-white">
          <Link to="/" className="absolute top-12 left-12 p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="max-w-md w-full mx-auto">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sahrika-red mb-4 block italic">Authentication</span>
              <h2 className="text-5xl font-serif italic mb-6 tracking-tight">Return to the Collective.</h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed italic">Access your curated archives, loyalty status and secure preferences.</p>
            </motion.header>

            {/* Credential Pivot */}
            <div className="flex bg-gray-50 p-1.5 rounded-[32px] mb-12 shadow-sm border border-gray-100">
              <button 
                onClick={() => setMethod('email')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[24px] transition-all ${method === 'email' ? 'bg-white shadow-lg text-black' : 'text-gray-300 hover:text-black'}`}
              >
                Digital Mail
              </button>
              <button 
                onClick={() => setMethod('phone')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[24px] transition-all ${method === 'phone' ? 'bg-white shadow-lg text-black' : 'text-gray-300 hover:text-black'}`}
              >
                Mobile Secure
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <AnimatePresence mode="wait">
                {method === 'email' ? (
                  <motion.div 
                    key="email"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="relative"
                  >
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER DIGITAL MAIL"
                      className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                    />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="relative"
                  >
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 000 000 0000"
                      className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PORTAL KEYWORD"
                  className="w-full h-20 pl-16 pr-16 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
                >
                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="w-6 h-6 border-2 border-gray-100 rounded-lg flex items-center justify-center transition-all group-hover:border-black">
                     <div className="w-3 h-3 bg-black rounded-sm opacity-0 scale-50 transition-all peer-checked:opacity-100 peer-checked:scale-100" />
                  </div>
                  <input type="checkbox" className="hidden peer" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Persistent Session</span>
                </label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-sahrika-red hover:opacity-50 transition-opacity italic">Reclaim Keyword</button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full h-20 bg-black text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-sahrika-red transition-all flex items-center justify-center shadow-2xl relative overflow-hidden"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                   <>
                     <span>Initiate Access</span>
                     <Fingerprint size={16} className="ml-4 opacity-40" />
                   </>
                )}
              </motion.button>
            </form>

            <div className="mt-16 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-300 mb-8 italic">External Vectors</p>
              <div className="grid grid-cols-2 gap-6">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="h-16 bg-gray-50 border-2 border-transparent hover:border-black/5 rounded-[24px] flex items-center justify-center space-x-4 transition-all shadow-sm"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" alt="Google" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Google Identity</span>
                </button>
                <button className="h-16 bg-gray-50 border-2 border-transparent hover:border-black/5 rounded-[24px] flex items-center justify-center space-x-4 transition-all shadow-sm">
                  <ShieldCheck size={20} className="text-gray-300" />
                  <span className="text-[10px] font-black uppercase tracking-widest">OneAuth Secure</span>
                </button>
              </div>
            </div>

            <footer className="mt-16 text-center border-t border-gray-50 pt-10">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">
                 New to the Archive? <Link to="/signup" className="text-black border-b-2 border-sahrika-red pb-1 ml-4 hover:opacity-50 transition-opacity">Submit Credentials</Link>
               </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
