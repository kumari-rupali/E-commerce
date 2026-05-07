import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, MapPin, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Plus, Edit2, Trash2, Check, Search as SearchIcon, Loader2, ShoppingBag, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { cn } from '../lib/utils';

type Step = 'address' | 'summary' | 'payment' | 'success';

// Simulated Address API results
const MOCK_ADDRESS_SUGGESTIONS = [
  "123 Fashion Avenue, Bandra West, Mumbai, Maharashtra 400050",
  "Skyline Towers, Flat 402, Jubilee Hills, Hyderabad, Telangana 500033",
  "G-45, 2nd Cross, Koramangala 4th Block, Bengaluru, Karnataka 560034",
  "Plot No. 12, Sector 18, Gurgaon, Haryana 122001",
  "Palm Court, Shop 12, MG Road, Pune, Maharashtra 411001",
  "Green Valley Estate, House 88, Chennai, Tamil Nadu 600001",
  "Heritage Apartments, Salt Lake City, Kolkata, West Bengal 700091"
];

import { orderSvc } from '../lib/db';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, user, setUser, clearCart, currency } = useStore();
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [selectedAddress, setSelectedAddress] = useState<string>(user?.addresses?.[0] || '');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await orderSvc.create({
        userId: user.uid,
        items: cart,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      clearCart();
      setCurrentStep('success');
    } catch (error) {
      toast.error("Order placement failed.");
    } finally {
      setLoading(false);
    }
  };
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addressInput, setAddressInput] = useState('');
  
  // Autocomplete state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  useEffect(() => {
    // Sync selected address if list changes
    if (user?.addresses && !user.addresses.includes(selectedAddress)) {
      setSelectedAddress(user.addresses[0] || '');
    }
  }, [user?.addresses]);

  // Handle outside click for autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddressInputChange = (val: string) => {
    setAddressInput(val);
    if (val.length > 2) {
      setIsSearching(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = MOCK_ADDRESS_SUGGESTIONS.filter(s => 
          s.toLowerCase().includes(val.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
      }, 400);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (s: string) => {
    setAddressInput(s);
    setSuggestions([]);
  };

  const saveAddress = () => {
    if (!addressInput.trim() || !user) return;
    
    let updatedAddresses = [...(user.addresses || [])];
    if (editIndex !== null) {
      updatedAddresses[editIndex] = addressInput.trim();
    } else {
      updatedAddresses = [addressInput.trim(), ...updatedAddresses];
    }
    
    setUser({ ...user, addresses: updatedAddresses });
    setSelectedAddress(addressInput.trim());
    resetForm();
  };

  const deleteAddress = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    const updated = user.addresses?.filter((_, i) => i !== index) || [];
    setUser({ ...user, addresses: updated });
    if (selectedAddress === user.addresses?.[index]) {
      setSelectedAddress(updated[0] || '');
    }
  };

  const setDefaultAddress = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !user.addresses) return;
    const addr = user.addresses[index];
    const updated = [addr, ...user.addresses.filter((_, i) => i !== index)];
    setUser({ ...user, addresses: updated });
    setSelectedAddress(addr);
  };

  const startEdit = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.addresses) return;
    setEditIndex(index);
    setAddressInput(user.addresses[index]);
    setIsAddingNewAddress(true);
  };

  const resetForm = () => {
    setIsAddingNewAddress(false);
    setEditIndex(null);
    setAddressInput('');
    setSuggestions([]);
  };

  if (cart.length === 0 && currentStep !== 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif italic mb-4">Your bag is empty</h1>
        <Link to="/products" className="text-xs font-black uppercase tracking-widest underline">Return to Shop</Link>
      </div>
    );
  }

  const steps = [
    { id: 'address', label: 'Shipping' },
    { id: 'summary', label: 'Summary' },
    { id: 'payment', label: 'Payment' }
  ];

  return (
    <div className="min-h-screen bg-bg-neutral pb-20">
      {/* Checkout Navbar */}
      <div className="border-b border-gray-200 dark:border-white/10 sticky top-0 bg-bg-neutral/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link to="/cart" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Cart</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={24} />
            <span className="font-extrabold text-xl tracking-tight text-text-main dark:text-white">STORE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
             <Lock size={14} className="text-green-500" />
             <span className="hidden sm:inline uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Step Indicator */}
        {currentStep !== 'success' && (
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center w-full max-w-2xl relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 -translate-y-1/2 z-0" />
              {steps.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > idx;
                
                return (
                  <div key={step.id} className="flex-1 relative z-10 flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2",
                      isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110" : 
                      isCompleted ? "bg-green-500 border-green-500 text-white" : 
                      "bg-white dark:bg-black border-gray-200 dark:border-white/10 text-gray-400"
                    )}>
                      {isCompleted ? <Check size={18} strokeWidth={3} /> : idx + 1}
                    </div>
                    <span className={cn(
                      "absolute top-12 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors",
                      isActive ? "text-primary" : "text-gray-400"
                    )}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentStep === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight">Shipping Details</h2>
                    {user?.addresses && user.addresses.length > 0 && !isAddingNewAddress && (
                       <button onClick={() => setIsAddingNewAddress(true)} className="text-sm font-bold text-primary hover:underline">Add New</button>
                    )}
                  </div>
                  
                  {!isAddingNewAddress ? (
                    <div className="space-y-4">
                      {user?.addresses?.length === 0 ? (
                        <div className="py-16 text-center bg-white dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                           <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                              <MapPin size={24} className="text-gray-300" />
                           </div>
                           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No saved addresses</p>
                        </div>
                      ) : (
                        user?.addresses?.map((addr, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedAddress(addr)}
                            className={cn(
                              "group relative p-6 rounded-2xl cursor-pointer transition-all border-2",
                              selectedAddress === addr 
                                ? "border-primary bg-white dark:bg-primary/5 shadow-xl shadow-primary/5" 
                                : "border-white dark:border-white/5 bg-white dark:bg-white/5 hover:border-gray-200 dark:hover:border-white/20"
                            )}
                          >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0",
                                  selectedAddress === addr ? "bg-primary text-white" : "bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:text-primary transition-colors"
                                )}>
                                  <MapPin size={20} />
                                </div>
                                <div className="flex-1 pr-12">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className={cn("text-base font-bold tracking-tight", selectedAddress === addr ? "text-text-main dark:text-white" : "text-gray-500")}>{addr}</p>
                                    {idx === 0 && (
                                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-400">Default</span>
                                    )}
                                  </div>
                                </div>
                                {selectedAddress === addr && (
                                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                                    <Check size={14} strokeWidth={3} />
                                  </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={(e) => startEdit(idx, e)}
                                 className="p-2.5 bg-white dark:bg-white/10 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 text-gray-400 hover:text-primary transition-colors"
                                 title="Edit"
                               >
                                 <Edit2 size={14} />
                               </button>
                               <button 
                                 onClick={(e) => deleteAddress(idx, e)}
                                 className="p-2.5 bg-white dark:bg-white/10 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 text-gray-400 hover:text-cta transition-colors"
                                 title="Delete"
                               >
                                 <Trash2 size={14} />
                               </button>
                            </div>
                          </div>
                        ))
                      )}

                      {(!user?.addresses || user.addresses.length === 0) && (
                        <button 
                          onClick={() => setIsAddingNewAddress(true)}
                          className="w-full py-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl text-sm font-bold text-gray-400 hover:border-primary hover:text-primary transition-all flex flex-col items-center gap-2 mt-4"
                        >
                          <Plus size={24} />
                          Add Your Shipping Address
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">{editIndex !== null ? 'Edit Address' : 'New Address'}</h3>
                        <button onClick={resetForm} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-text-main dark:hover:text-white transition-colors">
                           <ArrowLeft size={18} />
                        </button>
                      </div>
                      
                      <div className="relative mb-6">
                        <div className="absolute left-5 top-5 text-gray-400 z-10">
                           {isSearching ? <Loader2 size={18} className="animate-spin" /> : <SearchIcon size={18} />}
                        </div>
                        <textarea 
                          autoFocus
                          value={addressInput}
                          onChange={(e) => handleAddressInputChange(e.target.value)}
                          className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl p-5 pl-14 text-sm font-medium transition-all min-h-[140px] outline-none"
                          placeholder="Search for your street/area or enter manually..."
                        />
                        
                        {/* Autocomplete Dropdown */}
                        {suggestions.length > 0 && (
                          <div ref={dropdownRef} className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden z-[60] border border-gray-200 dark:border-white/10">
                            {suggestions.map((s, i) => (
                              <button
                                key={i}
                                onClick={() => selectSuggestion(s)}
                                className="w-full text-left px-5 py-4 text-xs font-bold hover:bg-primary/5 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0 flex items-center gap-3 text-gray-600 dark:text-gray-300"
                              >
                                <MapPin size={14} className="text-primary shrink-0" />
                                <span className="truncate">{s}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={saveAddress}
                          disabled={!addressInput.trim()}
                          className="flex-2 bg-primary text-white py-4 rounded-xl text-sm font-bold disabled:opacity-30 transition-all shadow-lg shadow-primary/20"
                        >
                          {editIndex !== null ? 'Update Address' : 'Save Address'}
                        </button>
                        <button 
                          onClick={resetForm}
                          className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-4 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    disabled={!selectedAddress || isAddingNewAddress}
                    onClick={() => setCurrentStep('summary')}
                    className="w-full mt-10 py-5 bg-primary text-white rounded-2xl font-bold text-sm tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-30 active:scale-95 duration-200"
                  >
                    Continue to Summary
                  </button>
                </motion.div>
              )}

              {currentStep === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight mb-8">Review Order</h2>
                  
                  <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-200 dark:border-white/10 mb-8 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-sm">
                       <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <p className="text-gray-400 font-bold mb-1 uppercase tracking-wider text-[10px]">Shipping To</p>
                          <p className="font-bold text-text-main dark:text-white line-clamp-1">{selectedAddress}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setCurrentStep('address')}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors text-primary"
                    >
                       <Edit2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Items In Bag</h3>
                    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
                      {cart.map(item => (
                        <div key={item.id} className="p-5 flex gap-5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                           <div className="w-20 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                              <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                           </div>
                           <div className="flex-1 py-1">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="font-extrabold text-text-main dark:text-white text-base">{item.name}</h4>
                                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">Quantity: {item.quantity}</p>
                                 </div>
                                 <p className="font-extrabold text-text-main dark:text-white">{formatPrice(item.price * item.quantity, currency)}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="w-full mt-12 py-5 bg-primary text-white rounded-2xl font-bold text-sm tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                  >
                    Proceed to Payment
                  </button>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight mb-8">Payment Method</h2>
                  <div className="space-y-6">
                    <div className="p-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white rounded-[32px] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                         <CreditCard size={160} />
                      </div>
                      <div className="flex items-center justify-between mb-16 relative z-10">
                         <div className="w-12 h-10 bg-gradient-to-r from-amber-400 to-amber-200 rounded-lg shadow-inner" />
                         <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7bc.svg" className="h-4 brightness-0 invert" alt="pay" />
                      </div>
                      <div className="space-y-6 relative z-10">
                         <p className="text-lg font-mono tracking-[0.25em] text-white/90">**** **** **** 4242</p>
                         <div className="flex justify-between items-end">
                            <div>
                               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Card Holder</p>
                               <p className="text-sm font-bold uppercase tracking-widest">{user?.displayName || 'Customer Name'}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Expires</p>
                               <p className="text-sm font-bold font-mono tracking-widest">12/28</p>
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <button className="p-6 bg-white dark:bg-white/5 rounded-2xl border-2 border-primary shadow-lg shadow-primary/5 text-center transition-all">
                          <p className="text-sm font-bold text-text-main dark:text-white">Credit / Debit Card</p>
                          <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 italic">Verified Secure</p>
                       </button>
                       <button className="p-6 bg-white dark:bg-white/5 rounded-2xl border-2 border-transparent hover:border-gray-200 dark:hover:border-white/10 text-center transition-all group">
                          <p className="text-sm font-bold text-gray-500 group-hover:text-text-main dark:group-hover:text-white transition-colors">UPI / Wallet</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">GPay, PhonePe, PayTM</p>
                       </button>
                    </div>
                  </div>

                  <div className="mt-12 space-y-6">
                    <button
                      disabled={loading}
                      onClick={handlePlaceOrder}
                      className="group w-full py-5 bg-cta text-white rounded-2xl font-black text-sm tracking-[0.1em] uppercase shadow-2xl shadow-cta/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                      Confirm & Pay {formatPrice(total + (subtotal * 0.08), currency)}
                    </button>
                    <p className="text-center text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2">
                      <ShieldCheck size={14} className="text-green-500" />
                      Your data is protected with 256-bit encryption
                    </p>
                  </div>
                </motion.div>
              )}

              {currentStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="relative inline-block mb-10">
                     <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                     <div className="w-32 h-32 bg-green-500 text-white rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40 relative z-10 rotate-3 transform">
                        <Check size={64} strokeWidth={4} />
                     </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-text-main dark:text-white tracking-tighter mb-6">Order Success!</h2>
                  <p className="text-gray-500 font-bold max-w-sm mx-auto mb-12">We've received your order and are preparing it for shipment. You'll receive a confirmation email shortly.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Link to="/orders" className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform">Track Order</Link>
                    <Link to="/" className="flex-1 py-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all">Back to Home</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentStep !== 'success' && (
             <div className="lg:col-span-5">
                <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-gray-200 dark:border-white/10 shadow-xl lg:sticky lg:top-32">
                   <h2 className="text-lg font-extrabold text-text-main dark:text-white tracking-tight mb-8">Your Order</h2>
                   
                   <div className="space-y-4 mb-10">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 font-bold">Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                         <span className="text-text-main dark:text-white font-extrabold">{formatPrice(subtotal, currency)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 font-bold">Shipping</span>
                         <span className="text-green-500 font-extrabold uppercase text-[10px] tracking-wider">Free Delivery</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 font-bold">Estimated Tax</span>
                         <span className="text-text-main dark:text-white font-extrabold">{formatPrice(subtotal * 0.08, currency)}</span>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/10 my-4" />
                      <div className="flex justify-between items-end">
                         <span className="text-lg font-extrabold text-text-main dark:text-white">Order Total</span>
                         <div className="text-right">
                           <span className="text-3xl font-black text-primary tracking-tight">{formatPrice(total + (subtotal * 0.08), currency)}</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-4 pt-6 mt-6 border-t border-gray-100 dark:border-white/10">
                      <div className="flex items-start gap-3">
                         <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={16} />
                         <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                            Safe and Secure checkout guaranteed. We protect your data with SSL encryption.
                         </p>
                      </div>
                   </div>

                   {/* Payment Methods */}
                   <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 flex items-center justify-between grayscale opacity-30">
                      <img src="https://www.svgrepo.com/show/508728/visa.svg" className="h-4" alt="visa" />
                      <img src="https://www.svgrepo.com/show/508696/mastercard.svg" className="h-6" alt="mastercard" />
                      <img src="https://www.svgrepo.com/show/508712/paypal.svg" className="h-4" alt="paypal" />
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
