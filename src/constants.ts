import { Product } from './types';

export const CATEGORIES = {
  WOMENS: 'womens',
  MENS: 'mens',
  SALE: 'sale',
  FOOTWEAR: 'footwear',
  ACCESSORIES: 'accessories',
  BEAUTY: 'beauty',
  BEST_SELLER: 'best-seller',
  NEW_ARRIVALS: 'new-arrivals'
} as const;

export const SUBCATEGORIES = {
  [CATEGORIES.WOMENS]: ['jeans', 'jeggings', 'kurti', 'tops', 'tshirts'],
  [CATEGORIES.MENS]: ['jeans', 'shirts', 'kurta', 'tshirt', 'track pants', 'denim', 'pants'],
  [CATEGORIES.FOOTWEAR]: {
    WOMENS: ['heels', 'flats', 'shoes', 'ballerinas', 'regular wear'],
    MENS: ['shoes', 'sandal', 'slipper', 'crocs', 'casual', 'sports']
  },
  [CATEGORIES.ACCESSORIES]: ['innerwear', 'travelpouch', 'bags', 'socks', 'caps', 'belts', 'brooch', 'hanky', 'jewelry'],
  [CATEGORIES.BEAUTY]: ['face', 'body', 'nail', 'hand', 'foot', 'hair', 'lip', 'eye', 'intimate area']
};

export const MOCK_PRODUCTS: Product[] = [
  // Best Sellers
  {
    id: 'bs1',
    name: 'Silk Embroidered Kurti',
    description: 'Elegant silk kurti with intricate hand embroidery.',
    price: 1899,
    category: CATEGORIES.WOMENS,
    subcategory: 'kurti',
    tags: [CATEGORIES.BEST_SELLER],
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80',
    sellerId: 's1',
    stock: 50,
    rating: 4.9,
    reviewCount: 450,
    colors: [
      { id: 'c1', name: 'Emerald Green', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80' },
      { id: 'c2', name: 'Ruby Red', image: 'https://images.unsplash.com/photo-1539109132314-34a936699561?w=800&q=80', price: 1999 },
    ],
    sizes: [
      { id: 's', name: 'S' },
      { id: 'm', name: 'M' },
      { id: 'l', name: 'L' },
      { id: 'xl', name: 'XL', price: 2049 },
    ]
  },
  {
    id: 'bs2',
    name: 'Classic White Linen Shirt',
    description: 'Breathable premium linen shirt for everyday comfort.',
    price: 1299,
    category: CATEGORIES.MENS,
    subcategory: 'shirts',
    tags: [CATEGORIES.BEST_SELLER],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    sellerId: 's2',
    stock: 75,
    rating: 4.8,
    reviewCount: 320
  },
  // New Arrivals
  {
    id: 'na1',
    name: 'High-Rise Flare Jeans',
    description: 'Trendy high-waisted flare jeans with a light wash.',
    price: 2499,
    category: CATEGORIES.WOMENS,
    subcategory: 'jeans',
    tags: [CATEGORIES.NEW_ARRIVALS],
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    sellerId: 's1',
    stock: 30,
    rating: 4.5,
    reviewCount: 15,
    colors: [
      { id: 'lc', name: 'Light Cyan', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80' },
      { id: 'db', name: 'Deep Blue', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', price: 2699 },
    ],
    sizes: [
      { id: '28', name: '28' },
      { id: '30', name: '30' },
      { id: '32', name: '32' },
      { id: '34', name: '34', price: 2599 },
    ]
  },
  // Mens
  {
    id: 'm1',
    name: 'Cotton Polo T-Shirt',
    description: 'Solid color polo t-shirt in soft organic cotton.',
    price: 899,
    category: CATEGORIES.MENS,
    subcategory: 'tshirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    sellerId: 's2',
    stock: 100,
    rating: 4.6,
    reviewCount: 180
  },
  // Footwear
  {
    id: 'f1',
    name: 'Stiletto Heels',
    description: 'Chic pointed-toe stiletto heels for formal occasions.',
    price: 2999,
    category: CATEGORIES.FOOTWEAR,
    subcategory: 'heels',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    sellerId: 's1',
    stock: 20,
    rating: 4.7,
    reviewCount: 95
  },
  // Beauty
  {
    id: 'b1',
    name: 'Hydrating Face Serum',
    description: 'Vitamin C and Hyaluronic Acid serum for glowing skin.',
    price: 599,
    category: CATEGORIES.BEAUTY,
    subcategory: 'face',
    image: 'https://images.unsplash.com/photo-1620916566398-39f11438784e?w=800&q=80',
    sellerId: 's3',
    stock: 150,
    rating: 4.8,
    reviewCount: 610
  },
  // Sale
  {
    id: 's1',
    name: 'Duffel Travel Bag',
    description: 'Spacious water-resistant travel duffel bag.',
    price: 1499,
    category: CATEGORIES.ACCESSORIES,
    subcategory: 'bags',
    tags: [CATEGORIES.SALE],
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
    sellerId: 's2',
    stock: 45,
    rating: 4.4,
    reviewCount: 130
  },
  // Additional Products for deep categorization
  {
    id: 'w2',
    name: 'Floral Print Kurti',
    description: 'Beautiful rayon kurti with floral prints for daily wear.',
    price: 799,
    category: CATEGORIES.WOMENS,
    subcategory: 'kurti',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    sellerId: 's1',
    stock: 60,
    rating: 4.4,
    reviewCount: 88
  },
  {
    id: 'w3',
    name: 'Distressed Skinny Jeggings',
    description: 'Super stretchable jeggings with distressed look.',
    price: 1299,
    category: CATEGORIES.WOMENS,
    subcategory: 'jeggings',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
    sellerId: 's1',
    stock: 40,
    rating: 4.5,
    reviewCount: 56
  },
  {
    id: 'm2',
    name: 'Slim Fit Denim Jeans',
    description: 'Classic blue slim fit denim jeans for men.',
    price: 1999,
    category: CATEGORIES.MENS,
    subcategory: 'denim',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    sellerId: 's2',
    stock: 80,
    rating: 4.7,
    reviewCount: 112
  },
  {
    id: 'm3',
    name: 'Traditional Cotton Kurta',
    description: 'Ethnic cotton kurta for festivals and ceremonies.',
    price: 1499,
    category: CATEGORIES.MENS,
    subcategory: 'kurta',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    sellerId: 's2',
    stock: 35,
    rating: 4.6,
    reviewCount: 42
  },
  {
    id: 'f2',
    name: 'Comfortable Ballet Flats',
    description: 'Classic design ballet flats for all-day comfort.',
    price: 999,
    category: CATEGORIES.FOOTWEAR,
    subcategory: 'ballerinas',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    sellerId: 's1',
    stock: 55,
    rating: 4.5,
    reviewCount: 74
  },
  {
    id: 'f3',
    name: 'Casual Loafers',
    description: 'Versatile casual loafers for men.',
    price: 1899,
    category: CATEGORIES.FOOTWEAR,
    subcategory: 'casual',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    sellerId: 's2',
    stock: 40,
    rating: 4.3,
    reviewCount: 38
  },
  {
    id: 'a1',
    name: 'Gold Plated Jewelry Set',
    description: 'Elegant jewelry set including necklace and earrings.',
    price: 2499,
    category: CATEGORIES.ACCESSORIES,
    subcategory: 'jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    sellerId: 's3',
    stock: 25,
    rating: 4.9,
    reviewCount: 65
  },
  {
    id: 'a2',
    name: 'Leather Belt',
    description: 'Premium leather belt with metal buckle.',
    price: 699,
    category: CATEGORIES.ACCESSORIES,
    subcategory: 'belts',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    sellerId: 's2',
    stock: 120,
    rating: 4.4,
    reviewCount: 92
  },
  {
    id: 'b2',
    name: 'Matte Liquid Lipstick',
    description: 'Long-lasting matte liquid lipstick in various shades.',
    price: 499,
    category: CATEGORIES.BEAUTY,
    subcategory: 'lip',
    image: 'https://images.unsplash.com/photo-1586776192181-e0099.jpg?w=800&q=80',
    sellerId: 's3',
    stock: 200,
    rating: 4.6,
    reviewCount: 245
  },
  {
    id: 'b3',
    name: 'Herbal Hair Oil',
    description: 'Nourishing herbal hair oil for stronger hair.',
    price: 349,
    category: CATEGORIES.BEAUTY,
    subcategory: 'hair',
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=800&q=80',
    sellerId: 's3',
    stock: 180,
    rating: 4.7,
    reviewCount: 156
  }
];
