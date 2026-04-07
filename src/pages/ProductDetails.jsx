import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, Check, Shield, Zap, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../hooks/useToast';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const toast = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkBg text-white">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black uppercase mb-4 text-neonRed">Product Not Found</h2>
          <Link to="/shop" className="text-neonBlue hover:text-white transition-colors underline uppercase font-bold tracking-widest flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Success! Added ${quantity} ${product.name} to cart.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-darkBg text-white py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-neonBlue transition-colors mb-8 font-bold uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          
          {/* Product Image */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden glass-panel aspect-square relative group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider border border-white/10">
                {product.category}
              </span>
            </div>
            <div className="absolute top-6 right-6 z-20 flex items-center bg-neonBlue/20 backdrop-blur-md border border-neonBlue/30 text-white text-xs font-bold px-4 py-2 rounded-full space-x-1">
              <Star className="w-4 h-4 text-neonBlue fill-neonBlue" />
              <span>{product.rating} / 5.0</span>
            </div>
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-display font-black uppercase text-white mb-4 leading-tight"
            >
              {product.name}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black text-neonBlue mb-6 flex items-center"
            >
              <span className="text-xl mr-1">₹</span>{product.price}
            </motion.p>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Description
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {product.description}
              </p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 mb-8 border-y border-white/10 py-6">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-4">Quantity</h3>
               <div className="flex items-center border p-1 rounded-full border-white/20 bg-white/5 space-x-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors" disabled={quantity <= 1}>
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
               </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-neonBlue hover:bg-white text-black font-black uppercase text-lg tracking-widest py-5 px-8 rounded-xl neon-box-blue hover:neon-box-blue transition-all flex items-center justify-center gap-3 shadow-lg group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:-rotate-12 transition-transform" /> Add to Arsenal
            </motion.button>

            <ul className="mt-8 space-y-3 text-sm text-gray-400 font-medium">
              <li className="flex items-center gap-2"><Check className="text-neonBlue w-4 h-4" /> Lab Tested Ingredients</li>
              <li className="flex items-center gap-2"><Check className="text-neonBlue w-4 h-4" /> Free Shipping over ₹3000</li>
              <li className="flex items-center gap-2"><Check className="text-neonBlue w-4 h-4" /> 30-Day Money Back Guarantee</li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <div className="flex items-center gap-3 mb-10">
              <Zap className="text-neonBlue w-6 h-6" />
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-widest">Recommended Gear</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;