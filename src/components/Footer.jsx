import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Globe, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 shadow-lg shadow-neonBlue/5">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <Activity className="w-8 h-8 text-neonBlue" />
              <span className="text-2xl font-display font-black tracking-wider uppercase text-white">STRIKE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elevating human performance through science-backed supplementation and uncompromising quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-white/10 rounded-full text-gray-400 hover:text-neonBlue hover:border-neonBlue transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 border border-white/10 rounded-full text-gray-400 hover:text-neonBlue hover:border-neonBlue transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 border border-white/10 rounded-full text-gray-400 hover:text-neonBlue hover:border-neonBlue transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Protein', 'Pre-Workout', 'Creatine', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-gray-400 hover:text-neonBlue text-sm transition-colors flex items-center group">
                    <span className="w-2 h-[2px] bg-neonBlue mr-2 opacity-0 transition-all group-hover:opacity-100 group-hover:w-4"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Athletes', 'Wholesale', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item.toLowerCase() === 'contact' ? '/contact' : '/about'} className="text-gray-400 hover:text-neonBlue text-sm transition-colors flex items-center group">
                    <span className="w-2 h-[2px] bg-neonBlue mr-2 opacity-0 transition-all group-hover:opacity-100 group-hover:w-4"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all text-white placeholder-gray-500"
              />
              <button 
                type="submit" 
                className="w-full bg-white hover:bg-neonBlue text-black font-bold uppercase text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Join the Squad <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Strike Supplements. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;