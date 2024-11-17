import React from 'react';
import { motion } from 'framer-motion';
import { IndustryCarousel } from './IndustryCarousel';

const industries = [
  {
    id: 'realtors',
    title: 'For Realtors',
    subtitle: 'Revolutionize Property Marketing',
    icon: 'building',
    points: [
      'Let buyers explore properties virtually anytime',
      'Reach local and international buyers',
      'Reduce site visits by pre-qualifying buyers',
      'Stand out with interactive walkthroughs'
    ]
  },
  {
    id: 'hospitality',
    title: 'For Hospitality',
    subtitle: 'Boost Bookings with Immersive Previews',
    icon: 'hotel',
    points: [
      'Let guests explore your rooms and amenities virtually',
      'Highlight luxury features like suites, pools, and spas',
      'Attract global travelers with stunning previews',
      'Reduce cancellations with clear and immersive previews'
    ]
  },
  {
    id: 'tourism',
    title: 'For Tourism',
    subtitle: 'Bring Destinations to Life',
    icon: 'palmtree',
    points: [
      'Showcase attractions with interactive previews',
      'Promote scenic trails and guided tours',
      'Make destinations accessible globally',
      'Drive engagement with social media sharing'
    ]
  },
  {
    id: 'architecture',
    title: 'For Architecture',
    subtitle: 'Visualize the Dream',
    icon: 'pencil',
    points: [
      'Transform 2D plans into 3D experiences',
      'Showcase renovation transformations',
      'Collaborate with stakeholders effectively',
      'Present your vision impressively'
    ]
  },
  {
    id: 'exhibitions',
    title: 'For Exhibitions',
    subtitle: 'Showcase and Sell',
    icon: 'store',
    points: [
      'Take your exhibits to a global audience',
      'Display products with interactive features',
      'Expand beyond physical limitations',
      'Convert viewers with engaging experiences'
    ]
  },
  {
    id: 'education',
    title: 'For Education',
    subtitle: 'Create Immersive Learning Spaces',
    icon: 'graduation-cap',
    points: [
      'Offer virtual campus tours worldwide',
      'Create interactive learning modules',
      'Showcase facilities comprehensively',
      'Enable virtual access for everyone'
    ]
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-32">
      {/* Background gradients with lower z-index */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0B5394]/3 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(11,83,148,0.05)_0deg,transparent_60deg,transparent_300deg,rgba(11,83,148,0.05)_360deg)]" />
      </div>
      
      {/* Content with higher z-index */}
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Unlock the Power of Virtual Tours
            <span className="block text-[#0B5394] mt-2">Benefits Across Industries</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our virtual tour solutions transform experiences and drive success across different sectors
          </p>
        </motion.div>

        <IndustryCarousel industries={industries} />
      </div>
    </section>
  );
}