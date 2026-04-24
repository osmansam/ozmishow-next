import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

export const footerData = {
  brand: {
    name: 'BrandName',
    copyright: '© 2024 BrandName. All rights reserved.',
    description: 'We are a team of passionate developers building the future of the web. Join us on our journey.',
  },
  socials: [
    { name: 'Facebook', icon: FaFacebookF, url: '#' },
    { name: 'Twitter', icon: FaTwitter, url: '#' },
    { name: 'Instagram', icon: FaInstagram, url: '#' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: '#' },
    { name: 'YouTube', icon: FaYoutube, url: '#' },
    { name: 'GitHub', icon: FaGithub, url: '#' },
  ],
  links: {
    company: [
      { label: 'About Us', url: '#' },
      { label: 'Our Team', url: '#' },
      { label: 'Careers', url: '#' },
      { label: 'Blog', url: '#' },
    ],
    resources: [
      { label: 'Documentation', url: '#' },
      { label: 'Support Center', url: '#' },
      { label: 'Terms of Service', url: '#' },
      { label: 'Privacy Policy', url: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', url: '#' },
      { label: 'Terms of Service', url: '#' },
      { label: 'Contact', url: '#' },
    ],
    main: [
      { label: 'Home', url: '#' },
      { label: 'About', url: '#' },
      { label: 'Services', url: '#' },
      { label: 'Blog', url: '#' },
      { label: 'Contact', url: '#' },
    ],
  },
  contact: {
    address: '123 Innovation Dr, Tech City',
    email: 'contact@brandname.com',
    phone: '+1 (555) 123-4567',
  },
  recentNews: [
    { title: 'Launching our new platform', date: 'Oct 24, 2024', url: '#' },
    { title: 'Top 10 trends in web design', date: 'Oct 18, 2024', url: '#' },
    { title: 'How to improve SEO ranking', date: 'Oct 12, 2024', url: '#' },
  ],
};
