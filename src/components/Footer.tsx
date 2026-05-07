import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Facebook, Youtube, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-white/10 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* SAHRIKA Column */}
          <div className="space-y-8">
            <Link to="/" className="text-3xl font-black tracking-tighter text-primary inline-block">
              SAHRIKA
            </Link>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">About Sahrika</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">We Respect Your Privacy</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Fees & Payments</Link></li>
              <li><Link to="/returns" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Returns & Refunds Policy</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Promotions Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-primary dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Your Data</Link></li>
            </ul>
          </div>

          {/* HELP Column */}
          <div>
            <h3 className="text-black dark:text-white text-xs font-black uppercase mb-8 tracking-widest italic">Help</h3>
            <ul className="space-y-4">
              <li><Link to="/orders" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Track Your Order</Link></li>
              <li><Link to="/customer-care" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Frequently Asked Questions</Link></li>
              <li><Link to="/returns" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Returns</Link></li>
              <li><Link to="/returns" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Cancellations</Link></li>
              <li><Link to="/shipping" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Payments</Link></li>
              <li><Link to="/customer-care" className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Customer Care</Link></li>
            </ul>
          </div>

          {/* SHOP BY Column */}
          <div>
            <h3 className="text-black dark:text-white text-xs font-black uppercase mb-8 tracking-widest italic">Shop by</h3>
            <ul className="space-y-4">
              <li><Link to={`/products?category=${CATEGORIES.WOMENS}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Women</Link></li>
              <li><Link to={`/products?category=${CATEGORIES.MENS}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Men</Link></li>
              <li><Link to={`/products?category=${CATEGORIES.SALE}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Sale/ Trending</Link></li>
              <li><Link to={`/products?category=${CATEGORIES.BEAUTY}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Beauty</Link></li>
              <li><Link to={`/products?category=${CATEGORIES.ACCESSORIES}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Accessories</Link></li>
              <li><Link to={`/products?category=${CATEGORIES.FOOTWEAR}`} className="text-[11px] text-gray-500 hover:text-black dark:hover:text-white transition-colors font-bold uppercase tracking-widest">Footwear</Link></li>
            </ul>
          </div>

          {/* PAYMENT & SECURITY Column */}
          <div className="space-y-12">
            <div>
              <h3 className="text-black dark:text-white text-xs font-black uppercase mb-8 tracking-widest italic">Payment Methods</h3>
              <div className="grid grid-cols-4 gap-3 max-w-[200px]">
                <div className="h-8 bg-gray-50 dark:bg-white/5 rounded-md flex items-center justify-center p-1.5 border border-gray-100 dark:border-white/10 group hover:border-primary/30 transition-all">
                  <CreditCard size={18} className="text-gray-400 group-hover:text-primary" />
                </div>
                <div className="h-8 bg-gray-50 dark:bg-white/5 rounded-md flex items-center justify-center p-1.5 border border-gray-100 dark:border-white/10 group hover:border-primary/30 transition-all">
                  <span className="text-[8px] font-black italic opacity-40">UPI</span>
                </div>
                <div className="h-8 bg-gray-50 dark:bg-white/5 rounded-md flex items-center justify-center p-1.5 border border-gray-100 dark:border-white/10 group hover:border-primary/30 transition-all">
                  <span className="text-[8px] font-black italic opacity-40">COD</span>
                </div>
                <div className="h-8 bg-gray-50 dark:bg-white/5 rounded-md flex items-center justify-center p-1.5 border border-gray-100 dark:border-white/10 group hover:border-primary/30 transition-all">
                   <Lock size={14} className="text-gray-400" />
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">All major cards & digital payments</p>
            </div>

            <div>
              <h3 className="text-black dark:text-white text-xs font-black uppercase mb-8 tracking-widest italic">Secure Systems</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-xl border border-green-100 dark:border-green-500/20">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-600">SSL ENCRYPTED</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-500/20">
                  <Lock size={14} className="text-blue-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">PCI DSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-gray-400 font-medium">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 text-center md:text-left">
            <div className="flex items-center space-x-4">
              <Instagram size={18} className="hover:text-primary transition-colors cursor-pointer" />
              <Twitter size={18} className="hover:text-primary transition-colors cursor-pointer" />
              <Facebook size={18} className="hover:text-primary transition-colors cursor-pointer" />
              <Youtube size={18} className="hover:text-primary transition-colors cursor-pointer" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
              ©{currentYear} SAHRIKA RETAIL (INDIA). ALL RIGHTS RESERVED
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/shipping" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Privacy</Link>
            <Link to="/shipping" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Terms</Link>
            <div className="h-4 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7bc.svg" alt="payments" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
