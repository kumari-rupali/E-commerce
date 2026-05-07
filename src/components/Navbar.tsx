import React, { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Store, ShoppingBag, Bell, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../constants';

export default function Navbar() {
  const { cart, wishlist, user, notifications, markNotificationsAsRead, theme, setTheme } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navCategories = [
    { label: 'Womens', id: CATEGORIES.WOMENS },
    { label: 'Mens', id: CATEGORIES.MENS },
    { label: 'Footwear', id: CATEGORIES.FOOTWEAR },
    { label: 'Accessories', id: CATEGORIES.ACCESSORIES },
    { label: 'Beauty', id: CATEGORIES.BEAUTY },
    { label: 'Sale', id: CATEGORIES.SALE, highlight: true },
  ];
  
  return (
    <div className="sticky top-0 z-50">
      {/* Top Promotional Bar */}
      <div 
        className="bg-primary text-white text-[11px] font-medium py-2 px-4 text-center tracking-wide"
      >
        Free Shipping on orders over ₹699+ | Extra 15% off your first order
      </div>
      
      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-0 bg-white dark:bg-black z-[60] flex items-center px-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearch} className="w-full relative flex items-center gap-3">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 outline-none placeholder:text-gray-300"
              placeholder="Search products..."
            />
            <button 
              type="button" 
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary shrink-0 transition-transform hover:scale-105">
            SAHRIKA
          </Link>

          {/* Nav Categories - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-6">
            {navCategories.map((cat) => (
              <Link 
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={cn(
                  "text-[11px] font-black uppercase tracking-[0.2em] transition-colors relative group py-2",
                  cat.highlight ? "text-sahrika-red" : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {cat.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Search bar middle (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm items-center relative group">
            <div className="absolute left-4 text-gray-400 group-focus-within:text-primary transition-colors">
              <Search size={16} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-primary/30 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none transition-all dark:text-white dark:focus:bg-black"
              placeholder="Search for items..."
            />
          </form>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-2 md:space-x-5">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>

            <button 
              onClick={() => setIsMobileSearchOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 md:hidden"
            >
              <Search size={18} strokeWidth={2} />
            </button>
            
            <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 relative">
              <Heart size={18} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold ring-2 ring-white dark:ring-black">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 relative group">
              <ShoppingBag size={18} strokeWidth={2} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-cta text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold ring-2 ring-white dark:ring-black">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-5 h-5 rounded-full object-cover ring-1 ring-gray-200 dark:ring-white/20" />
              ) : (
                <User size={18} strokeWidth={2} />
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
