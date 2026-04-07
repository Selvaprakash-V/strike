import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../hooks/useToast';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl overflow-hidden group relative flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square h-64">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
            {product.category}
          </span>
        </div>

        {/* Rating tag */}
        <div className="absolute top-4 right-4 z-20 flex items-center bg-neonBlue/20 backdrop-blur-md border border-neonBlue/30 text-white text-xs font-bold px-3 py-1 rounded-full space-x-1">
          <Star className="w-3 h-3 text-neonBlue fill-neonBlue" />
          <span>{product.rating}</span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-neonBlue transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-white">₹{product.price}</span>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-12 h-12 flex items-center justify-center bg-white text-black hover:bg-neonBlue hover:text-white rounded-full transition-colors duration-300 neon-box-blue"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;