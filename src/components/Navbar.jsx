import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, Activity } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore(state => state.getCartCount());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-darkBg/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <Activity className="w-8 h-8 text-neonBlue group-hover:neon-text-blue transition-all" />
            <span className="text-2xl font-display font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-neonBlue group-hover:to-white transition-all">STRIKE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-neonBlue neon-text-blue' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative group cursor-pointer p-2">
              <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-neonRed transition-colors" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-neonRed text-white text-xs font-bold rounded-full transform translate-x-1/4 -translate-y-1/4"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-darkCard/95 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex flex-col px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium p-2 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-white/5 text-neonBlue' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;