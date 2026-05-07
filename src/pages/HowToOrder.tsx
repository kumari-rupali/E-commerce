import React from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, CreditCard, Box } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function HowToOrder() {
  const steps = [
    { 
      icon: <Search size={24} />, 
      title: 'Find Your Items', 
      desc: 'Browse our collections or use the search bar to find exactly what you are looking for.' 
    },
    { 
      icon: <ShoppingBag size={24} />, 
      title: 'Add to Bag', 
      desc: 'Select your size and color preference, then add the item to your shopping bag.' 
    },
    { 
      icon: <CreditCard size={24} />, 
      title: 'Secure Checkout', 
      desc: 'Review your items and proceed to payment. We accept all major credit cards and UPI.' 
    },
    { 
      icon: <Box size={24} />, 
      title: 'Wait for Delivery', 
      desc: 'You will receive a confirmation email with a tracking ID once your order is shipped.' 
    },
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
          <h1 className="text-5xl font-serif italic mb-8">How To Order</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-16">
            Ordering from SAHRIKA is simple and secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-sahrika-gray p-10 rounded-[40px] border border-transparent hover:border-black transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold italic font-serif mb-4 flex items-center">
                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full mr-3 not-italic">0{idx + 1}</span>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-gray-100 pt-20">
            <h2 className="text-2xl font-serif italic mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2 italic">Do I need an account to order?</h4>
                <p className="text-sm text-gray-400 font-medium">No, you can check out as a guest. However, creating an account allows you to track orders and save addresses.</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2 italic">Can I cancel my order?</h4>
                <p className="text-sm text-gray-400 font-medium">Orders can be cancelled within 2 hours of placement. Please contact our support team immediately.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
