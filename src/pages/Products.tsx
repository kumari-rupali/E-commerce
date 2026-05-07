import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal, Star, X, Grid, List as ListIcon, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';
import { useStore } from '../store/useStore';
import { cn, formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, SUBCATEGORIES } from '../constants';

const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function Products() {
  const { products, currency } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialSubcategory = searchParams.get('subcategory') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcategory);
  const [activeSort, setActiveSort] = useState('Newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const sub = searchParams.get('subcategory') || 'All';
    setActiveCategory(cat);
    setActiveSubcategory(sub);
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubcategory('All');
    setSearchParams(params => {
      params.set('category', cat);
      params.delete('subcategory');
      if (cat === 'All') params.delete('category');
      return params;
    });
  };

  const handleSubcategoryChange = (sub: string) => {
    setActiveSubcategory(sub);
    setSearchParams(params => {
      if (sub === 'All') {
        params.delete('subcategory');
      } else {
        params.set('subcategory', sub);
      }
      return params;
    });
  };
  
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const categoryMatch = activeCategory === 'All' || p.category === activeCategory || (p.tags && p.tags.includes(activeCategory));
        const subcategoryMatch = activeSubcategory === 'All' || p.subcategory === activeSubcategory;
        return categoryMatch && subcategoryMatch;
      })
      .sort((a, b) => {
        if (activeSort === 'Price: Low to High') return a.price - b.price;
        if (activeSort === 'Price: High to Low') return b.price - a.price;
        if (activeSort === 'Top Rated') return b.rating - a.rating;
        return 0;
      });
  }, [products, activeCategory, activeSubcategory, activeSort]);

  const categoriesList = ['All', ...Object.values(CATEGORIES)];
  const currentSubcategories = activeCategory !== 'All' ? (SUBCATEGORIES[activeCategory as keyof typeof SUBCATEGORIES] || []) : [];
  
  // Handle nested footwear subcategories
  const subcategoryItems = useMemo(() => {
    const items = Array.isArray(currentSubcategories) 
    ? currentSubcategories 
    : [...currentSubcategories.WOMENS, ...currentSubcategories.MENS];
    return Array.from(new Set(items));
  }, [currentSubcategories]);

  return (
    <div className="bg-bg-neutral min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
           <BackButton />
           <div className="flex items-center space-x-4">
              <div className="flex bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-1 shadow-sm">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-400 hover:text-primary")}
                 >
                   <Grid size={18} />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-400 hover:text-primary")}
                 >
                   <ListIcon size={18} />
                 </button>
              </div>
           </div>
        </div>

        {/* Header Section */}
        <header className="mb-12">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <h1 className="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-4 tracking-tight capitalize">
                {activeCategory === 'All' ? 'Our Collections' : `${activeCategory.replace('-', ' ')} Collection`}
              </h1>
              <p className="text-gray-500 font-medium max-w-2xl">
                Explore our curated selection of high-quality products. Filter by subcategory to find exactly what you need.
              </p>
           </motion.div>
        </header>

        {/* Filter Bar */}
        <div className="sticky top-[80px] md:top-[104px] z-40 bg-bg-neutral/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 mb-10 py-5">
           <div className="space-y-4">
             <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-3">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={cn(
                        "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                        activeCategory === cat 
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                          : "bg-white dark:bg-white/5 text-gray-500 border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary"
                      )}
                    >
                      {cat.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                <div className="flex items-center min-w-fit">
                   <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 shadow-sm">
                      <SlidersHorizontal size={14} className="text-gray-400" />
                      <select 
                        value={activeSort}
                        onChange={(e) => setActiveSort(e.target.value)}
                        className="bg-transparent text-sm font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer uppercase text-[10px] tracking-widest"
                      >
                         {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                   </div>
                </div>
             </div>

             {subcategoryItems.length > 0 && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
               >
                 <button
                    onClick={() => handleSubcategoryChange('All')}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                      activeSubcategory === 'All' 
                        ? "bg-text-main text-white border-text-main" 
                        : "bg-gray-100 dark:bg-white/5 text-gray-400 border-transparent hover:bg-gray-200"
                    )}
                  >
                    All {activeCategory.replace('-', ' ')}
                  </button>
                 {subcategoryItems.map((sub) => (
                   <button
                     key={sub}
                     onClick={() => handleSubcategoryChange(sub)}
                     className={cn(
                       "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                       activeSubcategory === sub 
                         ? "bg-text-main text-white border-text-main" 
                         : "bg-gray-100 dark:bg-white/5 text-gray-400 border-transparent hover:bg-gray-200"
                     )}
                   >
                     {sub}
                   </button>
                 ))}
               </motion.div>
             )}
           </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className={cn(
               "grid gap-8",
               viewMode === 'grid' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 max-w-4xl mx-auto"
            )}
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center bg-white dark:bg-white/5 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-sm px-6">
             <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-300" />
             </div>
             <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4 italic">No products found</h3>
             <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm font-medium">We couldn't find any products matching your current selected category or filters.</p>
             <button 
               onClick={() => handleCategoryChange('All')}
               className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-primary/20"
             >
                Reset Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
