import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { cn, formatPrice } from '../lib/utils';
import { CATEGORIES } from '../constants';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, currency } = useStore();
  const wishlisted = isInWishlist(product.id);

  const isSale = product.tags?.includes(CATEGORIES.SALE);
  const isBestSeller = product.tags?.includes(CATEGORIES.BEST_SELLER);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-gray-100 dark:border-white/5 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Wishlist Button Overlay */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 z-10 p-2.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm shadow-sm transition-all duration-300 transform md:opacity-0 md:group-hover:opacity-100 active:scale-90"
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-cta text-cta" : "text-gray-400 group-hover:text-primary"
            )}
          />
        </button>

        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isSale && (
            <div className="bg-cta text-white text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded shadow-sm italic">
              SALE
            </div>
          )}
          {isBestSeller && (
            <div className="bg-primary text-white text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded shadow-sm italic">
              BEST SELLER
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-2">
          <div className="flex justify-between items-start gap-2">
            <Link to={`/product/${product.id}`} className="block flex-1 group/title">
              <h3 className="text-sm font-semibold text-text-main dark:text-white line-clamp-2 group-hover/title:text-primary transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center space-x-1 mt-1.5">
            <div className="flex items-center bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <Star size={10} className="fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-text-main dark:text-gray-300">{product.rating}</span>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">({Math.floor(Math.random() * 200) + 50})</span>
          </div>
        </div>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-baseline space-x-2">
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price, currency)}
            </p>
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.price * 1.5, currency)}
            </p>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center space-x-2 shadow-md shadow-primary/10"
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
