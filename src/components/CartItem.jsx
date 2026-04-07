import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../hooks/useToast';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const toast = useToast();

  const handleDecrease = () => {
    if(item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.error(`${item.name} removed from cart`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, duration: 0.2 }}
      className="glass-panel p-4 rounded-xl flex items-center mb-4 relative"
    >
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-6 flex-grow flex flex-col justify-center space-y-2">
        <h3 className="text-lg flex justify-between font-display font-bold text-white group cursor-pointer transition-colors hover:text-neonBlue">
          <span className="line-clamp-1 pr-4">{item.name}</span>
          <span className="text-neonBlue">₹{item.price}</span>
        </h3>
        <p className="text-sm text-gray-400 capitalize">{item.category}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 border border-white/10 rounded-full px-3 py-1 bg-white/5">
            <button 
              onClick={handleDecrease}
              className="text-gray-400 hover:text-neonBlue transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
            <button 
              onClick={handleIncrease}
              className="text-gray-400 hover:text-neonBlue transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-lg font-black text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={handleRemove}
        className="absolute top-4 right-4 text-gray-500 hover:text-neonRed transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default CartItem;