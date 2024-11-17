import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IndustryCard } from './IndustryCard';

interface Industry {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  points: string[];
}

interface IndustryCarouselProps {
  industries: Industry[];
}

export function IndustryCarousel({ industries }: IndustryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cardWidth = window.innerWidth >= 1024 ? 640 : window.innerWidth - 32;

  const scrollToIndex = (index: number, smooth = true) => {
    if (containerRef.current) {
      const scrollPosition = index * cardWidth;
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      setCanScrollLeft(currentScroll > 10);
      setCanScrollRight(currentScroll < maxScroll - 10);
      setScrollProgress(currentScroll / maxScroll);
      
      const newIndex = Math.round(currentScroll / cardWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - (containerRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      const container = containerRef.current;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      scrollToIndex(newIndex);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollPrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollNext = () => {
    if (currentIndex < industries.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  return (
    <div className="relative z-10"> {/* Added z-10 to ensure content stays above background */}
      <div className="relative">
        {/* Left Fade Overlay */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            opacity: Math.min(scrollProgress * 2, 0.8)
          }}
        />

        {/* Right Fade Overlay */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            opacity: Math.min((1 - scrollProgress) * 2, 0.8)
          }}
        />

        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none px-4">
          <AnimatePresence mode="wait">
            {canScrollLeft && (
              <motion.button
                key="prev-button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollPrev}
                className="pointer-events-auto absolute left-4 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-[#0B5394] hover:text-[#1CC88A] hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {canScrollRight && (
              <motion.button
                key="next-button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollNext}
                className="pointer-events-auto absolute right-4 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-[#0B5394] hover:text-[#1CC88A] hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="inline-flex gap-8 py-4"> {/* Added py-4 for better spacing */}
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="snap-center"
                style={{ scrollSnapAlign: 'center', minWidth: cardWidth }}
              >
                <IndustryCard industry={industry} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {industries.map((industry, index) => (
            <motion.button
              key={industry.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#0B5394]'
                  : 'w-1.5 bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}