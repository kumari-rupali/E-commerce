import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, ShoppingBag, MapPin, ShieldCheck, Zap, Lock, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useStore } from '../store/useStore';
import { formatPrice, cn } from '../lib/utils';
import { toast } from 'sonner';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, currency } = useStore();
  const navigate = useNavigate();
  
  const getCartItemId = (item: any) => `${item.id}-${item.selectedColor?.id || 'default'}-${item.selectedSize?.id || 'default'}`;

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.price + (item.selectedColor?.price || 0) + (item.selectedSize?.price || 0);
    return acc + itemPrice * item.quantity;
  }, 0);
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg-neutral flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-gray-100 dark:border-white/10">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <h1 className="text-3xl font-extrabold text-text-main dark:text-white mb-4 tracking-tight">Your cart is empty</h1>
          <p className="text-gray-500 mb-10 font-medium">Looks like you haven't added anything to your cart yet. Explore our latest products and find something you love!</p>
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-10 py-4 font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-neutral min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 dark:border-white/10 pb-8">
           <div>
              <BackButton />
              <h1 className="text-3xl md:text-5xl font-extrabold text-text-main dark:text-white tracking-tight mt-6">
                Shopping Cart
              </h1>
           </div>
           <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10">
              <ShoppingBag size={16} className="text-primary" />
              <span>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main List */}
          <div className="flex-1 w-full space-y-6">
            <AnimatePresence mode="popLayout">
                {cart.map((item, i) => {
                  const cartItemId = getCartItemId(item);
                  const itemPrice = item.price + (item.selectedColor?.price || 0) + (item.selectedSize?.price || 0);

                  return (
                    <motion.div
                      layout
                      key={cartItemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                    >
                        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-white/5 rounded-3xl shadow-sm border border-gray-200 dark:border-white/10 hover:shadow-md transition-all">
                          <Link to={`/product/${item.id}`} className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-white/10">
                            <img
                              src={item.selectedColor?.image || item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </Link>
                          
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-4 mb-4">
                              <div>
                                 <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.category}</p>
                                 <Link to={`/product/${item.id}`} className="hover:text-primary">
                                   <h3 className="text-lg md:text-xl font-extrabold text-text-main dark:text-white leading-tight">{item.name}</h3>
                                 </Link>
                                 <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                   {item.selectedColor && (
                                     <p className="text-xs font-bold text-gray-400">Color: <span className="text-gray-600 dark:text-gray-300">{item.selectedColor.name}</span></p>
                                   )}
                                   {item.selectedSize && (
                                     <p className="text-xs font-bold text-gray-400">Size: <span className="text-gray-600 dark:text-gray-300">{item.selectedSize.name}</span></p>
                                   )}
                                 </div>
                              </div>
                              <button 
                                onClick={() => {
                                   removeFromCart(cartItemId);
                                   toast.error("Item removed from cart");
                                }}
                                className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400 hover:text-cta transition-colors border border-gray-200 dark:border-white/10"
                                title="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto">
                               <div className="flex items-center bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 p-1">
                                  <button 
                                    onClick={() => updateQuantity(cartItemId, item.quantity - 1)}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-primary/20 rounded-lg transition-colors text-text-main dark:text-white"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus size={14} strokeWidth={3} />
                                  </button>
                                  <span className="text-sm font-extrabold w-10 text-center text-text-main dark:text-white">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(cartItemId, item.quantity + 1)}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-primary/20 rounded-lg transition-colors text-text-main dark:text-white"
                                  >
                                    <Plus size={14} strokeWidth={3} />
                                  </button>
                               </div>
                               <p className="text-xl font-extrabold text-primary">{formatPrice(itemPrice * item.quantity, currency)}</p>
                            </div>
                          </div>
                        </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <aside className="w-full lg:w-[400px] lg:sticky lg:top-32">
             <div className="bg-white dark:bg-white/5 p-8 rounded-[32px] shadow-xl border border-gray-200 dark:border-white/10 space-y-8">
                <h2 className="text-xl font-extrabold text-text-main dark:text-white tracking-tight border-b border-gray-100 dark:border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-500 font-bold">Subtotal</span>
                     <span className="text-text-main dark:text-white font-extrabold">{formatPrice(subtotal, currency)}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-500 font-bold">Shipping Cost</span>
                     <span className="text-green-500 font-extrabold uppercase tracking-tight text-xs">Calculated at next step</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-500 font-bold">Estimated Taxes</span>
                     <span className="text-text-main dark:text-white font-extrabold">{formatPrice(subtotal * 0.08, currency)}</span>
                   </div>
                   
                   <div className="h-px bg-gray-100 dark:bg-white/10 my-6" />
                   
                   <div className="flex justify-between items-end">
                     <span className="text-lg font-extrabold text-text-main dark:text-white">Order Total</span>
                     <div className="text-right">
                        <span className="text-2xl font-black text-primary tracking-tight leading-none">{formatPrice(total + (subtotal * 0.08), currency)}</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Inclusive of GST</p>
                     </div>
                   </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-cta text-white py-4 rounded-2xl text-center font-extrabold shadow-xl shadow-cta/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                     <ShieldCheck size={18} className="text-green-500" />
                     <span>Secure, encrypted payment processing</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                     <RotateCcw size={18} className="text-primary" />
                     <span>No-hassle 30-day return policy</span>
                  </div>
                </div>
             </div>

             <div className="mt-8 px-4 flex items-center justify-center gap-4 grayscale opacity-30">
                <img src="https://www.svgrepo.com/show/508728/visa.svg" className="h-4" alt="visa" />
                <img src="https://www.svgrepo.com/show/508696/mastercard.svg" className="h-6" alt="mastercard" />
                <img src="https://www.svgrepo.com/show/508712/paypal.svg" className="h-4" alt="paypal" />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
