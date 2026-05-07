import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ArrowLeft, Plus, Minus, Share2, Info, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { cn, formatPrice } from '../lib/utils';
import BackButton from '../components/BackButton';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, currency, addToRecentlyViewed } = useStore();
  
  const product = products.find((p) => p.id === id) || products[0];
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || { id: 'm', name: 'M' });
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  
  const wishlisted = isInWishlist(product.id);

  useEffect(() => {
    if (product) {
      if (product.colors?.length) setSelectedColor(product.colors[0]);
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
    }
  }, [product?.id]);

  const displayPrice = (product.price) + (selectedColor?.price || 0) + (selectedSize?.price || 0);

  useEffect(() => {
    if (product?.id) {
      addToRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [product?.id, addToRecentlyViewed]);

  const images = product.colors?.length 
    ? [product.image, ...product.colors.map(c => c.image)]
    : [
        product.image,
        `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80`,
        `https://images.unsplash.com/photo-1539109132314-34a936699561?w=800&q=80`,
      ];
  
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    if (selectedColor?.image) {
      setActiveImage(selectedColor.image);
    }
  }, [selectedColor]);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
           <BackButton />
           <div className="flex items-center space-x-3">
              <button className="p-3 bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary transition-all shadow-sm">
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "p-3 rounded-full transition-all border shadow-sm",
                  wishlisted ? "bg-cta border-cta text-white" : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-primary text-gray-500"
                )}
              >
                <Heart size={18} fill={wishlisted ? "white" : "none"} />
              </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Visual Showcase (50%) */}
          <div className="lg:w-1/2 space-y-6">
             <motion.div 
               layoutId={`product-img-${product.id}`}
               className="aspect-[4/5] bg-white dark:bg-white/5 rounded-3xl overflow-hidden relative shadow-lg border border-gray-100 dark:border-white/5 cursor-zoom-in"
               onMouseMove={handleMouseMove}
               onMouseEnter={() => setIsZoomed(true)}
               onMouseLeave={() => setIsZoomed(false)}
             >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    scale: isZoomed ? 1.5 : 1,
                    originX: `${zoomPos.x}%`,
                    originY: `${zoomPos.y}%`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {product.price > 1000 && !isZoomed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-6 left-6"
                  >
                    <span className="px-4 py-2 bg-cta text-white text-xs font-bold rounded-lg shadow-lg">
                      Free Shipping
                    </span>
                  </motion.div>
                )}
             </motion.div>

             <div className="relative group">
                <div 
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 snap-x no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                   {images.map((img, i) => (
                     <button
                       key={i}
                       onClick={() => setActiveImage(img)}
                       className={cn(
                         "flex-shrink-0 aspect-square w-24 rounded-2xl overflow-hidden border-2 transition-all shadow-sm snap-start",
                         activeImage === img ? "border-primary ring-2 ring-primary/20 scale-105" : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                       )}
                     >
                       <img src={img} alt="" className="w-full h-full object-cover" />
                     </button>
                   ))}
                </div>

                {images.length > 4 && (
                  <>
                    <button 
                      onClick={() => scrollCarousel('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-black p-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-gray-100 dark:border-white/10"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => scrollCarousel('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-black p-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all border border-gray-100 dark:border-white/10"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
             </div>
          </div>

          {/* Configuration & Order (50%) */}
          <div className="lg:w-1/2 flex flex-col pt-4">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                <div>
                   <Link to="/products" className="text-sm font-bold text-primary mb-2 block hover:underline">
                     {product.category}
                   </Link>
                   <h1 className="text-3xl md:text-5xl font-extrabold text-text-main dark:text-white mb-4 tracking-tight leading-tight">
                     {product.name}
                   </h1>
                   <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} size={14} className={cn("mr-0.5", i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200")} />
                         ))}
                         <span className="ml-2 text-sm font-bold text-yellow-700 dark:text-yellow-400">{product.rating}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-400">|</span>
                      <span className="text-sm font-bold text-gray-500">{product.reviewCount} Reviews</span>
                   </div>
                </div>

                <div className="flex items-center space-x-6">
                   <p className="text-4xl font-extrabold text-primary">
                     {formatPrice(displayPrice, currency)}
                   </p>
                   {displayPrice > 100 && (
                     <div className="flex items-center space-x-3">
                        <p className="text-xl text-gray-400 line-through font-medium">
                          {formatPrice(displayPrice * 1.5, currency)}
                        </p>
                        <span className="bg-cta/10 text-cta text-xs font-bold px-3 py-1.5 rounded-lg border border-cta/20">
                          33% OFF
                        </span>
                     </div>
                   )}
                </div>

                {/* Narrative Detail */}
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                   {product.description} Built with performance and everyday comfort in mind, this piece features high-quality materials and meticulous craftsmanship.
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-text-main dark:text-white">Choose Color: <span className="text-gray-500 font-medium">{selectedColor?.name}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color)}
                            className={cn(
                              "group relative p-1 rounded-full transition-all border-2",
                              selectedColor?.id === color.id ? "border-primary scale-110" : "border-transparent hover:border-gray-200"
                            )}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                              <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2 py-1 rounded">
                              {color.name}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Size Config */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-text-main dark:text-white">Choose Size</span>
                      <button className="font-bold text-primary hover:underline">Size Guide</button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {(product.sizes || [
                        { id: 'xs', name: 'XS' },
                        { id: 's', name: 'S' },
                        { id: 'm', name: 'M' },
                        { id: 'l', name: 'L' },
                        { id: 'xl', name: 'XL' }
                      ]).map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all border-2 shadow-sm",
                            selectedSize.id === size.id 
                              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                              : "bg-white dark:bg-white/5 text-text-main dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-primary"
                          )}
                        >
                          <span className="text-sm font-bold">{size.name}</span>
                          {size.price && <span className="text-[8px] opacity-80">+{formatPrice(size.price, currency)}</span>}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Acquisition Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => addToCart(product, selectedColor, selectedSize)}
                     className="flex-1 bg-white dark:bg-white/5 border-2 border-primary text-primary py-4 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                   >
                     <ShoppingBag size={18} />
                     Add to Cart
                   </motion.button>
                   <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => {
                        addToCart(product, selectedColor, selectedSize);
                        navigate('/cart');
                     }}
                     className="flex-1 bg-cta text-white py-4 rounded-xl text-sm font-bold shadow-xl shadow-cta/20 transition-all hover:bg-cta/90 active:scale-95"
                   >
                     Buy Now
                   </motion.button>
                </div>

                {/* Utility Hub */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-white/10">
                    <div className="flex flex-col items-center text-center space-y-2">
                       <Truck size={20} className="text-primary" />
                       <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Standard Delivery</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                       <RotateCcw size={20} className="text-primary" />
                       <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">30-Day Returns</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                       <ShieldCheck size={20} className="text-primary" />
                       <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Secure Payment</span>
                    </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Technical Specifications */}
        <section className="mb-24">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Info size={18} className="text-primary" />
                 </div>
                 <h3 className="text-lg font-bold text-text-main dark:text-white">Composition</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Premium blend of high-grade synthetic and natural fibers. Designed to maintain shape and color through rigorous use.
                 </p>
              </div>
              <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <RotateCcw size={18} className="text-primary" />
                 </div>
                 <h3 className="text-lg font-bold text-text-main dark:text-white">Care Instructions</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Machine wash cold with like colors. Tumble dry on low heat. Avoid bleach to preserve the integrity of the technical fabric.
                 </p>
              </div>
              <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Star size={18} className="text-primary" />
                 </div>
                 <h3 className="text-lg font-bold text-text-main dark:text-white">Fit & Finish</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    Unisex modern athletic fit. Precision stitching and reinforced seams for long-lasting performance and aesthetic appeal.
                 </p>
              </div>
           </div>
        </section>

        {/* Recommendation Engine */}
        <section className="pb-24 border-t border-gray-200 dark:border-white/10 pt-16">
           <div className="flex justify-between items-center mb-10">
              <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-text-main dark:text-white tracking-tight">Complete the Look</h2>
                 <p className="text-sm text-gray-500 mt-1 font-medium">Customer also bought these items</p>
              </div>
              <Link to="/products" className="text-sm font-bold text-primary flex items-center hover:translate-x-1 transition-all">
                Shop More <ArrowRight size={16} className="ml-1" />
              </Link>
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
             {products
               .filter(p => p.id !== product.id)
               .slice(0, 6)
               .map((p, i) => (
                 <motion.div
                   key={p.id}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <ProductCard product={p} />
                 </motion.div>
               ))}
           </div>
        </section>
      </div>
    </div>
  );
}
