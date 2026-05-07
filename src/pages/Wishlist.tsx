import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-12 relative overflow-hidden group">
            <Heart size={80} className="text-gray-200 group-hover:scale-110 group-hover:text-sahrika-red transition-all duration-700" />
            <div className="absolute inset-0 bg-sahrika-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h1 className="text-5xl font-serif italic mb-6 tracking-tighter">Your Heart is Open.</h1>
          <p className="text-[10px] text-gray-400 mb-12 max-w-sm mx-auto font-black uppercase tracking-[0.4em] italic leading-relaxed">
            Curate your personal collection. Save the items that resonate with your identity.
          </p>
          <Link
            to="/products"
            className="inline-block bg-black text-white px-16 py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-sahrika-red transition-all shadow-2xl rounded-full"
          >
            Discover the Archive
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-neutral py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 dark:border-white/10 pb-12">
          <div className="flex-1">
             <BackButton />
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-6xl font-extrabold text-text-main dark:text-white tracking-tight mt-10 mb-4"
             >
               My Wishlist
             </motion.h1>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg text-primary text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Curated Picks</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <p className="text-sm font-bold text-gray-400">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                </p>
             </div>
          </div>
          <div className="max-w-xs md:text-right">
             <p className="text-sm text-gray-500 font-medium leading-relaxed">
               Your private collection of inspiration. These pieces are saved for your next perfect look.
             </p>
          </div>
        </header>

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10"
          >
            {wishlist.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="relative">
                   <ProductCard product={product} />
                   <div className="absolute top-4 left-4 pointer-events-none">
                      <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm flex items-center gap-2 border border-white">
                         <Sparkles size={12} className="animate-pulse" />
                         <span>In Wishlist</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center py-20 border-t border-gray-200 dark:border-white/10"
        >
           <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-10">Add to cart</h4>
           <div className="text-2xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight leading-tight max-w-2xl mx-auto mb-12">
             "Love it? Make it yours before it's gone."
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products" className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-all">
                  Continue Browsing
              </Link>
              <Link to="/cart" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                  Go to Bag
              </Link>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
