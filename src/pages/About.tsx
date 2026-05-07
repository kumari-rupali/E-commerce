import React from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Eye, Sparkles } from 'lucide-react';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-bg-neutral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <BackButton />
        
        {/* Header Section */}
        <section className="mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-text-main dark:text-white tracking-tighter leading-tight mb-8">
              Redefining <br /> Modern Living.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              We started with a simple idea: that high-quality, beautifully designed products should be accessible to everyone who values craftsmanship and trust.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
               <div className="px-6 py-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                  <p className="text-2xl font-black text-primary">50k+</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Happy Customers</p>
               </div>
               <div className="px-6 py-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                  <p className="text-2xl font-black text-primary">150+</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Countries Served</p>
               </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl relative group"
          >
             <img 
               src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80" 
               alt="Craftsmanship" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <p className="text-white font-bold text-lg">Our Workshop, 2024</p>
             </div>
          </motion.div>
        </section>

        {/* Philosophy Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Target />, title: "Precision", desc: "Every detail is engineered with intention, ensuring products that stand the test of time and trend." },
            { icon: <Heart />, title: "Customer-First", desc: "Your trust is our greatest asset. We build every feature and service around your complete satisfaction." },
            { icon: <Sparkles />, title: "Innovation", desc: "Merging timeless design principles with modern technology to create products that feel like the future." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white dark:bg-white/5 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Narrative Section */}
        <section className="bg-primary rounded-[60px] p-10 md:p-20 text-white relative overflow-hidden mb-24">
           <div className="absolute top-0 right-0 p-24 opacity-10 blur-xl">
              <Eye size={400} strokeWidth={0.5} />
           </div>
           <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">We're on a mission to build a better shopping experience.</h2>
              <div className="space-y-6 text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                <p>We started in a small workshop, driven by a simple observation: modern e-commerce often lacks the personal touch and trust that once defined the best retail experiences.</p>
                <p>Today, we're bringing that back. Through rigorous selection, transparent logistics, and a fanatical focus on customer care, we're building the future of shopping together.</p>
              </div>
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="mt-12 bg-white text-primary px-12 py-5 font-bold rounded-2xl shadow-2xl"
                >
                  Start Shopping
                </motion.button>
              </Link>
           </div>
        </section>

        {/* Manifesto */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-24 border-y border-gray-200 dark:border-white/10"
        >
           <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8">The Manifesto</h4>
           <div className="text-3xl md:text-6xl font-extrabold text-text-main dark:text-white tracking-tighter leading-tight max-w-4xl mx-auto">
             "Trust is the currency of the future, and we're investing in yours."
           </div>
        </motion.div>
      </div>
    </div>
  );
}
