import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Package, Truck, Clock, ArrowRight, Loader2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useStore } from '../store/useStore';
import { formatPrice, cn } from '../lib/utils';
import { orderSvc } from '../lib/db';
import { Order } from '../types';

export default function Orders() {
  const { user, currency } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isSuccess = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    if (user) {
      orderSvc.getUserOrders(user.uid).then(fetchedOrders => {
        if (fetchedOrders) setOrders(fetchedOrders);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-bg-neutral pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-10 bg-primary rounded-[48px] text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full translate-y-1/2 scale-150" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                <CheckCircle2 size={40} className="text-primary" />
              </div>
              <h1 className="text-4xl font-black tracking-tight mb-4">Order Placed!</h1>
              <p className="text-white/80 max-w-sm mb-8 font-medium">Your order has been received and is now being prepared for shipment. We'll notify you soon.</p>
              <div className="px-6 py-2 bg-black/20 rounded-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">Reference: #ORD-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-main dark:text-white tracking-tight">Order History</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage your recent purchases and track live shipments.</p>
        </div>

        <div className="space-y-8">
          {loading ? (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accessing Archives...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[48px] shadow-sm">
              <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Package size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">When you buy something, it will appear here for you to track and manage.</p>
              <Link to="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                <span>Start Shopping</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : orders.map((order) => (
            <div key={order.id} className="p-8 md:p-10 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[48px] shadow-sm hover:shadow-xl transition-all group">
              <div className="flex flex-col lg:flex-row justify-between gap-10">
                <div className="space-y-6 flex-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs font-black text-text-main dark:text-white tracking-widest uppercase bg-bg-neutral dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">{order.id}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="w-16 h-20 rounded-2xl bg-white border-2 border-bg-neutral overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-16 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 border-2 border-white shadow-md relative z-10">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm md:text-base font-extrabold text-text-main dark:text-white line-clamp-1">{order.items[0]?.name}</p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{order.items.length} {order.items.length === 1 ? 'item' : 'items'} in shipment</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center lg:items-end lg:flex-col justify-between gap-6 lg:min-w-[200px]">
                   <div className="flex items-center gap-3">
                      {order.status === 'shipped' ? (
                        <span className="flex items-center px-5 py-2.5 rounded-2xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm border border-blue-100">
                          <Truck size={14} className="mr-2" />
                          On the Way
                        </span>
                      ) : (
                        <span className="flex items-center px-5 py-2.5 rounded-2xl bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm border border-green-100">
                          <CheckCircle2 size={14} className="mr-2" />
                          Delivered
                        </span>
                      )}
                      <p className="text-xl md:text-3xl font-black text-text-main dark:text-white tracking-tighter leading-none">{formatPrice(order.total, currency)}</p>
                   </div>
                   <button className="w-full md:w-auto px-8 py-3 bg-bg-neutral dark:bg-white/5 text-primary text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-gray-100 dark:border-white/5">
                      Order Details
                   </button>
                </div>
              </div>

              {/* Enhanced Progress Timeline */}
              <div className="mt-12 pt-10 border-t border-gray-100 dark:border-white/10">
                 <div className="relative flex justify-between items-center max-w-3xl mx-auto px-2">
                   {/* Background Line */}
                   <div className="absolute left-10 right-10 top-5 h-1 bg-gray-100 dark:bg-white/5 z-0" />
                   
                   {/* Animated Progress Line */}
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: order.status === 'delivered' ? '100%' : '66.6%' }}
                     className="absolute left-10 right-10 top-5 h-1 bg-primary z-10"
                   />

                   {[
                     { icon: <Clock size={16} />, label: 'Ordered', done: true },
                     { icon: <Package size={16} />, label: 'Packed', done: true },
                     { icon: <Truck size={16} />, label: 'Shipped', done: order.status === 'shipped' || order.status === 'delivered' },
                     { icon: <CheckCircle2 size={16} />, label: 'Arrival', done: order.status === 'delivered' }
                   ].map((step, i) => (
                     <div key={i} className="flex flex-col items-center gap-3 relative z-20">
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500",
                          step.done ? "bg-primary text-white scale-110" : "bg-white dark:bg-black text-gray-300 border border-gray-100 dark:border-white/10"
                        )}>
                          {step.icon}
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest",
                          step.done ? "text-text-main dark:text-white" : "text-gray-400"
                        )}>{step.label}</span>
                     </div>
                   ))}
                 </div>
                 
                 <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-bg-neutral dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5">
                   <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                     Carrier Service: <span className="text-text-main dark:text-white ml-2">SecureExpress Global</span>
                   </p>
                   <div className="flex items-center gap-4">
                      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Tracking ID: <span className="text-primary ml-2 select-all">{order.tracking || 'TRK-9908872'}</span></p>
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Track Live</button>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <Link to="/products" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white dark:bg-white/5 text-gray-500 hover:text-primary font-bold text-xs uppercase tracking-widest shadow-xl shadow-black/5 hover:shadow-primary/10 transition-all border border-gray-100 dark:border-white/10 group">
             Continue Shopping
             <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
}
