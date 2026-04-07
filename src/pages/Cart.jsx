import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import CartItem from '../components/CartItem';
import { useToast } from '../hooks/useToast';

const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCartStore();
  const toast = useToast();
  const total = getCartTotal();

  const handleCheckout = () => {
    if(cart.length === 0) return;
    toast.success('Order placed successfully! (Mock Checkout)');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-darkBg text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
          <ShoppingBag className="w-10 h-10 text-neonBlue" />
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-wider text-white">Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-20 glass-panel rounded-3xl border border-white/5"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md text-center">Looks like you haven't added any supplements to your arsenal yet.</p>
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-neonBlue text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors flex items-center gap-2"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg text-gray-400 font-bold uppercase tracking-widest">{cart.length} Items</h3>
                <button 
                  onClick={() => { clearCart(); toast.info('Cart cleared'); }}
                  className="text-sm text-gray-500 hover:text-neonRed transition-colors underline underline-offset-4"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              <div className="glass-panel p-8 rounded-2xl sticky top-28 border border-white/10">
                <h3 className="text-xl font-display font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="font-bold">{total > 3000 ? 'Free' : '₹149'}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Taxes</span>
                    <span className="font-bold">₹{Math.round(total * 0.18)}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                  <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                  <span className="text-4xl font-black text-neonBlue">
                    ₹{Math.round(total + (total > 3000 ? 0 : 149) + (total * 0.18))}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-5 bg-neonBlue text-black font-black uppercase tracking-widest rounded-xl hover:bg-white flex items-center justify-center gap-3 transition-colors neon-box-blue hover:neon-box-blue duration-300"
                >
                  Secure Checkout <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-gray-500 text-center mt-6 flex items-center justify-center gap-2">
                  100% Secure Checkout process
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;