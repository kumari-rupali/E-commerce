import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp, ShieldCheck, Zap, Award, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

export default function Home() {
  const { products, currency, recentlyViewed } = useStore();
  
  const recentlyViewedProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);
  
  const categories = [
    { name: 'Womens', id: CATEGORIES.WOMENS, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&q=80' },
    { name: 'Mens', id: CATEGORIES.MENS, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&q=80' },
    { name: 'Sale', id: CATEGORIES.SALE, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80' },
    { name: 'Footwear', id: CATEGORIES.FOOTWEAR, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
    { name: 'Accessories', id: CATEGORIES.ACCESSORIES, img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=200&q=80' },
    { name: 'Beauty', id: CATEGORIES.BEAUTY, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80' },
  ];

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 56 });
  const [currentBanner, setCurrentBanner] = useState(0);

  const BANNERS = [
    {
      id: 1,
      title: "Spring Summer",
      subtitle: "New Collection 2026",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
    },
    {
      id: 2,
      title: "Flash Sale",
      subtitle: "Up to 80% OFF",
      img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
    },
    {
      id: 3,
      title: "Modern Style",
      subtitle: "New Modern Arrivals",
      img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
    }
  ];

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % BANNERS.length);
    }, 5000);

    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, hours: prev.hours };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => {
      clearInterval(bannerTimer);
      clearInterval(countdownTimer);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Visual Category Bar */}
      <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 overflow-x-auto no-scrollbar py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center gap-8 md:gap-14">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/products?category=${cat.id}`} 
              className="flex flex-col items-center group space-y-2 shrink-0"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:ring-2 ring-primary transition-all duration-300">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-16 pb-20">
        {/* Hero Area */}
        <section className="relative px-4 pt-6">
          <div className="max-w-7xl mx-auto relative h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={BANNERS[currentBanner].img}
                  alt={BANNERS[currentBanner].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col items-start justify-center text-left px-8 md:px-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-cta text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider"
                  >
                    {BANNERS[currentBanner].subtitle}
                  </motion.div>
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-4xl md:text-7xl font-extrabold mb-8 max-w-xl leading-tight"
                  >
                    {BANNERS[currentBanner].title}
                  </motion.h2>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link to="/products" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-sm font-bold rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95">
                      Explore Collection
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Indicators */}
            <div className="absolute bottom-10 left-8 md:left-20 flex space-x-3 z-10">
              {BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBanner(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentBanner === idx ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Promo */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/products" className="relative group aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-xl font-bold mb-2">Party Ready</span>
              <span className="text-white/80 text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">Shop Now <ArrowRight size={14} className="ml-1" /></span>
            </div>
          </Link>
          <Link to="/products" className="relative group aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
            <img src="https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-xl font-bold mb-2">Daily Essentials</span>
              <span className="text-white/80 text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">Shop Now <ArrowRight size={14} className="ml-1" /></span>
            </div>
          </Link>
          <Link to="/products" className="relative group aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-white text-xl font-bold mb-2">Modern Minimalist</span>
              <span className="text-white/80 text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">Shop Now <ArrowRight size={14} className="ml-1" /></span>
            </div>
          </Link>
        </div>

        {/* Lightning Deals */}
        <section className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-white/10"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <h2 className="text-3xl font-bold text-text-main dark:text-white">Lightning Deals</h2>
              <div className="flex items-center text-sm font-bold bg-cta/10 text-cta py-2 px-4 rounded-xl border border-cta/20">
                <Clock size={18} className="mr-2 animate-pulse" />
                <span className="mr-2 text-[11px] font-bold uppercase tracking-wider">Ends in:</span>
                <span className="tabular-nums font-mono text-base">
                   {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            <Link to={`/products?category=${CATEGORIES.SALE}`} className="text-sm font-bold text-primary flex items-center hover:translate-x-1 transition-transform">
              View All Deals <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {products
              .filter(p => p.tags?.includes(CATEGORIES.SALE))
              .slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Big Discount Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="relative py-16 md:py-24 px-8 text-center bg-primary rounded-[40px] overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-white/80">
                End of Season Liquidation
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 leading-tight">
                Final reductions up to <span className="text-cta">70% OFF</span>
              </h2>
              <Link 
                to="/products" 
                className="inline-block bg-white text-primary px-12 py-4 text-sm font-extrabold rounded-2xl hover:bg-cta hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Shop the Sale
              </Link>
            </div>
            {/* Abstract Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
        </motion.div>

        {/* Best Sellers */}
        <section className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-main dark:text-white tracking-tight italic">Bestsellers</h2>
            <p className="text-sm text-gray-500 font-medium max-w-lg mx-auto">Discover the pieces everyone is talking about. Hand-picked for quality and style.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter(p => p.tags?.includes(CATEGORIES.BEST_SELLER))
              .slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to={`/products?category=${CATEGORIES.BEST_SELLER}`} className="text-[11px] font-black uppercase tracking-widest text-primary hover:underline">
              View All Bestsellers
            </Link>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10 border-b border-gray-200 dark:border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-text-main dark:text-white">Recently Viewed</h2>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">Based on your activity</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentlyViewedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Content Grid */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="relative aspect-[16/9] overflow-hidden rounded-3xl group shadow-lg">
             <img src="https://images.unsplash.com/photo-1445205170230-053b830c6050?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Banner" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
               <h3 className="text-white text-2xl font-bold mb-3">Accessories Collection</h3>
               <Link to="/products" className="text-white text-xs font-bold uppercase tracking-wider flex items-center hover:translate-x-1 transition-transform">Shop Collections <ArrowRight size={14} className="ml-1" /></Link>
             </div>
           </div>
           <div className="relative aspect-[16/9] overflow-hidden rounded-3xl group shadow-lg">
             <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Banner" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
               <h3 className="text-white text-2xl font-bold mb-3">The Vacation Edit</h3>
               <Link to="/products" className="text-white text-xs font-bold uppercase tracking-wider flex items-center hover:translate-x-1 transition-transform">Get Ready <ArrowRight size={14} className="ml-1" /></Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
