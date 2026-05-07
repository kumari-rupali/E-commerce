import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Product, CartItem } from '../types';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedColor?: any, selectedSize?: any) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  currency: 'USD' | 'INR';
  setCurrency: (currency: 'USD' | 'INR') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
  notifications: { id: string; text: string; time: string; read: boolean }[];
  markNotificationsAsRead: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      cart: [],
      products: [],
      recentlyViewed: [],
      notifications: [
        { id: '1', text: 'Welcome to SAHRIKA! Enjoy 15% off your first order.', time: '2h ago', read: false },
        { id: '2', text: 'Flash Sale! Up to 70% off ends in 4 hours.', time: '5h ago', read: false },
        { id: '3', text: 'New summer collection is now live!', time: '1d ago', read: true },
      ],
      setProducts: (products) => set({ products }),
      addProduct: (product) => set({ products: [product, ...get().products] }),
      updateProduct: (product) => set({
        products: get().products.map(p => p.id === product.id ? product : p)
      }),
      deleteProduct: (productId) => set({
        products: get().products.filter(p => p.id !== productId)
      }),
      addToRecentlyViewed: (productId) => {
        const current = get().recentlyViewed;
        if (current[0] === productId) return;
        const filtered = current.filter(id => id !== productId);
        set({ recentlyViewed: [productId, ...filtered].slice(0, 10) });
      },
      markNotificationsAsRead: () => {
        set({ notifications: get().notifications.map(n => ({ ...n, read: true })) });
      },
      addToCart: (product, selectedColor, selectedSize) => {
        const cart = get().cart;
        const cartItemId = `${product.id}-${selectedColor?.id || 'default'}-${selectedSize?.id || 'default'}`;
        
        const existingItem = cart.find((item) => {
          const itemVariantId = `${item.id}-${item.selectedColor?.id || 'default'}-${item.selectedSize?.id || 'default'}`;
          return itemVariantId === cartItemId;
        });

        if (existingItem) {
          set({
            cart: cart.map((item) => {
              const itemVariantId = `${item.id}-${item.selectedColor?.id || 'default'}-${item.selectedSize?.id || 'default'}`;
              return itemVariantId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item;
            }),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1, selectedColor, selectedSize }] });
        }
      },
      removeFromCart: (cartItemId) =>
        set({ cart: get().cart.filter((item) => {
          const id = `${item.id}-${item.selectedColor?.id || 'default'}-${item.selectedSize?.id || 'default'}`;
          return id !== cartItemId;
        }) }),
      updateQuantity: (cartItemId, quantity) =>
        set({
          cart: get().cart.map((item) => {
            const id = `${item.id}-${item.selectedColor?.id || 'default'}-${item.selectedSize?.id || 'default'}`;
            return id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item;
          }),
        }),
      clearCart: () => set({ cart: [] }),
      wishlist: [],
      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((item) => item.id === product.id);
        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },
      isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),
      currency: 'INR',
      setCurrency: (currency) => set({ currency }),
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'trendify-storage',
    }
  )
);
