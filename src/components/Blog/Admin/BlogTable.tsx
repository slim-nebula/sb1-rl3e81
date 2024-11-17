import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../../types';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface BlogTableProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (blogId: string) => void;
}

export function BlogTable({ blogs, onEdit, onDelete }: BlogTableProps) {
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
  };

  const handleDeleteConfirm = () => {
    if (blogToDelete) {
      onDelete(blogToDelete);
      setBlogToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setBlogToDelete(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <motion.tr
                  key={blog.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">{blog.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F6C23E]/10 text-[#F6C23E]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(blog.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="p-2 text-gray-400 hover:text-[#F6C23E] transition-colors duration-200"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <motion.button
                        onClick={() => onEdit(blog)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-[#1CC88A] transition-colors duration-200"
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteClick(blog.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {blogToDelete && (
          <DeleteConfirmDialog
            title="Delete Blog Post"
            message="Are you sure you want to delete this blog post? This action cannot be undone."
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </AnimatePresence>
    </>
  );
}