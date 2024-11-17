import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPreviewProps {
  plans: any[];
  settings: any;
}

export function PricingPreview({ plans, settings }: PricingPreviewProps) {
  const sortedPlans = [...plans].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 gap-6 max-h-[600px] overflow-y-auto pr-4">
      {sortedPlans.map((plan) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-xl overflow-hidden bg-white shadow-lg ${
            plan.isPopular ? 'ring-2 ring-[#1CC88A]' : ''
          }`}
        >
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-[#1CC88A] text-white px-4 py-1 text-sm font-medium">
              Most Popular
            </div>
          )}

          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm">{plan.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600 text-sm">{plan.period}</span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-0.5 rounded-full bg-[#1CC88A]/10">
                    <Check className="w-4 h-4 text-[#1CC88A]" />
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-2 px-4 bg-[#0B5394] text-white rounded-lg hover:bg-[#094276] transition-colors duration-200">
              {plan.ctaText}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}