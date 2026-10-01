export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'customer' | 'seller';
  address?: string;
  addresses?: string[];
  avatar?: string;
  bonusPoints?: number;
  phone?: string;
  is2FAEnabled?: boolean;
  savedCards?: { id: string; last4: string; brand: string; expiry: string }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  tags?: string[];
  image: string;
  sellerId: string;
  stock: number;
  rating: number;
  reviewCount: number;
  colors?: { id: string; name: string; image: string; price?: number }[];
  sizes?: { id: string; name: string; price?: number }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: { id: string; name: string; image: string; price?: number };
  selectedSize?: { id: string; name: string; price?: number };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingNumber?: string;
  shippingAddress?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
