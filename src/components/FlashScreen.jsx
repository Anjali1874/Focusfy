import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const FlashScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-50 rounded-full" />
          <Brain className="w-24 h-24 text-purple-400 relative z-10" strokeWidth={1.5} />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-8 h-8 text-purple-300" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent mb-2">
            FocusFy
          </h1>
          <p className="text-purple-300 text-sm">Elevate Your Focus, Achieve More</p>
        </motion.div>

        <motion.div
          animate={{ 
            width: ["0%", "100%"]
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut"
          }}
          className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full w-48"
        />
      </motion.div>
    </div>
  );
};

export default FlashScreen;