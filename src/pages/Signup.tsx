import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowLeft, Loader2, MapPin, Sparkles, Fingerprint } from 'lucide-react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { userSvc } from '../lib/db';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      const profileData = {
        uid: user.uid,
        email,
        displayName: name,
        role: 'customer' as const,
        phone,
        addresses: [city],
        bonusPoints: 500,
        is2FAEnabled: false
      };

      await userSvc.updateProfile(user.uid, profileData);
      
      toast.success("Welcome to the Collective.");
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || "Failed to create identity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-sahrika-red selection:text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Registration Portal */}
        <div className="flex flex-col justify-center p-8 md:p-24 relative bg-white order-2 lg:order-1">
          <Link to="/" className="absolute top-12 left-12 p-4 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="max-w-md w-full mx-auto">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sahrika-red mb-4 block italic">New Artisan Registry</span>
              <h2 className="text-5xl font-serif italic mb-6 tracking-tight">Begin your narrative.</h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed italic">Join a global community dedicated to slow fashion, heritage craftsmanship, and conscious identity.</p>
            </motion.header>

            <form onSubmit={handleSignup} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FULL NAME"
                    className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="MOBILE"
                    className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="DIGITAL MAIL ADDRESS"
                  className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="CITY, COUNTRY OF RESIDENCE"
                  className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="CREATE ACCESS KEYWORD"
                  className="w-full h-20 pl-16 pr-8 bg-gray-50 border-2 border-transparent focus:border-black rounded-[28px] text-[11px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="flex items-start space-x-4 px-2 mb-8">
                <div className="relative flex items-center pt-1">
                   <input type="checkbox" required className="peer w-6 h-6 border-2 border-gray-100 rounded-lg checked:bg-black transition-all appearance-none cursor-pointer" />
                   <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity left-1.5 text-white">
                      <Sparkles size={12} />
                   </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-relaxed italic">
                  I commit to the <Link to="/about" className="text-black underline underline-offset-4 decoration-sahrika-red">Collective Protocols</Link> and data privacy ethics.
                </p>
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
                     <span>Create Identity</span>
                     <Fingerprint size={16} className="ml-4 opacity-40" />
                   </>
                )}
              </motion.button>
            </form>

            <footer className="mt-16 text-center border-t border-gray-50 pt-10">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">
                 Already a member? <Link to="/login" className="text-black border-b-2 border-sahrika-red pb-1 ml-4 hover:opacity-50 transition-opacity">Initiate Session</Link>
               </p>
            </footer>
          </div>
        </div>

        {/* Cinematic Backdrop */}
        <div className="hidden lg:block relative group overflow-hidden order-1 lg:order-2">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" 
            alt="Craft" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-24 text-white">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-8xl font-serif italic mb-6 tracking-tighter"
            >
              CRAFTED SOUL.
            </motion.h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-6"
            >
              <span className="w-12 h-px bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 italic">
                A Unified Aesthetic Perspective
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
