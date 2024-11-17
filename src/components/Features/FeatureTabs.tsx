import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Navigation, 
  UserPlus, 
  Palette, 
  Sofa, 
  Share2, 
  LineChart,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    id: '360-media',
    icon: Camera,
    title: 'Bring Properties to Life with 360° Media',
    label: '360° Media Integration',
    description: 'Engage potential buyers like never before by offering fully immersive 360° images and videos. Allow them to explore properties at their own pace, experiencing every angle and detail. With live-streaming 360°, you can host virtual open houses and connect with buyers remotely, saving time while expanding your reach.',
    image: 'https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  {
    id: 'navigation',
    icon: Navigation,
    title: 'Seamless Room-to-Room Navigation',
    label: 'Interactive Navigation',
    description: 'Help buyers feel as though they\'re walking through the property. With clickable navigation markers and an intuitive \'click anywhere\' mode, buyers can effortlessly move between rooms and spaces. This makes virtual tours more natural and engaging, giving potential buyers the confidence to take the next step.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  {
    id: 'leads',
    icon: UserPlus,
    title: 'Capture High-Quality Leads Directly Through Your Tour',
    label: 'Lead Generation',
    description: 'Turn your virtual tours into powerful lead generation tools. Require passcodes or lead forms for access, ensuring you connect with serious buyers. Integrate Mailchimp for follow-ups and use real-time visitor tracking to prioritize your most interested prospects. This feature ensures your efforts are focused on converting qualified leads.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Showcase Your Brand with Every Tour',
    label: 'Custom Branding',
    description: 'Reinforce your brand identity by customizing each virtual tour. Add your agency\'s logo, choose colors that align with your branding, and even include a nadir logo to maintain a professional and polished appearance. Make every tour uniquely yours.',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  {
    id: 'staging',
    icon: Sofa,
    title: 'Transform Empty Spaces with Virtual Staging',
    label: 'Virtual Staging',
    description: 'Help buyers visualize the potential of a property with virtual furniture and decor, elevating the appeal of listings and driving interest.',
    image: 'https://res.cloudinary.com/dbqgetyu3/image/upload/c_fill,g_auto,h_800,w_1200/v1731873273/virtual_staging_chx671.webp'
  },
  {
    id: 'social',
    icon: Share2,
    title: 'Expand Your Reach with Seamless Social Media Integration',
    label: 'Social Media Integration',
    description: 'Easily share your virtual tours on social media platforms like Facebook, Instagram, and WhatsApp to attract more buyers. Enable instant communication through Facebook Messenger or WhatsApp chat, providing real-time responses to inquiries while buyers view the tour.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  {
    id: 'analytics',
    icon: LineChart,
    title: 'Gain Insights with Comprehensive Analytics',
    label: 'Analytics & Tracking',
    description: 'Understand buyer behavior with detailed analytics. Track how visitors interact with your tours, which properties generate the most interest, and where you can improve. With Google Analytics integration and real-time visitor tracking, you\'ll have all the insights you need to optimize your strategy.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800'
  }
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id);
  const activeFeature = features.find(feature => feature.id === activeTab);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empower Your Realty Business with{' '}
            <span className="text-[#F6C23E]">Virtual Tour</span>{' '}
            Features
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover how our cutting-edge tools revolutionize property showcasing, enhance buyer engagement, and help you close deals faster than ever.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Vertical Tabs */}
          <div className="lg:w-1/3">
            <div className="space-y-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeTab === feature.id;
                
                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 group
                      ${isActive 
                        ? 'bg-white shadow-lg shadow-[#F6C23E]/10 border-l-4 border-[#F6C23E]' 
                        : 'hover:bg-white/60'}`}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#F6C23E]/10 text-[#F6C23E]' : 'bg-gray-100 text-gray-600 group-hover:bg-white group-hover:text-[#F6C23E]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {feature.label}
                    </span>
                    {isActive && (
                      <ArrowRight className="w-5 h-5 text-[#F6C23E] ml-auto" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {activeFeature && (
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-gray-900">
                    {activeFeature.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {activeFeature.description}
                  </p>

                  {activeFeature.id === 'staging' && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-[#F6C23E]/10 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#F6C23E]" />
                        </div>
                        <span className="text-gray-600">Boosts Imagination: Showcases rooms as warm, functional spaces.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-[#F6C23E]/10 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#F6C23E]" />
                        </div>
                        <span className="text-gray-600">Cost-Effective: Affordable alternative to physical staging.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-[#F6C23E]/10 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#F6C23E]" />
                        </div>
                        <span className="text-gray-600">Customizable: Tailor styles to target audiences or property type.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-[#F6C23E]/10 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#F6C23E]" />
                        </div>
                        <span className="text-gray-600">Remote-Friendly: Perfect for virtual tours and remote buyers.</span>
                      </li>
                    </ul>
                  )}

                  <div className={`relative w-full rounded-2xl overflow-hidden shadow-xl ${
                    activeFeature.id === 'staging' ? 'h-0 pb-[40%]' : 'h-0 pb-[56.25%]'
                  }`}>
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}