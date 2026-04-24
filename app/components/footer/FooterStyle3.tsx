import { motion } from 'framer-motion';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { footerData } from './footerData';

const FooterStyle3: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-indigo-900 text-white py-16">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to our Newsletter
        </motion.h2>
        <motion.p variants={itemVariants} className="text-indigo-200 mb-8 max-w-2xl mx-auto">
          Stay updated with the latest news, promotions, and events. Join our community today and never miss out!
        </motion.p>

        <motion.div variants={itemVariants} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Subscribe <FaPaperPlane size={14} />
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-8">
          {footerData.links.main.map((link, index) => (
            <a key={index} href={link.url} className="text-indigo-300 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-indigo-400 text-sm mt-8">{footerData.brand.copyright}</motion.p>
      </motion.div>
    </footer>
  );
};

export default FooterStyle3;
