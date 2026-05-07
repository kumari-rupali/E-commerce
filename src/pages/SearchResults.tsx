import { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { Search, X, SlidersHorizontal, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../constants';

const RATINGS = [4, 3, 2, 1];
const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function SearchResults() {
  const { products } = useStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Relevance');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');

  const categoriesList = ['All', ...Object.values(CATEGORIES)];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory || product.tags?.includes(activeCategory);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesRating = product.rating >= minRating;
        const matchesAvailability = availability === 'all' || 
          (availability === 'in-stock' ? product.stock > 0 : product.stock === 0);

        return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesAvailability;
      })
      .sort((a, b) => {
        if (activeSort === 'Price: Low to High') return a.price - b.price;
        if (activeSort === 'Price: High to Low') return b.price - a.price;
        if (activeSort === 'Top Rated') return b.rating - a.rating;
        return 0; // Relevance mapping is default
      });
  }, [products, query, activeCategory, minPrice, maxPrice, minRating, activeSort]);

  const clearFilters = () => {
    setActiveCategory('All');
    setMinPrice(0);
    setMaxPrice(50000);
    setMinRating(0);
    setAvailability('all');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 lg:py-12">
        <BackButton />
        <div className="mb-12 border-b border-gray-50 pb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Search size={24} className="text-gray-400" />
            <h1 className="text-2xl md:text-4xl font-serif italic mb-0">
              Search Results for: <span className="text-sahrika-red">"{query}"</span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredProducts.length} items found
            </p>
            
            <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="text-black italic">Sort:</span>
              {SORT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => setActiveSort(option)}
                  className={cn(
                    "transition-colors hover:text-black",
                    activeSort === option ? "text-black underline underline-offset-4" : ""
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 h-fit sticky top-36">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
              <h2 className="text-xs font-black uppercase tracking-widest italic">Filter</h2>
              {(activeCategory !== 'All' || minPrice > 0 || maxPrice < 50000 || minRating > 0 || availability !== 'all') && (
                <button onClick={clearFilters} className="text-[10px] font-bold uppercase underline">Clear All</button>
              )}
            </div>

            {/* Availability Filter */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic">Availability</h3>
              <div className="space-y-4">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'in-stock', label: 'In Stock' },
                  { id: 'out-of-stock', label: 'Out of Stock' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === item.id}
                      onChange={() => setAvailability(item.id as any)}
                      className="w-4 h-4 accent-black border-gray-300"
                    />
                    <span className={cn(
                      "text-xs font-bold transition-colors uppercase tracking-widest",
                      availability === item.id ? "text-black" : "text-gray-400 group-hover:text-black"
                    )}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic">Category</h3>
              <div className="space-y-4">
                {categoriesList.map((cat) => (
                  <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="w-4 h-4 accent-black border-gray-300"
                    />
                    <span className={cn(
                      "text-xs font-bold transition-colors uppercase tracking-widest",
                      activeCategory === cat ? "text-black" : "text-gray-400 group-hover:text-black"
                    )}>
                      {cat.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic">Price</h3>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-gray-100 focus:border-black outline-none font-bold"
                      placeholder="Min"
                    />
                    <span className="text-gray-300">-</span>
                    <input 
                      type="number" 
                      value={maxPrice === 50000 ? '' : maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value) || 50000)}
                      className="w-full text-xs p-2 border border-gray-100 focus:border-black outline-none font-bold"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 italic">Product Rating</h3>
              <div className="space-y-4">
                {RATINGS.map((rating) => (
                  <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={minRating === rating}
                      onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                      className="w-4 h-4 accent-black rounded-none border-gray-300"
                    />
                    <div className="flex items-center text-[10px] font-bold text-gray-400 group-hover:text-black uppercase tracking-widest">
                      <span>{rating} Stars & UP</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-serif italic mb-4">No results found</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 max-w-md mx-auto">
                  We couldn't find anything matching your search and filters. Try adjusting your keywords or filters.
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={clearFilters}
                    className="bg-white border border-black text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest"
                  >
                    Clear Filters
                  </button>
                  <Link 
                    to="/products" 
                    className="inline-block bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest"
                  >
                    Back to Catalog
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* You Might Also Like Section */}
        {filteredProducts.length === 0 && (
          <section className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif italic mb-2">You Might Also Like</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Trending now</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
