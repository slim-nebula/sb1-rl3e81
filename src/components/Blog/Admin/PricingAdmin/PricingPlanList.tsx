import React from 'react';
import { motion } from 'framer-motion';
import { Package, Edit2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface PricingPlanListProps {
  plans: any[];
  onEdit: (plan: any) => void;
  onDelete: (planId: string) => void;
  onReorder: (planId: string, direction: 'up' | 'down') => void;
}

export function PricingPlanList({ plans, onEdit, onDelete, onReorder }: PricingPlanListProps) {
  const sortedPlans = [...plans].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sortedPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
        >
          <div className="p-4 flex items-center gap-4">
            {/* Icon */}
            <div className="p-2 bg-[#0B5394]/10 rounded-lg">
              <Package className="w-5 h-5 text-[#0B5394]" />
            </div>

            {/* Plan Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">{plan.name}</h4>
                {plan.isPopular && (
                  <span className="px-2 py-1 text-xs font-medium bg-[#1CC88A]/10 text-[#1CC88A] rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {plan.price}{plan.period} - {plan.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Reorder Buttons */}
              <div className="flex flex-col gap-1">
                <motion.button
                  onClick={() => onReorder(plan.id, 'up')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={index === 0}
                  className={`p-1 rounded-full ${
                    index === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-400 hover:text-[#0B5394] hover:bg-[#0B5394]/10'
                  } transition-colors duration-200`}
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onReorder(plan.id, 'down')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={index === plans.length - 1}
                  className={`p-1 rounded-full ${
                    index === plans.length - 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-400 hover:text-[#0B5394] hover:bg-[#0B5394]/10'
                  } transition-colors duration-200`}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Edit & Delete */}
              <motion.button
                onClick={() => onEdit(plan)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-[#0B5394] transition-colors duration-200"
              >
                <Edit2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => onDelete(plan.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}