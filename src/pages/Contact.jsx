import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all fields.");
    }
    toast.success("Message sent! We'll get back to you shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-darkBg text-white min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 text-white"
          >
             Get in <span className="text-neonBlue neon-text-blue">Touch</span>
          </motion.h1>
          <p className="text-gray-400 text-lg uppercase tracking-widest">Questions? We are here for the squad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-neonBlue/10 opacity-0 group-hover:opacity-100 rounded-full mix-blend-screen filter blur-3xl transition-opacity duration-1000 -mr-20 -mt-20"></div>
             
             <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-white flex items-center gap-3">
               <MessageSquare className="w-6 h-6 text-neonBlue" /> Send a Message
             </h2>
             
             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               <div>
                 <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                 <input 
                   type="text" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all"
                   placeholder="John Doe"
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all"
                   placeholder="john@example.com"
                 />
               </div>
               <div>
                 <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Message</label>
                 <textarea 
                   rows="5"
                   value={formData.message}
                   onChange={(e) => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all resize-none"
                   placeholder="How can we help?"
                 ></textarea>
               </div>
               <button 
                 type="submit"
                 className="w-full bg-white hover:bg-neonBlue text-black font-black uppercase tracking-widest py-4 rounded-xl transition-colors mt-4 shadow-lg hover:neon-box-blue"
               >
                 Fire Away
               </button>
             </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display font-black uppercase text-white mb-6">Hit the Headquarters</h2>
              <p className="text-gray-400 leading-relaxed max-w-md text-lg">
                Whether you need supplement advice, have an issue with your order, or just want to tell us about your latest PR – our team is ready.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-neonBlue group-hover:text-black transition-colors text-neonBlue border border-white/10">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Email Us</h4>
                  <a href="mailto:support@strikesupps.com" className="text-xl font-medium text-white hover:text-neonBlue transition-colors group-hover:neon-text-blue">
                    support@strikesupps.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-neonBlue group-hover:text-black transition-colors text-neonBlue border border-white/10">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Call Us</h4>
                  <p className="text-xl font-medium text-white hover:text-neonBlue transition-colors group-hover:neon-text-blue">
                    +1 (800) STRIKE-UP
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-5pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-neonBlue group-hover:text-black transition-colors text-neonBlue border border-white/10">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Location</h4>
                  <p className="text-xl font-medium text-white hover:text-neonBlue transition-colors">
                    123 Iron Street<br/>Austin, TX 33301
                  </p>
                </div>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;