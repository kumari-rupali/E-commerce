import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare, ShieldCheck, Truck, RefreshCcw, HelpCircle, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function CustomerCare() {
  const faqs = [
    { q: "How do I track my order?", a: "You can track your order in the 'Orders' section of your profile or by using the tracking link sent to your email." },
    { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy for all unworn items in their original packaging." },
    { q: "How do I use my bonus points?", a: "Bonus points can be applied at checkout. 100 points equal ₹100 discount." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries. Shipping costs and delivery times vary by location." }
  ];

  const contactOptions = [
    { icon: <Mail size={20} />, title: 'Email Us', detail: 'support@sahrika.com', sub: 'Response within 24h' },
    { icon: <Phone size={20} />, title: 'Call Us', detail: '+91 800 123 4567', sub: 'Mon-Sat, 9AM-6PM' },
    { icon: <MessageSquare size={20} />, title: 'Live Chat', detail: 'Chat with an Expert', sub: 'Available 24/7' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h1 className="text-5xl font-serif italic mb-4">Customer Care</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-16">
            We are here to help you with anything you need.
          </p>

          {/* Quick Help Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {contactOptions.map((opt, i) => (
              <div key={i} className="p-8 bg-sahrika-gray rounded-[32px] hover:bg-black hover:text-white transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="text-black">{opt.icon}</span>
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-1 italic">{opt.title}</h3>
                <p className="text-sm font-black mb-1">{opt.detail}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{opt.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-serif italic mb-8 flex items-center">
                <HelpCircle className="mr-3 text-sahrika-red" size={24} />
                Common Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <h4 className="text-sm font-black mb-2 italic flex justify-between items-center cursor-pointer hover:text-sahrika-red">
                      {faq.q}
                      <ChevronRight size={14} />
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Categories */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif italic mb-8">Support Topics</h2>
              <div className="space-y-4">
                {[
                  { icon: <Truck size={18} />, label: 'Shipping & Delivery' },
                  { icon: <RefreshCcw size={18} />, label: 'Returns & Exchanges' },
                  { icon: <ShieldCheck size={18} />, label: 'Payment & Security' },
                  { icon: <HelpCircle size={18} />, label: 'Account Help' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 group-hover:text-black transition-colors">{item.icon}</span>
                      <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-200 group-hover:text-black transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 p-12 bg-sahrika-red text-white rounded-[40px] text-center">
            <h2 className="text-3xl font-serif italic mb-4">Still need help?</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-70 mb-10">Our concierge team is available round the clock.</p>
            <button className="px-10 py-5 bg-white text-sahrika-red rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              Start Live Chat
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
