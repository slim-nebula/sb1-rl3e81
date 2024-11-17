import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export function Demo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      {/* Animated Background - More subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F6C23E]/3 to-[#1CC88A]/3 animate-gradient-shift" />
      <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F6C23E]/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1CC88A]/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Experience a{' '}
            <span className="bg-gradient-to-r from-[#F6C23E]/90 to-[#1CC88A]/90 text-transparent bg-clip-text">
              Live Virtual Tour
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create unlimited tours, add labels, custom hotspots, background audio, interactive cards and floor plans. Create beautiful 3D 360 tours that your users won't easily forget!
          </p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F6C23E]/90 to-[#1CC88A]/90 text-white rounded-full 
                     font-semibold text-lg shadow-xl transition-all duration-300
                     hover:shadow-2xl hover:scale-105 hover:from-[#F6C23E] hover:to-[#1CC88A]
                     focus:outline-none focus:ring-2 focus:ring-[#F6C23E]/50 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Softer glowing effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F6C23E]/30 to-[#1CC88A]/30 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Play className="w-5 h-5" />
              </div>
              <span>View Virtual Tour</span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Modal/Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              <iframe
                src="https://app.showcase360.io/viewer/index.php?code=c4ca4238a0b923820dcc509a6f75849b"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}