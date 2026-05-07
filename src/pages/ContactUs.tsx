import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import BackButton from '../components/BackButton';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg-neutral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <BackButton />
        
        <header className="mt-12 mb-16 md:mb-24 max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 block"
          >
            Support Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold text-text-main dark:text-white tracking-tighter leading-tight mb-8"
          >
            We're here <br className="hidden md:block" /> for you.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed"
          >
            Whether it's a sizing query, a partnership proposal, or just feedback on your experience, our team is ready to assist you.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { icon: <Mail />, title: "Email Us", detail: "support@store.com", sub: "Response time: 2-4 hours" },
              { icon: <Phone />, title: "Call Center", detail: "+1 (800) 123-4567", sub: "Mon-Fri, 9am - 6pm EST" },
              { icon: <Globe />, title: "Headquarters", detail: "123 Commerce Way", sub: "New York, NY 10001" },
              { icon: <Clock />, title: "Business Hours", detail: "24/7 Monitoring", sub: "Critical support available" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 bg-white dark:bg-white/5 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-xl hover:scale-[1.02] transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.title}</h3>
                <p className="text-lg md:text-xl font-extrabold text-text-main dark:text-white mb-2 leading-tight">{item.detail}</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-white/5 p-8 md:p-16 rounded-[48px] md:rounded-[64px] border border-gray-200 dark:border-white/10 shadow-2xl shadow-primary/5"
                >
                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Your Full Name</label>
                       <input
                         required
                         type="text"
                         className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 md:p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all dark:text-white"
                         placeholder="John Doe"
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                       <input
                         required
                         type="email"
                         className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 md:p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all dark:text-white"
                         placeholder="john@example.com"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">How can we help?</label>
                       <textarea
                         required
                         rows={4}
                         className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl p-4 md:p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all dark:text-white resize-none"
                         placeholder="Tell us more about your inquiry..."
                       />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                    >
                      <Send size={16} />
                      <span>Send Message</span>
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary text-white p-16 md:p-24 rounded-[48px] md:rounded-[64px] text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full translate-y-1/2 scale-150" />
                  <div className="relative z-10">
                     <div className="w-24 h-24 bg-white text-primary rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl">
                        <CheckCircle size={48} />
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Message Sent!</h2>
                     <p className="text-white/80 text-sm md:text-base font-medium max-w-xs mx-auto mb-12">
                        Your inquiry has been received. Our support team will get back to you within 24 hours.
                     </p>
                     <button
                       onClick={() => setSubmitted(false)}
                       className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                     >
                       Send Another Message
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
