import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Image, Tag as TagIcon } from 'lucide-react';
import { BlogPost } from '../../../types';

interface BlogEditorProps {
  blog?: BlogPost | null;
  onSave: (blog: Omit<BlogPost, 'id' | 'slug' | 'date'>) => void;
  onCancel: () => void;
}

export function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    summary: blog?.summary || '',
    content: blog?.content || '',
    author: blog?.author || '',
    imageUrl: blog?.imageUrl || '',
    category: blog?.category || '',
    tags: blog?.tags?.join(', ') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogPost = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      author: formData.author,
      imageUrl: formData.imageUrl,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    onSave(blogPost);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {blog ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
            required
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL
          </label>
          <div className="relative">
            <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Author & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <div className="relative">
            <TagIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#F6C23E] focus:ring-2 focus:ring-[#F6C23E]/20 transition-all duration-200"
              placeholder="e.g., VR, Technology, Real Estate"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F6C23E] to-[#1CC88A] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Save className="w-5 h-5" />
            <span>Save Post</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}