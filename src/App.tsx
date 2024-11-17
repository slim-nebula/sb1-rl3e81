import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Benefits } from './components/Benefits/Benefits';
import { Demo } from './components/Demo/Demo';
import { FeatureTabs } from './components/Features/FeatureTabs';
import { CameraGrid } from './components/Cameras/CameraGrid';
import { LatestBlogs } from './components/Blog/LatestBlogs';
import { BlogList } from './components/Blog/BlogList';
import { BlogPost } from './components/Blog/BlogPost';
import { BlogAdmin } from './components/Blog/Admin/BlogAdmin';
import { PricingSection } from './components/Pricing/PricingSection';
import { FAQAccordion } from './components/FAQ/FAQAccordion';
import { Footer } from './components/Footer/Footer';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';

const HomePage = () => (
  <main>
    <Hero />
    <Benefits />
    <Demo />
    <FeatureTabs />
    <CameraGrid />
    <LatestBlogs />
    <PricingSection />
    <FAQAccordion />
  </main>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin/blog" element={<BlogAdmin />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Footer />
    </div>
  );
}