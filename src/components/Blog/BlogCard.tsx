import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    author: string;
    date: string;
    imageUrl: string;
    category: string;
  };
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#F6C23E]/10 to-[#1CC88A]/10 text-[#F6C23E] rounded-full">
          {blog.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#F6C23E] group-hover:to-[#1CC88A] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {blog.title}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#1CC88A]" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1CC88A]" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 line-clamp-3">{blog.summary}</p>

        {/* Read More Link */}
        <div className="inline-flex items-center gap-2 text-[#F6C23E] group-hover:text-[#1CC88A] transition-colors duration-200 group/link">
          <span className="font-medium">Read More</span>
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" />
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F6C23E]/20 rounded-2xl transition-colors duration-300" />
    </motion.article>
  );
}