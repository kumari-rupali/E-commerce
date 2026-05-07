import { Outlet, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Bell } from 'lucide-react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();
  const { theme } = useStore();
  const isCheckout = location.pathname.includes('/checkout');

  useEffect(() => {
    // Apply theme class to document root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (isCheckout) return;
    // Simulate a push notification for new arrivals
    const timer = setTimeout(() => {
      toast("New Drop Alert!", {
        description: "The 2026 Winter Collection just arrived. Check it out!",
        action: {
          label: "View",
          onClick: () => window.location.href = "/products",
        },
      });
    }, 10000); // 10 seconds in
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-neutral dark:bg-black font-sans text-text-main dark:text-white selection:bg-primary/20 selection:text-primary">
      <Toaster position="bottom-right" />
      {!isCheckout && <Navbar />}
      <main>
        <Outlet />
      </main>
      
      {/* Simulated Notification Toggle for Demo */}
      {!isCheckout && (
        <button 
          onClick={() => toast.success("Flash Sale: 50% OFF on all accessories for the next 2 hours!")}
          className="fixed bottom-10 left-10 p-4 bg-yellow-400 rounded-full shadow-2xl z-50 hover:scale-110 transition-all group"
        >
          <Bell className="group-hover:animate-bounce" />
        </button>
      )}

      {!isCheckout && <Footer />}
    </div>
  );
}
