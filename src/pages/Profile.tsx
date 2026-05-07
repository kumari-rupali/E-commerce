import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, MapPin, Store, ShoppingBag, LogOut, Shield, Edit2, X, Check, Camera, 
  Trash2, Plus, CreditCard, Gift, Star, Clock, ChevronRight, HelpCircle, Package,
  Settings, Wallet, ArrowRight, Heart, Users, Loader2, RotateCcw, Truck
} from 'lucide-react';
import BackButton from '../components/BackButton';
import { auth } from '../lib/firebase';
import { signOut, deleteUser } from 'firebase/auth';
import { userSvc, orderSvc } from '../lib/db';
import { useStore } from '../store/useStore';
import { cn, formatPrice } from '../lib/utils';
import { toast } from 'sonner';
import { Order } from '../types';

type ProfileTab = 'orders' | 'loyalty' | 'customer-care' | 'overview' | 'addresses' | 'payments' | 'settings';

export default function Profile() {
  const { user, setUser, currency, theme, setTheme } = useStore();
  const [isGeneralEditOpen, setIsGeneralEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>('orders');
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user) {
      orderSvc.getUserOrders(user.uid).then(fetched => {
        if (fetched) setOrders(fetched);
        setLoadingOrders(false);
      });
    }
  }, [user]);

  const handleToggle2FA = async () => {
    if (!user) return;
    const newState = !user.is2FAEnabled;
    try {
      await userSvc.updateProfile(user.uid, { is2FAEnabled: newState });
      toast.success(newState ? "Two-Factor Authentication Enabled" : "Two-Factor Authentication Disabled");
    } catch (e) {
      toast.error("Failed to update security parameters.");
    }
  };

  const [editData, setEditData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addresses: user?.addresses || [],
    avatar: user?.avatar || ''
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const updatedData = {
        displayName: editData.displayName,
        email: editData.email,
        phone: editData.phone,
        addresses: editData.addresses.filter(a => a.trim() !== ''),
        avatar: editData.avatar
      };
      await userSvc.updateProfile(user.uid, updatedData);
      setIsGeneralEditOpen(false);
      setIsEditingAddresses(false);
      toast.success("Identity synced with Central Archive.");
    } catch (e) {
      toast.error("Sync failed.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        if (auth.currentUser) {
           await deleteUser(auth.currentUser);
           toast.success("Account erased successfully");
           navigate('/');
        }
      } catch (e: any) {
        toast.error("Process failed: " + e.message);
      }
    }
  };

  const handleAddAddress = () => {
    setEditData(prev => ({
      ...prev,
      addresses: [...prev.addresses, '']
    }));
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...editData.addresses];
    newAddresses[index] = value;
    setEditData(prev => ({ ...prev, addresses: newAddresses }));
  };

  const handleRemoveAddress = (index: number) => {
    setEditData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Session terminated safely.");
      navigate('/');
    } catch (e) {
      toast.error("Logout failed.");
    }
  };

  const mockOrders = [
    { id: "ORD-9872", date: "Oct 24, 2026", status: "shipped", total: 12499, items: ["Vibrant Mesh Sneakers"] },
    { id: "ORD-1234", date: "Oct 20, 2026", status: "delivered", total: 8900, items: ["Urban Explorer Backpack"] }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-neutral flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-white/5 p-12 rounded-[56px] shadow-2xl text-center border border-gray-100 dark:border-white/5"
        >
          <div className="w-24 h-24 bg-primary/5 rounded-[40px] flex items-center justify-center mx-auto mb-8">
            <User size={40} className="text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-2">My Account</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-12">Login to synchronize your style</p>
          
          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full py-5 bg-primary text-white rounded-3xl font-bold uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block w-full py-5 bg-white dark:bg-white/5 text-primary border-2 border-primary/20 rounded-3xl font-bold uppercase tracking-widest hover:bg-primary/5 transition-all"
            >
              Join SAHRIKA
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'loyalty', label: 'Sahrika Wallet', icon: <Wallet size={18} /> },
    { id: 'customer-care', label: 'Customer Care', icon: <HelpCircle size={18} /> },
    { id: 'overview', label: 'Personal Information', icon: <User size={18} /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-bg-neutral pt-10 pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] shadow-sm flex flex-col items-center text-center border border-gray-100 dark:border-white/5">
              <div className="relative group mb-6">
                <img 
                  src={user.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'} 
                  alt={user.displayName}
                  className="w-32 h-32 rounded-3xl object-cover shadow-2xl ring-4 ring-bg-neutral"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setIsGeneralEditOpen(true)}
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform border-4 border-white"
                >
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight mb-1">{user.displayName || 'Account Member'}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{user.role || 'Member since 2024'}</p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="flex-1 py-4 bg-gray-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
                  title="Sign out"
                >
                  <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white dark:bg-white/5 p-3 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5 space-y-1">
              {tabs.map(tab => (
                tab.id === 'customer-care' ? (
                  <Link
                    key={tab.id}
                    to="/customer-care"
                    className="w-full flex items-center justify-between p-4 rounded-2xl transition-all group hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 hover:text-text-main dark:hover:text-white"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="p-2 rounded-xl transition-colors bg-primary/5 text-primary group-hover:bg-primary/10">
                        {tab.icon}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest leading-none">{tab.label}</span>
                    </div>
                    <ChevronRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                      activeTab === tab.id 
                        ? "bg-primary text-white shadow-xl shadow-primary/20" 
                        : "hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 hover:text-text-main dark:hover:text-white"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={cn(
                        "p-2 rounded-xl transition-colors",
                        activeTab === tab.id ? "bg-white/10" : "bg-primary/5 text-primary group-hover:bg-primary/10"
                      )}>
                        {tab.icon}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest leading-none">{tab.label}</span>
                    </div>
                    <ChevronRight size={16} className={cn(
                      "transition-transform",
                      activeTab === tab.id ? "rotate-90 opacity-100" : "opacity-30 group-hover:opacity-100 group-hover:translate-x-1"
                    )} />
                  </button>
                )
              ))}
            </div>

            <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5 space-y-6">
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white">Assured Quality</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Handpicked Selections</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                  <RotateCcw size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white">Easy Returns</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">30-Day Policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-default">
                <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest dark:text-white">Free Shipping</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">On all orders over ₹499</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bento Points Card */}
                    <div className="md:col-span-2 bg-primary p-10 rounded-[56px] text-white shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl group-hover:scale-110 transition-transform">
                          <Gift size={200} />
                       </div>
                       <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-8">Loyalty Program</h3>
                       <div className="relative z-10 flex items-end justify-between mb-8">
                          <div>
                            <p className="text-8xl font-black tracking-tighter leading-none">{user.bonusPoints || 0}</p>
                            <p className="text-sm font-bold uppercase tracking-widest mt-4 opacity-80">SAHRIKA Reward Points</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status Tier</p>
                             <p className="text-2xl font-extrabold tracking-tight">VIP Silver</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '65%' }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                           <p className="flex items-center gap-2">
                             <Star size={16} className="text-amber-300 fill-amber-300" />
                             <span className="text-amber-200">140 points</span> to VIP Gold
                           </p>
                           <Link to="/loyalty" className="hover:underline">View Benefits</Link>
                        </div>
                       </div>
                    </div>

                    {/* Bento Mini Stats */}
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between h-[calc(50%-12px)] group hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-all">
                            <Heart size={20} />
                          </div>
                          <ArrowRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-text-main dark:text-white tracking-tighter">24</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Items in Wishlist</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between h-[calc(50%-12px)] group hover:shadow-xl transition-all">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <ShoppingBag size={20} />
                          </div>
                          <ArrowRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-3xl font-black text-text-main dark:text-white tracking-tighter">{orders.length}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Purchases</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders List */}
                    <div className="lg:col-span-2 bg-white dark:bg-white/5 p-10 rounded-[56px] shadow-sm border border-gray-100 dark:border-white/5">
                       <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold text-text-main dark:text-white tracking-tight uppercase tracking-widest">Recent Activity</h3>
                        <button onClick={() => setActiveTab('orders')} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
                       </div>
                       
                       <div className="space-y-6">
                         {loadingOrders ? (
                           <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-gray-300" /></div>
                         ) : orders.length > 0 ? (
                           orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="flex items-center justify-between group cursor-pointer" onClick={() => setActiveTab('orders')}>
                               <div className="flex items-center gap-4">
                                  <div className="w-16 h-20 bg-gray-50 dark:bg-white/5 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-white/5">
                                     <img 
                                      src={order.items[0]?.image || `https://picsum.photos/seed/${order.id}/400/500`} 
                                      alt="Product" 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                                      referrerPolicy="no-referrer"
                                     />
                                  </div>
                                  <div>
                                     <p className="text-sm font-extrabold text-text-main dark:text-white tracking-tight line-clamp-1">{order.items[0]?.name || 'Mystery Item'}</p>
                                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: {order.id}</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="text-sm font-extrabold text-text-main dark:text-white">{formatPrice(order.total, currency)}</p>
                                  <p className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg mt-1 inline-block shadow-sm",
                                    order.status === 'delivered' ? "bg-green-50 text-green-600 border border-green-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                                  )}>{order.status}</p>
                               </div>
                            </div>
                           ))
                         ) : (
                           <div className="py-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No recent transactions</div>
                         )}
                       </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="bg-white dark:bg-white/5 p-10 rounded-[56px] shadow-sm border border-gray-100 dark:border-white/5">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 italic">Shortcuts</h3>
                      <div className="grid grid-cols-2 gap-4">
                         {[
                           { label: 'Payments', icon: <CreditCard size={20} />, tab: 'payments' as const },
                           { label: 'Addresses', icon: <MapPin size={20} />, tab: 'addresses' as const },
                           { label: 'Settings', icon: <Settings size={20} />, tab: 'settings' as const },
                           { label: 'Rewards', icon: <Gift size={20} />, tab: 'loyalty' as const },
                         ].map((item, i) => (
                           <button 
                             key={i} 
                             onClick={() => setActiveTab(item.tab)}
                             className="aspect-square bg-gray-50 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group shadow-sm"
                           >
                             <div className="p-3 rounded-2xl bg-white dark:bg-black shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all">
                                {item.icon}
                             </div>
                             <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-white/5 p-10 rounded-[56px] shadow-sm border border-gray-100 dark:border-white/5"
                >
                  <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight mb-8 uppercase tracking-widest">Order Archives</h2>
                  <div className="space-y-6">
                    {loadingOrders ? (
                      <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
                    ) : orders.length > 0 ? (
                      orders.map((order) => (
                        <div key={order.id} className="p-8 border border-gray-100 dark:border-white/10 rounded-[40px] hover:border-primary transition-all group relative overflow-hidden bg-gray-50/50 dark:bg-white/5">
                          <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                            <div className="flex items-center space-x-6">
                              <div className="w-20 h-24 bg-white dark:bg-black rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10">
                                 <img 
                                   src={order.items[0]?.image || `https://picsum.photos/seed/${order.id}/400/500`} 
                                   alt="Order item" 
                                   className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                                   referrerPolicy="no-referrer"
                                 />
                              </div>
                              <div>
                                 <p className={cn(
                                   "text-[10px] font-black uppercase tracking-widest mb-1 px-3 py-1 rounded-full inline-block",
                                   order.status === 'delivered' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                 )}>{order.status}</p>
                                 <h4 className="text-sm font-extrabold text-text-main dark:text-white tracking-tight">{order.items[0]?.name || 'Item from Archive'}</h4>
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ref: {order.id}</p>
                              </div>
                            </div>
                            <div className="text-right flex flex-col justify-between">
                               <p className="text-xl font-black text-text-main dark:text-white leading-none">{formatPrice(order.total, currency)}</p>
                               <button onClick={() => navigate('/orders')} className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all mt-4 border border-primary/10">
                                  Trace Logistics
                               </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-24 text-center">
                        <Package size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your archives are empty</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-white/5 p-10 rounded-[56px] shadow-sm border border-gray-100 dark:border-white/5"
                >
                  <div className="flex justify-between items-end mb-12">
                    <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight uppercase tracking-widest">Shipping Vault</h2>
                    <button 
                      onClick={() => setIsEditingAddresses(!isEditingAddresses)} 
                      className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4"
                    >
                      {isEditingAddresses ? 'Dismiss' : 'Manage Nodes'}
                    </button>
                  </div>

                  {!isEditingAddresses ? (
                    <div className="space-y-4">
                      {user.addresses?.map((addr, idx) => (
                        <div key={idx} className="group p-8 bg-gray-50/50 dark:bg-white/5 rounded-[40px] border border-transparent hover:border-primary transition-all flex items-center justify-between">
                          <div className="flex items-start space-x-6">
                            <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-sm text-gray-400 group-hover:text-primary transition-colors">
                               <MapPin size={24} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-text-main dark:text-white tracking-tight leading-relaxed max-w-md">{addr}</p>
                               {idx === 0 && (
                                 <span className="text-[9px] font-black uppercase tracking-widest text-primary mt-2 inline-block bg-primary/5 px-3 py-1 rounded-full">Primary Destination</span>
                               )}
                            </div>
                          </div>
                          {idx !== 0 && (
                            <button 
                              onClick={() => {
                                const updated = [addr, ...user.addresses!.filter((_, i) => i !== idx)];
                                handleSaveProfile(); // Assuming this saves current store user.addresses? No, we need to update state first.
                                // Actually handleSaveProfile uses editData. 
                                // I should probably update editData and save.
                                setEditData(p => ({ ...p, addresses: updated }));
                                // Explicitly save for now
                                userSvc.updateProfile(user.uid, { addresses: updated });
                                setUser({ ...user, addresses: updated });
                              }}
                              className="opacity-0 group-hover:opacity-100 text-[9px] font-black uppercase tracking-widest text-primary bg-white dark:bg-black px-4 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-all border border-gray-100 dark:border-white/10"
                            >
                              Prioritize
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                       {editData.addresses.map((addr, idx) => (
                         <div key={idx} className="relative group animate-in slide-in-from-left-4 duration-300">
                           <textarea
                             value={addr}
                             onChange={(e) => handleAddressChange(idx, e.target.value)}
                             className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-black rounded-3xl p-6 text-sm font-bold transition-all pr-16 dark:text-white"
                             placeholder={`Coordinate node ${idx + 1}...`}
                           />
                           <button 
                             onClick={() => handleRemoveAddress(idx)}
                             className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-all p-2"
                           >
                             <Trash2 size={18} />
                           </button>
                         </div>
                       ))}
                       <button 
                         onClick={handleAddAddress}
                         className="w-full py-6 border-2 border-dashed border-gray-100 dark:border-white/10 rounded-3xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center p-8 bg-gray-50 dark:bg-white/5"
                       >
                         <Plus size={18} className="mr-3" />
                         Integrate New Node
                       </button>
                       <button 
                         onClick={handleSaveProfile}
                         className="w-full py-6 bg-primary text-white rounded-full font-black uppercase tracking-widest shadow-2xl shadow-primary/20 mt-12 hover:scale-[1.02] active:scale-[0.98] transition-all"
                       >
                         Initialize Sync
                       </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'loyalty' && (
                <motion.div
                  key="loyalty"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-black dark:bg-white p-12 rounded-[56px] text-white dark:text-black shadow-2xl relative overflow-hidden text-center border border-transparent dark:border-white/10">
                     <div className="absolute top-0 right-0 p-12 opacity-10 blur-[2px]">
                        <Star size={200} />
                     </div>
                     <Star size={48} className="mx-auto mb-8 text-yellow-400 animate-pulse" />
                     <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 italic">Loyalty Rewards</h2>
                     <p className="text-7xl font-black tracking-tighter mb-4">{user.bonusPoints || 0}</p>
                     <p className="text-xl font-serif italic mb-12 uppercase tracking-tight">SAHRIKA Bonus Points</p>
                     
                     <div className="flex justify-center flex-wrap gap-4">
                        <div className="px-8 py-4 bg-white/10 dark:bg-black/5 rounded-3xl border border-white/5 backdrop-blur-md">
                           <p className="text-xs font-black uppercase tracking-widest mb-1 italic opacity-60">Status</p>
                           <p className="text-lg font-black tracking-tighter text-sahrika-red italic uppercase">Gold</p>
                        </div>
                        <div className="px-8 py-4 bg-white/10 dark:bg-black/5 rounded-3xl border border-white/5 backdrop-blur-md">
                           <p className="text-xs font-black uppercase tracking-widest mb-1 italic opacity-60">Value</p>
                           <p className="text-lg font-black tracking-tighter uppercase italic">{formatPrice((user.bonusPoints || 0) * 10, currency)} Off</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white dark:bg-black p-12 rounded-[56px] shadow-sm border border-transparent dark:border-white/5">
                     <h3 className="text-xl font-serif italic mb-8 dark:text-white">How to earn points</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { title: 'Shop & Earn', desc: '1 point per ₹10 spent', icon: <ShoppingBag size={20} /> },
                          { title: 'Refer Friends', desc: '500 points / referral', icon: <Users size={20} /> },
                          { title: 'Write Reviews', desc: '50 points / review', icon: <Edit2 size={20} /> },
                        ].map((earn, i) => (
                          <div key={i} className="space-y-4">
                             <div className="w-12 h-12 bg-sahrika-gray dark:bg-white/5 rounded-2xl flex items-center justify-center text-sahrika-red">
                                {earn.icon}
                             </div>
                             <h4 className="text-xs font-black uppercase tracking-widest italic dark:text-white">{earn.title}</h4>
                             <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">{earn.desc}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-black p-10 rounded-[56px] shadow-sm border border-transparent dark:border-white/5"
                >
                  <div className="flex justify-between items-end mb-12">
                     <h2 className="text-2xl font-serif italic dark:text-white uppercase tracking-tight">Saved Ledger</h2>
                     <button className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                        <Plus size={20} />
                     </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {user.savedCards?.map(card => (
                      <div key={card.id} className="p-8 bg-black dark:bg-white text-white dark:text-black rounded-[32px] shadow-2xl relative overflow-hidden group border border-transparent dark:border-white/10">
                        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-sahrika-red to-transparent"></div>
                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-12">
                              <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-xl flex items-center justify-center">
                                 <CreditCard size={24} />
                              </div>
                              <img 
                                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7bc.svg" 
                                className={cn("h-4 brightness-0 invert opacity-50", theme === 'dark' && "invert-0")} 
                                alt={card.brand} 
                              />
                           </div>
                           <p className="text-xl font-mono tracking-[0.2em] mb-8">**** **** **** {card.last4}</p>
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1 italic">Expires</p>
                                 <p className="text-xs font-black uppercase tracking-widest italic">{card.expiry}</p>
                              </div>
                              <button className="text-[8px] font-black uppercase tracking-[0.2em] p-2 bg-white/10 dark:bg-black/5 rounded-xl hover:bg-sahrika-red hover:text-white transition-colors">Discard</button>
                           </div>
                        </div>
                      </div>
                    ))}
                    <button className="p-8 border-2 border-dashed border-gray-100 dark:border-white/10 rounded-[32px] flex flex-col items-center justify-center text-gray-300 hover:border-black dark:hover:border-white transition-all group">
                       <Plus size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add New Card</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-black p-10 rounded-[56px] shadow-sm border border-transparent dark:border-white/5"
                >
                  <h2 className="text-2xl font-serif italic mb-12 dark:text-white uppercase tracking-tight">Configuration</h2>
                  <div className="space-y-12">
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-sm font-black italic dark:text-white uppercase">System Notifications</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Real-time drops and logistics sync</p>
                        </div>
                        <div className="w-12 h-6 bg-black dark:bg-white/10 rounded-full relative cursor-pointer shadow-inner">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white dark:bg-sahrika-red rounded-full shadow-md"></div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-sm font-black italic dark:text-white uppercase">Atmosphere</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Switch between obsidian and light</p>
                        </div>
                        <button 
                          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                          className={cn(
                            "w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-300",
                            theme === 'dark' ? "bg-sahrika-red" : "bg-gray-100"
                          )}
                        >
                           <div className={cn(
                             "absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all",
                             theme === 'dark' ? "right-1" : "left-1"
                           )}></div>
                        </button>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-sm font-black italic dark:text-white uppercase">Secure Entry</h4>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Enhanced cryptographic verification</p>
                        </div>
                        <button 
                          onClick={handleToggle2FA}
                          className={cn(
                            "px-6 py-2 border-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                            user.is2FAEnabled 
                              ? "bg-sahrika-red border-sahrika-red text-white" 
                              : "border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white"
                          )}
                        >
                          {user.is2FAEnabled ? 'Secured' : 'Upgrade'}
                        </button>
                     </div>

                     <div className="pt-12 border-t border-gray-50 dark:border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-sahrika-red mb-6 italic">Permanent Actions</h3>
                        <button 
                          onClick={handleDeleteAccount}
                          className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-sahrika-red hover:opacity-70 transition-all font-serif italic"
                        >
                           <Trash2 size={14} />
                           <span>Erase Identity Forever</span>
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* General Edit Profile Modal */}
      <AnimatePresence>
        {isGeneralEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGeneralEditOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-black rounded-[56px] shadow-2xl p-10 overflow-hidden border border-transparent dark:border-white/10"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif italic dark:text-white">Profile Identity</h2>
                <button onClick={() => setIsGeneralEditOpen(false)} className="p-3 bg-sahrika-gray dark:bg-white/5 rounded-2xl dark:text-white"><X size={20}/></button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Artisan Name</label>
                  <input 
                    type="text" 
                    value={editData.displayName}
                    onChange={(e) => setEditData({...editData, displayName: e.target.value})}
                    className="w-full h-16 bg-sahrika-gray/50 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-3xl px-8 text-sm font-bold transition-all dark:text-white italic uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Email Channel</label>
                  <input 
                    type="email" 
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="w-full h-16 bg-sahrika-gray/50 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-3xl px-8 text-sm font-bold transition-all dark:text-white italic uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Mobile Line</label>
                  <input 
                    type="tel" 
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="w-full h-16 bg-sahrika-gray/50 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-3xl px-8 text-sm font-bold transition-all dark:text-white italic uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4 italic">Avatar Blueprint (URL)</label>
                  <input 
                    type="text" 
                    value={editData.avatar}
                    onChange={(e) => setEditData({...editData, avatar: e.target.value})}
                    className="w-full h-16 bg-sahrika-gray/50 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-3xl px-8 text-sm font-bold transition-all dark:text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                <button 
                  onClick={() => setIsGeneralEditOpen(false)}
                  className="h-16 border-2 border-black dark:border-white text-black dark:text-white rounded-full font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                >
                  Initialize Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
