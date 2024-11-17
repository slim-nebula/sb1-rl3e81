import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { useBlogManagement } from '../../hooks/useBlogManagement';

export function BlogList() {
  const { posts } = useBlogManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(blog => blog.category))];

  // Filter blogs based on search and category
  const filteredBlogs = posts.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' ||
                           blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <section className="pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Latest
            <span className="bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] bg-clip-text text-transparent ml-2">
              Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover the latest trends, tips, and innovations in virtual property tours
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1CC88A]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1CC88A]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200 appearance-none bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}