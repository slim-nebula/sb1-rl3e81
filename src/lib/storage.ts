import { BlogPost, PricingPlan, PricingSettings } from '../types';

// Blog Management
export const getBlogPosts = (): BlogPost[] => {
  try {
    const data = localStorage.getItem('blogData');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

export const saveBlogPosts = (posts: BlogPost[]): void => {
  try {
    localStorage.setItem('blogData', JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving blog posts:', error);
  }
};

export const createBlogPost = (post: BlogPost): void => {
  const posts = getBlogPosts();
  posts.push(post);
  saveBlogPosts(posts);
};

export const updateBlogPost = (updatedPost: BlogPost): void => {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    saveBlogPosts(posts);
  }
};

export const deleteBlogPost = (postId: string): void => {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.id !== postId);
  saveBlogPosts(filteredPosts);
};

// Pricing Management
export const getPricingData = (): { plans: PricingPlan[], settings: PricingSettings } => {
  try {
    const data = localStorage.getItem('pricingData');
    return data ? JSON.parse(data) : { plans: [], settings: {} };
  } catch (error) {
    console.error('Error loading pricing data:', error);
    return { plans: [], settings: {} };
  }
};

export const savePricingData = (data: { plans: PricingPlan[], settings: PricingSettings }): void => {
  try {
    localStorage.setItem('pricingData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving pricing data:', error);
  }
};

export const createPricingPlan = (plan: PricingPlan): void => {
  const { plans, settings } = getPricingData();
  plans.push(plan);
  savePricingData({ plans, settings });
};

export const updatePricingPlan = (updatedPlan: PricingPlan): void => {
  const { plans, settings } = getPricingData();
  const index = plans.findIndex(plan => plan.id === updatedPlan.id);
  if (index !== -1) {
    plans[index] = updatedPlan;
    savePricingData({ plans, settings });
  }
};

export const deletePricingPlan = (planId: string): void => {
  const { plans, settings } = getPricingData();
  const filteredPlans = plans.filter(plan => plan.id !== planId);
  savePricingData({ plans: filteredPlans, settings });
};

export const updatePricingSettings = (newSettings: PricingSettings): void => {
  const { plans } = getPricingData();
  savePricingData({ plans, settings: newSettings });
};