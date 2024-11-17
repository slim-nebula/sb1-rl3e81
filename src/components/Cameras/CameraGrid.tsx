import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, ExternalLink } from 'lucide-react';

const cameras = [
  {
    id: 'insta360-one-rs-1-inch',
    name: 'Insta360 ONE RS 1-Inch 360',
    description: 'Capture high-resolution 360° images with this professional-grade camera.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528648/insta360_one_rs_360_otolrc.webp',
    website: 'https://www.insta360.com/product/insta360-oners/1-inch-360'
  },
  {
    id: 'insta360-one-rs',
    name: 'Insta360 ONE RS',
    description: 'A modular camera with flexible configurations for versatile shooting.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528648/insta360_one_rs_ynygmy.webp',
    website: 'https://www.insta360.com/product/insta360-oners'
  },
  {
    id: 'insta360-one-x',
    name: 'Insta360 ONE X / X2 / X3',
    description: 'Compact and powerful, perfect for immersive 360° media creation.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528648/insta360_ONE_X2_kit_f863wt.webp',
    website: 'https://www.insta360.com/product/insta360-x3'
  },
  {
    id: 'ricoh-theta-z1',
    name: 'Ricoh Theta Z1',
    description: 'Premium build with outstanding image quality for professionals.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528649/ricoh_theta_z1_arpodl.png',
    website: 'https://theta360.com/en/about/theta/z1.html'
  },
  {
    id: 'ricoh-theta-x',
    name: 'Ricoh Theta X',
    description: 'User-friendly camera with a large screen for easy operation.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528649/ricoh_theta_x_uxjyu5.png',
    website: 'https://theta360.com/en/about/theta/x.html'
  },
  {
    id: 'ricoh-theta-sc2',
    name: 'Ricoh Theta SC2',
    description: 'Simple and affordable, ideal for quick 360° photography.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528649/ricoh_theta_sc2_pfeto4.png',
    website: 'https://theta360.com/en/about/theta/sc2.html'
  },
  {
    id: 'trisio-lite-2',
    name: 'Trisio Lite 2',
    description: 'Perfect for beginners, offering easy-to-use 360° capturing.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/v1731528649/trisio_8k_onlglk.png',
    website: 'https://www.trisio.com/trisio-lite2'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function CameraGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Professional-Grade
            <span className="text-[#F6C23E] ml-2">360° Cameras</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose from our selection of high-quality cameras to create stunning virtual tours
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1CC88A]" />
              <span>Fully compatible with Showcase360</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1CC88A]" />
              <span>Supports equirectangular format</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#1CC88A]" />
              <span>360° photos & videos</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {cameras.map((camera) => (
            <motion.div
              key={camera.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                {/* Base overlay for the name */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                {/* Camera name - always visible */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">
                    {camera.name}
                  </h3>
                </div>

                {/* Image */}
                <div className="p-8 h-full">
                  <img
                    src={camera.image}
                    alt={camera.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Hover overlay with additional info */}
                <motion.div 
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-[#F6C23E] bg-opacity-20 backdrop-blur-sm">
                        <Camera className="w-5 h-5 text-[#F6C23E]" />
                      </div>
                      <div className="flex-1">
                        <a
                          href={camera.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[#F6C23E] hover:text-white transition-colors duration-200 mt-1"
                        >
                          <span>Official Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-base text-white/90 leading-relaxed">
                      {camera.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute inset-0 ring-2 ring-[#F6C23E] ring-opacity-0 group-hover:ring-opacity-50 rounded-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}