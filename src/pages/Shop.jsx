import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    switch (sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      default: // featured uses id as pseudo-featured
        return result.sort((a, b) => a.id - b.id);
    }
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-darkBg text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-black uppercase tracking-wider text-white mb-6 md:mb-0"
          >
            The <span className="text-neonBlue neon-text-blue">Armory</span>
          </motion.h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative glass-panel rounded-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border-1 border-transparent focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all text-white placeholder-gray-500 font-medium"
              />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden glass-panel px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.aside
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:w-64 flex-shrink-0 flex flex-col gap-8 md:block overflow-hidden md:overflow-visible"
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Categories
                  </h3>
                  <div className="flex flex-col gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => { setSelectedCategory(category); setIsFilterOpen(false); }}
                        className={`text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium uppercase tracking-wider
                          ${selectedCategory === category ? 'bg-neonBlue/20 text-neonBlue border border-neonBlue/50' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                        `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Sort By
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neonBlue transition-colors appearance-none cursor-pointer"
                  >
                    <option value="featured">Featured Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 glass-panel rounded-2xl border border-white/5 text-center">
                <Search className="w-16 h-16 text-gray-600 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
                <p className="text-gray-400">We couldn't find any products matching your search criteria. Try adjusting your filters.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSortBy('featured'); }}
                  className="mt-6 px-6 py-2 bg-neonBlue/10 hover:bg-neonBlue/20 text-neonBlue border border-neonBlue/30 rounded-full font-bold uppercase tracking-widest transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;