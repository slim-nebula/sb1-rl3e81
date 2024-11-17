import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, DollarSign } from 'lucide-react';
import { BlogEditor } from './BlogEditor';
import { BlogTable } from './BlogTable';
import { PricingAdmin } from './PricingAdmin/PricingAdmin';
import { useBlogManagement } from '../../../hooks/useBlogManagement';
import { BlogPost } from '../../../types';

type AdminSection = 'blog' | 'pricing';

export function BlogAdmin() {
  const { posts, createPost, updatePost, deletePost } = useBlogManagement();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeSection, setActiveSection] = useState<AdminSection>('blog');

  const filteredBlogs = posts.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsEditing(true);
  };

  const handleSave = (blog: Omit<BlogPost, 'id' | 'slug' | 'date'>) => {
    if (selectedBlog) {
      updatePost({ ...blog, id: selectedBlog.id, slug: selectedBlog.slug, date: selectedBlog.date });
    } else {
      createPost(blog);
    }
    setIsEditing(false);
  };

  const handleDelete = (blogId: string) => {
    deletePost(blogId);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your blog posts and pricing plans</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <motion.button
            onClick={() => setActiveSection('blog')}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeSection === 'blog'
                ? 'bg-[#0B5394] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            <span>Blog Posts</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveSection('pricing')}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeSection === 'pricing'
                ? 'bg-[#0B5394] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <DollarSign className="w-5 h-5" />
            <span>Pricing Plans</span>
          </motion.button>
        </div>

        {/* Content Sections */}
        <div className="relative bg-white rounded-xl shadow-lg p-6">
          {activeSection === 'blog' ? (
            isEditing ? (
              <BlogEditor
                blog={selectedBlog}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                    <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
                  </div>
                  
                  <motion.button
                    onClick={handleCreate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>New Post</span>
                  </motion.button>
                </div>

                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
                  />
                </div>

                <BlogTable
                  blogs={filteredBlogs}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            )
          ) : (
            <PricingAdmin />
          )}
        </div>
      </div>
    </div>
  );
}