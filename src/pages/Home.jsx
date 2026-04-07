import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { products } from '../data/products';

const ProductCard = React.lazy(() => import('../components/ProductCard'));

const Home = () => {
  const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 4);

  return (
    <div className="min-h-screen bg-darkBg text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Gym Hero Background" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkBg/60 via-darkBg/80 to-darkBg"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            Build Your <span className="text-neonBlue neon-text-blue">Strength</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            Elite supplements meticulously formulated to push your body beyond limits and conquer every PR.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-neonBlue text-black font-bold uppercase tracking-wider rounded-lg neon-box-blue hover:bg-white hover:text-black hover:neon-box-blue transition-all w-full sm:w-auto text-center"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg hover:border-white hover:bg-white/5 transition-all w-full sm:w-auto text-center"
            >
              Discover Strike
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Brands / Logos */}
      <div className="border-y border-white/5 bg-black/40 py-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
          {["PUMP", "WHEY+", "STARK", "CREA-PRO", "BCAA-X"].map((brand, i) => (
            <h5 key={i} className="text-2xl font-display font-bold tracking-widest text-white/40">{brand}</h5>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <h2 className="text-sm font-bold text-neonBlue uppercase tracking-widest mb-2 neon-text-blue">Shop By</h2>
            <h3 className="text-4xl md:text-5xl font-display font-black uppercase text-white">Categories</h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Protein", count: "8 Products", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9" },
            { name: "Pre-Workout", count: "5 Products", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d" },
            { name: "Creatine", count: "4 Products", img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba" },
            { name: "Accessories", count: "12 Products", img: "https://images.unsplash.com/photo-1584863265045-f8d223f66870" }
          ].map((cat, i) => (
            <Link key={i} to="/shop" className="group relative h-80 rounded-2xl overflow-hidden glass-panel">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors z-10"></div>
              <img src={`${cat.img}?w=500&q=80`} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <h4 className="text-2xl font-bold font-display text-white uppercase group-hover:text-neonBlue transition-colors">{cat.name}</h4>
                <p className="text-gray-300 text-sm flex items-center mt-2 group-hover:translate-x-2 transition-transform">
                  {cat.count} <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-black/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-sm font-bold text-neonRed uppercase tracking-widest mb-2 neon-text-red">Top Rated</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black uppercase text-white">Elite Formulas</h3>
            </motion.div>
            <Link to="/shop" className="text-neonBlue hover:text-white uppercase font-bold tracking-widest flex items-center gap-2 mt-4 md:mt-0 transition-colors">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Suspense fallback={<div className="h-64 rounded-2xl bg-white/5 animate-pulse col-span-full"></div>}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase">Built By Athletes</h2>
          <div className="w-24 h-1 bg-neonBlue mx-auto mt-6 rounded-full neon-box-blue"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Marcus J.",
              role: "Powerlifter",
              text: "The Inferno Pre-workout is absolutely unmatched. Laser focus without the crash. My squat PR went up 20lbs in a month.",
            },
            {
              name: "Sarah W.",
              role: "CrossFit Competitor",
              text: "Titan Whey Protein mixes like a dream and doesn't upset my stomach. Quality is top-notch, highly recommend for recovery.",
            },
            {
              name: "David L.",
              role: "Bodybuilder",
              text: "I trust Strike for all my supplement needs. Their Creatine is pure and the Liquid Chalk keeps my grip locked on heavy deadlift days.",
            }
          ].map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl relative"
            >
              <Quote className="w-12 h-12 text-white/5 absolute top-4 right-4" />
              <div className="flex text-neonBlue mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{test.text}"</p>
              <div className="mt-auto">
                <h4 className="text-white font-bold uppercase tracking-wider">{test.name}</h4>
                <span className="text-xs text-gray-500 uppercase tracking-widest">{test.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="relative py-24 mb-10 overflow-hidden rounded-3xl mx-4 lg:mx-auto max-w-7xl inset-0 border border-neonBlue/20 bg-[#0a0a14]">
        <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4">
               Stay <span className="text-neonBlue neon-text-blue">Fueled</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">Join the Strike Squad for exclusive drops, early product access, and 15% off your first order.</p>
          </div>
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
              <input type="email" placeholder="YOUR EMAIL ADDRESS" className="w-full bg-black/50 border border-white/20 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all tracking-wider placeholder-gray-600" />
              <button className="bg-neonBlue hover:bg-white text-black font-bold uppercase px-8 rounded-lg hover:neon-box-blue transition-all tracking-widest flex items-center justify-center">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;