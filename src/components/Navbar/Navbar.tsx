import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
        /* Add easing function for smoother scrolling */
      });

      // Add smooth class to body during scroll
      document.body.classList.add('smooth-scroll');
      setTimeout(() => {
        document.body.classList.remove('smooth-scroll');
      }, 1000); // Remove class after scroll animation
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-[#0B5394]">Showcase360</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Benefits', 'Demo', 'Features', 'Pricing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-all duration-300 ${
                  isScrolled ? 'text-gray-600 hover:text-[#0B5394]' : 'text-white hover:text-[#0B5394]'
                }`}
              >
                {item}
              </button>
            ))}
            <Link
              to="/blog"
              className={`text-sm font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#0B5394]' : 'text-white hover:text-[#0B5394]'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/admin/blog"
              className={`text-sm font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-[#0B5394]' : 'text-white hover:text-[#0B5394]'
              }`}
            >
              Admin
            </Link>
            <button className="px-6 py-2 bg-[#0B5394] text-white rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#094276] hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Benefits', 'Demo', 'Features', 'Pricing'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-[#0B5394] hover:bg-gray-50 rounded-lg transition-all duration-300"
                >
                  {item}
                </button>
              ))}
              <Link
                to="/blog"
                className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-[#0B5394] hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Blog
              </Link>
              <Link
                to="/admin/blog"
                className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-[#0B5394] hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                Admin
              </Link>
              <button className="w-full px-3 py-2 bg-[#0B5394] text-white rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#094276]">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}