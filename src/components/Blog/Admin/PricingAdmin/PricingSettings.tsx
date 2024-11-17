import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';

interface PricingSettingsProps {
  settings: any;
  onSave: (settings: any) => void;
  onCancel: () => void;
}

export function PricingSettings({ settings, onSave, onCancel }: PricingSettingsProps) {
  const [formData, setFormData] = useState(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleResponsiveChange = (device: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      responsive: {
        ...prev.responsive,
        [device]: {
          ...prev.responsive[device],
          [field]: parseInt(value)
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Pricing Settings</h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Layout Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Layout Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Plans Per Row (Desktop)
              </label>
              <input
                type="number"
                name="plansPerRow"
                value={formData.plansPerRow}
                onChange={handleChange}
                min="1"
                max="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Layout Style
              </label>
              <select
                name="layout"
                value={formData.layout}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
              >
                <option value="cards">Cards</option>
                <option value="table">Comparison Table</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Responsive Settings</h4>
          
          {/* Mobile Settings */}
          <div className="mb-4">
            <h5 className="text-sm text-gray-700 mb-3">Mobile</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Plans Per Row
                </label>
                <input
                  type="number"
                  value={formData.responsive.mobile.plansPerRow}
                  onChange={(e) => handleResponsiveChange('mobile', 'plansPerRow', e.target.value)}
                  min="1"
                  max="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Visible Features
                </label>
                <input
                  type="number"
                  value={formData.responsive.mobile.showFeatures}
                  onChange={(e) => handleResponsiveChange('mobile', 'showFeatures', e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
                />
              </div>
            </div>
          </div>

          {/* Tablet Settings */}
          <div>
            <h5 className="text-sm text-gray-700 mb-3">Tablet</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Plans Per Row
                </label>
                <input
                  type="number"
                  value={formData.responsive.tablet.plansPerRow}
                  onChange={(e) => handleResponsiveChange('tablet', 'plansPerRow', e.target.value)}
                  min="1"
                  max="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Visible Features
                </label>
                <input
                  type="number"
                  value={formData.responsive.tablet.showFeatures}
                  onChange={(e) => handleResponsiveChange('tablet', 'showFeatures', e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#0B5394] focus:ring-2 focus:ring-[#0B5394]/20"
                />
              </div>
            </div>
          </div>
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
            <span>Save Settings</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}