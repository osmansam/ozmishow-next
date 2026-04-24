import { motion } from 'framer-motion';
import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { footerData } from './footerData';

const FooterStyle5: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gray-100 text-gray-700 pt-16 pb-8 border-t-4 border-blue-500">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About & Logo */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">{footerData.brand.name.charAt(0)}</div>
              <span className="text-2xl font-bold text-gray-900">{footerData.brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-600">
              {footerData.brand.description}
            </p>
            <div className="flex space-x-3">
              {footerData.socials.slice(0, 4).map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={social.url}
                  className="w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Recent Posts (Simulated) */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-900 font-bold text-lg mb-6">Recent News</h3>
            <div className="space-y-4">
              {footerData.recentNews.map((news, index) => (
                <a key={index} href={news.url} className="block group">
                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{news.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-900 font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                <span className="text-sm">{footerData.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500 shrink-0" />
                <span className="text-sm">{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 shrink-0" />
                <a href={`mailto:${footerData.contact.email}`} className="text-sm hover:text-blue-600 transition-colors">{footerData.contact.email}</a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Mini Map Placeholder */}
          <motion.div variants={itemVariants}>
            <h3 className="text-gray-900 font-bold text-lg mb-6">Our Location</h3>
            <div className="bg-gray-300 w-full h-40 rounded-lg overflow-hidden relative group">
              {/* Placeholder for map */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-medium">
                Map Preview
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all cursor-pointer"></div>
            </div>
            <a href="#" className="text-xs text-blue-600 font-semibold mt-2 inline-block hover:underline">View on Google Maps →</a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">{footerData.brand.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {footerData.links.resources.slice(0, 3).map((link, index) => (
              <a key={index} href={link.url} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterStyle5;
