import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-lavender via-soft-teal to-sky-blue py-8 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🧠</span>
          </div>
          
          {/* Brand Text */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
              MindEase
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Your AI Wellness Companion
            </p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
