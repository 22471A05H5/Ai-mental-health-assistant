import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer 
      className="bg-gray-50 border-t border-gray-200 py-8 px-6 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <motion.div 
            className="flex items-center space-x-3 mb-4 md:mb-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span className="text-gray-700 font-medium">MindEase</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            className="flex space-x-6 mb-4 md:mb-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.div 
            className="text-sm text-gray-500"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            © {currentYear} MindEase. All rights reserved.
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div 
          className="mt-6 pt-6 border-t border-gray-200 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> MindEase is designed to provide general wellness support and is not a substitute for professional medical advice, diagnosis, or treatment. 
            If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.
          </p>
        </motion.div>

        {/* Emergency Resources */}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <p className="text-xs text-gray-600">
            Crisis Support: <span className="font-medium">988 Suicide & Crisis Lifeline</span> | 
            <span className="font-medium ml-1">Crisis Text Line: Text HOME to 741741</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
