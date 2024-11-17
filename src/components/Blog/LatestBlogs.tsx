import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCard } from './BlogCard';
import { useBlogManagement } from '../../hooks/useBlogManagement';

export function LatestBlogs() {
  const { posts } = useBlogManagement();
  const latestBlogs = posts.slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Latest from Our
            <span className="bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] bg-clip-text text-transparent ml-2">
              Blog
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with the latest trends and insights in virtual property tours
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#1CC88A] hover:to-[#F6C23E]"
            >
              <span>View All Posts</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}