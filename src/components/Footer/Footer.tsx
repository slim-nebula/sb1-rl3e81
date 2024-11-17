import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ArrowUp,
  Camera,
  Send
} from 'lucide-react';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll listener
  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleNavigation = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Logo and Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-[#F6C23E]" />
              <span className="text-2xl font-bold text-[#0A5394]">Showcase360</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Revolutionizing real estate visualization through immersive virtual tours. 
              We empower realtors to showcase properties like never before, making 
              every viewing experience memorable and effective.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="text-left text-gray-600 hover:text-[#F6C23E] transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Stay Connected</h3>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <motion.a
                href="mailto:contact@showcase360.io"
                className="flex items-center gap-3 text-gray-600 hover:text-[#F6C23E] transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span>contact@showcase360.io</span>
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-gray-600 hover:text-[#F6C23E] transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5" />
                <span>+123 456 7890</span>
              </motion.a>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#F6C23E] transition-colors duration-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Social Media Links */}
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#F6C23E] hover:text-white transition-all duration-200"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Showcase360. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-[#F6C23E] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-[#F6C23E] transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-[#F6C23E] hover:bg-[#1CC88A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}