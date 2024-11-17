import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useBlogManagement } from '../../hooks/useBlogManagement';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = useBlogManagement();
  const blog = getPostBySlug(slug || '');

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#F6C23E] hover:text-[#1CC88A]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#F6C23E] hover:text-[#1CC88A] mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#1CC88A]" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#1CC88A]" />
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#1CC88A]" />
              <span>{blog.category}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Share this post:</span>
            <button className="p-2 text-gray-400 hover:text-[#F6C23E] transition-colors duration-200">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}