import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-darkBg text-white min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 group">
            Our <span className="text-neonRed neon-text-red group-hover:text-neonBlue transition-colors duration-1000">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-8">
            At Strike Supplements, we believe in creating tools for warriors. We formulate the most potent, science-backed performance enhancers on the market.
          </p>
          <div className="w-32 h-1 bg-neonBlue/50 mx-auto rounded-full neon-box-blue" />
        </motion.div>

        {/* Story Section */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden glass-panel aspect-[4/3] relative border border-white/5 group"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-neonBlue/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Gym" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white">Forged in Iron</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Strike was born in 2024 out of frustration. The market was flooded with under-dosed proprietary blends, artificial fillers, and fake promises. We wanted supplements that actually matched the intensity of our training.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              So we built them ourselves. Working alongside clinical nutritionists and elite strength coaches, we developed a baseline of core products that are fully transparent, clinically dosed, and absurdly effective.
            </p>
            <div className="flex items-center gap-4 text-neonBlue font-bold tracking-widest uppercase">
              <span>No proprietary blends.</span> <span>No BS.</span>
            </div>
            <p className="text-xl font-bold uppercase text-white/50 pt-6 border-t border-white/10">Only Results.</p>
          </motion.div>
        </section>

        {/* Values Grid */}
        <section>
          <div className="text-center mb-16">
             <h2 className="text-3xl font-display font-black uppercase tracking-widest mb-4">Core Principles</h2>
             <p className="text-gray-400">The pillars that define every product we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transparency", icon: Target, desc: "Fully disclosed labels. You know exactly what you're putting in your body.", color: "text-neonBlue" },
              { title: "Efficacy", icon: Zap, desc: "Clinical dosages of patented ingredients. No pixie-dusting allowed.", color: "text-neonRed" },
              { title: "Purity", icon: ShieldCheck, desc: "Third-party tested for heavy metals and banned substances.", color: "text-green-400" },
              { title: "Community", icon: Users, desc: "Built by athletes, for athletes. We're in the trenches with you.", color: "text-purple-400" }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group cursor-default"
              >
                <div className={`mb-6 p-4 bg-black/50 rounded-xl inline-block ${value.color} group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-${value.color}/20`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4 group-hover:text-neonBlue transition-colors">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;