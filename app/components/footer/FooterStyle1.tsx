import React from 'react';
import { footerData } from './footerData';

const FooterStyle1: React.FC<any> = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">{footerData.brand.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{footerData.brand.copyright}</p>
        </div>
        
        <div className="flex space-x-6 mb-4 md:mb-0">
          {footerData.links.legal.map((link, index) => (
            <a key={index} href={link.url} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex space-x-4">
          {footerData.socials.slice(0, 4).map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
              aria-label={social.name}
            >
              <social.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterStyle1;
