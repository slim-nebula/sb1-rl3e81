import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What equipment do I need to create virtual tours?',
    answer: 'To create professional virtual tours, you\'ll need a 360° camera (like those listed in our compatible cameras section) and a smartphone or computer to upload and edit your tours. We support all major 360° cameras that capture in equirectangular format.'
  },
  {
    question: 'How long does it take to create a virtual tour?',
    answer: 'The process is quick and efficient. Capturing a typical property takes 15-30 minutes, and processing/uploading can be done in under an hour. Our platform streamlines the editing process, allowing you to create professional tours rapidly.'
  },
  {
    question: 'Can I customize the branding of my virtual tours?',
    answer: 'Yes! All paid plans include custom branding options. You can add your logo, choose your color scheme, and customize the user interface to match your brand identity. Enterprise plans offer even more extensive customization options.'
  },
  {
    question: 'How do I share my virtual tours?',
    answer: 'Virtual tours can be shared in multiple ways: direct links, embed codes for your website, social media sharing, and email. You can also generate QR codes for print materials and integrate tours with major real estate platforms.'
  },
  {
    question: 'Is there a limit to how many virtual tours I can create?',
    answer: 'The number of tours depends on your subscription plan. Basic plans start with 5 tours, Standard includes 20 tours, and Pro plans offer unlimited tours. Enterprise plans can be customized to your specific needs.'
  },
  {
    question: 'Do you offer training and support?',
    answer: 'Yes! We provide comprehensive support including video tutorials, documentation, email support, and live chat. Pro and Enterprise plans include priority support and personalized training sessions.'
  }
];

export function FAQAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="text-[#F6C23E]">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our virtual tour platform
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full"
              >
                <div className={`
                  flex items-center justify-between p-6 
                  bg-gradient-to-r from-gray-50/50 to-white
                  hover:from-gray-100/50 hover:to-gray-50/50
                  rounded-lg transition-all duration-200
                  ${expandedIndex === index ? 'shadow-lg' : 'hover:shadow-md'}
                `}>
                  <h3 className="text-lg font-semibold text-gray-900 text-left">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      expandedIndex === index ? 'text-[#F6C23E]' : 'text-gray-400'
                    }`} />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-gray-600 bg-gray-50/50 rounded-lg mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}