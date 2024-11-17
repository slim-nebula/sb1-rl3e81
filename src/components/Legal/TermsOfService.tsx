import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Clock, FileText, AlertCircle, Mail } from 'lucide-react';

export function TermsOfService() {
  const sections = [
    {
      icon: Shield,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Showcase360, you agree to be bound by these Terms of Service.',
        'We reserve the right to update these terms at any time.',
        'Continued use of the service constitutes acceptance of updated terms.',
        'Users must be at least 18 years old to use our services.',
        'Commercial use requires acceptance of additional business terms.'
      ]
    },
    {
      icon: Scale,
      title: 'User Responsibilities',
      content: [
        'Maintain accurate and up-to-date account information.',
        'Protect account credentials and notify us of any unauthorized access.',
        'Use the service in compliance with all applicable laws and regulations.',
        'Respect intellectual property rights and third-party content.',
        'Avoid any activities that could harm the service or other users.'
      ]
    },
    {
      icon: FileText,
      title: 'Content Guidelines',
      content: [
        'Users retain ownership of their content while granting us license to use it.',
        'Content must not violate any laws or third-party rights.',
        'We reserve the right to remove content that violates our policies.',
        'Users are responsible for backing up their content.',
        'Virtual tours must accurately represent the properties shown.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: [
        'Service is provided "as is" without warranties of any kind.',
        'We are not liable for any indirect or consequential damages.',
        'Maximum liability is limited to fees paid for the service.',
        'Users indemnify us against third-party claims.',
        'Force majeure events exempt us from obligations.'
      ]
    }
  ];

  const lastUpdated = new Date('2024-03-15').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Please read these terms carefully before using Showcase360's virtual tour platform. 
            These terms govern your use of our services and outline our mutual obligations.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[#0B5394]/10">
                    <Icon className="w-6 h-6 text-[#0B5394]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="p-1 rounded-full bg-[#1CC88A]/10 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1CC88A]" />
                        </div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            );
          })}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions or concerns about our Terms of Service, please contact our legal team.
            </p>
            <a
              href="mailto:legal@showcase360.io"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B5394] text-white rounded-lg hover:bg-[#094276] transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Legal Team</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}