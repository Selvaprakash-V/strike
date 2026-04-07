import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../hooks/useToast';

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-neonBlue" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-neonRed" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`
              glass-panel flex items-center p-4 rounded-lg shadow-lg pointer-events-auto
              ${toast.type === 'error' ? 'border-neonRed/50' : 'border-neonBlue/50'}
            `}
          >
            <div className="flex items-center justify-center mr-3">
              {getIcon(toast.type)}
            </div>
            <p className="text-sm font-medium mr-4 text-gray-200">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;