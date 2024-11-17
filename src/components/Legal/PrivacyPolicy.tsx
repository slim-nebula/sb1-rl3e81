import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Lock, UserCheck, Database, Mail } from 'lucide-react';

export function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number)',
        'Usage data and analytics',
        'Device and browser information',
        'Virtual tour interaction data',
        'Payment information (when applicable)'
      ]
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content: [
        'Industry-standard SSL encryption',
        'Regular security audits and updates',
        'Secure data storage and transmission',
        'Limited employee access to personal data',
        'Regular backup procedures'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Privacy Rights',
      content: [
        'Right to access your personal data',
        'Right to correct inaccurate information',
        'Right to delete your data',
        'Right to withdraw consent',
        'Right to data portability'
      ]
    },
    {
      icon: Database,
      title: 'Data Storage and Retention',
      content: [
        'Data stored in secure cloud facilities',
        'Retention based on business necessity',
        'Regular data cleanup procedures',
        'Option to request data deletion',
        'Compliance with legal requirements'
      ]
    },
    {
      icon: Mail,
      title: 'Communication Preferences',
      content: [
        'Email notification settings',
        'Marketing communication opt-out',
        'Service-related announcements',
        'Newsletter subscription management',
        'Account updates and alerts'
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
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            At Showcase360, we take your privacy seriously. This policy outlines how we collect, use, 
            and protect your personal information when you use our virtual tour platform.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Privacy Policy?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions or concerns about our privacy policy, please don't hesitate to contact us.
            </p>
            <a
              href="mailto:privacy@showcase360.io"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B5394] text-white rounded-lg hover:bg-[#094276] transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Privacy Team</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}