import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { footerData } from './footerData';

const FooterStyle4: React.FC = () => {
  const socialVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-black text-white py-16 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 lg:mb-0 max-w-md">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Let's create something amazing together.
            </h2>
            <p className="text-gray-400 mb-8">
              {footerData.brand.description}
            </p>
            <button className="group flex items-center gap-2 text-white font-semibold border-b-2 border-white pb-1 hover:text-purple-400 hover:border-purple-400 transition-all">
              Start a Project <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div>
              <h4 className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm">Sitemap</h4>
              <ul className="space-y-4">
                {footerData.links.main.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="text-lg hover:text-purple-400 transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 font-semibold mb-6 uppercase tracking-wider text-sm">Socials</h4>
              <div className="flex flex-col space-y-4">
                {footerData.socials.slice(0, 4).map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover="hover"
                    variants={socialVariants}
                    href={social.url}
                    className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                  >
                    <social.icon /> {social.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter mb-4 md:mb-0">{footerData.brand.name.toUpperCase()}.</div>
          <div className="flex gap-8 text-sm text-gray-500">
            <p>{footerData.brand.copyright}</p>
            {footerData.links.legal.slice(0, 2).map((link, index) => (
              <a key={index} href={link.url} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStyle4;
