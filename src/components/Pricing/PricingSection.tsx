import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export function PricingSection() {
  // Get pricing data from localStorage or use default plans
  const pricingData = JSON.parse(localStorage.getItem('pricingData') || '{}');
  const plans = pricingData.plans || [];

  // Filter out undefined plans and sort by order
  const visiblePlans = plans
    .filter((plan: any) => plan !== null && plan !== undefined)
    .sort((a: any, b: any) => a.order - b.order);

  // Calculate grid columns based on number of plans
  const getGridCols = () => {
    const count = visiblePlans.length;
    if (count <= 2) return 'md:grid-cols-2';
    if (count === 3) return 'md:grid-cols-3';
    return 'md:grid-cols-4';
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent{' '}
            <span className="text-[#0B5394]">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your virtual tour needs
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 ${getGridCols()} gap-8 justify-center`}>
          {visiblePlans.map((plan: any) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.isPopular
                  ? 'bg-gradient-to-br from-[#0B5394]/5 to-[#1CC88A]/5 backdrop-blur-sm ring-2 ring-[#0B5394]'
                  : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="p-8">
                {plan.isPopular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-sm font-medium bg-[#1CC88A]/10 text-[#1CC88A] rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-0.5 rounded-full bg-[#1CC88A]/10">
                        <Check className="w-4 h-4 text-[#1CC88A]" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ${
                    plan.isPopular
                      ? 'bg-[#0B5394] hover:bg-[#094276] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <span>{plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}