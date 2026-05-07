import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: 'USD' | 'INR') {
  const rate = 83; // Fixed rate for demo
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price * (currency === 'INR' && !price.toString().includes('.') ? 1 : 1)); 
    // Usually mock prices are in USD, so we convert if needed. 
    // For this app, let's assume base price in store is always "Base Unit" 
    // and we'll just show it differently or convert it.
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / rate);
}

export const conversionRate = 83;
