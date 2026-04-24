import React from 'react';
import { footerData } from './footerData';

const FooterStyle2: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company</h3>
            <p className="text-sm leading-relaxed mb-4">
              {footerData.brand.description}
            </p>
            <div className="flex space-x-4">
              {footerData.socials.slice(0, 4).map((social, index) => (
                <a key={index} href={social.url} className="text-gray-400 hover:text-white transition-colors" aria-label={social.name}>
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerData.links.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>{footerData.contact.address}</li>
              <li>{footerData.contact.email}</li>
              <li>{footerData.contact.phone}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">{footerData.brand.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerData.links.legal.map((link, index) => (
              <a key={index} href={link.url} className="text-gray-500 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStyle2;
