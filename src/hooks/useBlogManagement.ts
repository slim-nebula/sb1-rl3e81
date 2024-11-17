import { useState, useCallback, useEffect } from 'react';
import { BlogPost } from '../types';
import * as storage from '../lib/storage';
import defaultBlogs from '../data/blogs.json';

export function useBlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    // Initialize with stored posts or default blogs
    const storedPosts = storage.getBlogPosts();
    if (storedPosts.length === 0) {
      // If no stored posts, use default blogs and save them
      storage.saveBlogPosts(defaultBlogs.blogs);
      return defaultBlogs.blogs;
    }
    return storedPosts;
  });

  const createPost = useCallback((post: Omit<BlogPost, 'id' | 'slug' | 'date'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      slug: post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };
    storage.createBlogPost(newPost);
    setPosts(prev => [...prev, newPost]);
    return newPost;
  }, []);

  const updatePost = useCallback((post: BlogPost) => {
    const updatedPost = {
      ...post,
      slug: post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    };
    storage.updateBlogPost(updatedPost);
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  }, []);

  const deletePost = useCallback((postId: string) => {
    storage.deleteBlogPost(postId);
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  const getPostBySlug = useCallback((slug: string) => {
    return posts.find(post => post.slug === slug);
  }, [posts]);

  // Sync with localStorage whenever posts change
  useEffect(() => {
    storage.saveBlogPosts(posts);
  }, [posts]);

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug
  };
}