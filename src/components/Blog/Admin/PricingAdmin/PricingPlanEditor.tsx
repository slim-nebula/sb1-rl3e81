import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Plus, Minus } from 'lucide-react';

interface PricingPlanEditorProps {
  plan?: any;
  onSave: (plan: any) => void;
  onCancel: () => void;
}

export function PricingPlanEditor({ plan, onSave, onCancel }: PricingPlanEditorProps) {
  const [formData, setFormData] = useState({
    name: plan?.name || '',
    price: plan?.price || '',
    period: plan?.period || '/month',
    description: plan?.description || '',
    badge: plan?.badge || '',
    icon: plan?.icon || 'package',
    features: plan?.features || [''],
    ctaText: plan?.ctaText || 'Get Started',
    ctaUrl: plan?.ctaUrl || '',
    isPopular: plan?.isPopular || false,
    metadata: {
      metaTitle: plan?.metadata?.metaTitle || '',
      metaDescription: plan?.metadata?.metaDescription || ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: plan?.id,
      order: plan?.order || 0
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {plan ? 'Edit Plan' : 'Create New Plan'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
              required
            />
          </div>
        </div>

        {/* Description and Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Text
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
              placeholder="e.g., Most Popular"
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="text-sm text-[#0B5394] hover:text-[#094276] flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
                  placeholder="Enter feature"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Text
            </label>
            <input
              type="text"
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA URL
            </label>
            <input
              type="text"
              name="ctaUrl"
              value={formData.ctaUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
            />
          </div>
        </div>

        {/* Popular Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
            className="w-4 h-4 text-[#0B5394] border-gray-300 rounded focus:ring-[#0B5394]"
          />
          <label className="text-sm font-medium text-gray-700">
            Mark as Popular Plan
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-[#0B5394] text-white rounded-lg hover:bg-[#094276] flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Plan</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}