import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Hotel, Palmtree, Pencil, Store, GraduationCap, ArrowRight } from 'lucide-react';

interface Industry {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  points: string[];
}

interface IndustryCardProps {
  industry: Industry;
}

const iconMap = {
  building: Building2,
  hotel: Hotel,
  palmtree: Palmtree,
  pencil: Pencil,
  store: Store,
  'graduation-cap': GraduationCap,
};

export function IndustryCard({ industry }: IndustryCardProps) {
  const Icon = iconMap[industry.icon as keyof typeof iconMap];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="w-full max-w-xl mx-auto p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-300 shadow-lg hover:shadow-xl"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="p-4 rounded-xl bg-[#F6C23E]/10">
          <Icon className="w-8 h-8 text-[#F6C23E]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{industry.title}</h3>
          <p className="text-[#1CC88A] text-lg mt-1">{industry.subtitle}</p>
        </div>
      </motion.div>

      <div className="space-y-4 mb-8">
        {industry.points.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-3 group"
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-[#F6C23E]/60 group-hover:bg-[#F6C23E] transition-colors duration-300 mt-2.5"
              whileHover={{ scale: 1.5 }}
            />
            <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 text-[#F6C23E] hover:text-[#1CC88A] transition-colors duration-300 group"
      >
        <span className="font-semibold">Learn More</span>
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
}