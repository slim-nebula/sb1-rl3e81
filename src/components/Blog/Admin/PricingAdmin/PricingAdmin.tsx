import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus } from 'lucide-react';
import { PricingPlanEditor } from './PricingPlanEditor';
import { PricingPlanList } from './PricingPlanList';
import { PricingSettings } from './PricingSettings';
import { PricingPreview } from './PricingPreview';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import pricingData from '../../../../data/pricing.json';

export function PricingAdmin() {
  const [plans, setPlans] = useState(() => {
    const savedData = localStorage.getItem('pricingData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return Array.isArray(parsed.plans) ? parsed.plans : pricingData.plans;
    }
    return pricingData.plans;
  });

  const [settings, setSettings] = useState(() => {
    const savedData = localStorage.getItem('pricingData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed.settings || pricingData.settings;
    }
    return pricingData.settings;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Save to localStorage whenever plans or settings change
  useEffect(() => {
    const updatedData = {
      settings,
      plans: plans.map((plan, index) => ({
        ...plan,
        order: index + 1
      }))
    };
    localStorage.setItem('pricingData', JSON.stringify(updatedData));
  }, [plans, settings]);

  const handleReorder = (planId: string, direction: 'up' | 'down') => {
    const currentIndex = plans.findIndex(p => p.id === planId);
    if (currentIndex === -1) return;

    const newPlans = [...plans];
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < plans.length) {
      // Swap plans
      [newPlans[currentIndex], newPlans[newIndex]] = [newPlans[newIndex], newPlans[currentIndex]];
      
      // Update order for all plans
      const reorderedPlans = newPlans.map((plan, index) => ({
        ...plan,
        order: index + 1
      }));

      setPlans(reorderedPlans);
    }
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setIsEditing(true);
    setShowSettings(false);
  };

  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setIsEditing(true);
    setShowSettings(false);
  };

  const handleSave = (plan: any) => {
    if (selectedPlan) {
      setPlans(plans.map(p => p.id === plan.id ? plan : p));
    } else {
      setPlans([...plans, { ...plan, id: Date.now().toString(), order: plans.length + 1 }]);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = (planId: string) => {
    setPlanToDelete(planId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!planToDelete) return;

    const deletedPlan = plans.find(p => p.id === planToDelete);
    const remainingPlans = plans.filter(p => p.id !== planToDelete);

    // If the deleted plan was popular, assign popular to the next plan
    if (deletedPlan?.isPopular && remainingPlans.length > 0) {
      const nextPopularIndex = Math.min(deletedPlan.order - 1, remainingPlans.length - 1);
      remainingPlans[nextPopularIndex] = {
        ...remainingPlans[nextPopularIndex],
        isPopular: true
      };
    }

    // Reorder remaining plans
    const reorderedPlans = remainingPlans.map((plan, index) => ({
      ...plan,
      order: index + 1
    }));

    setPlans(reorderedPlans);
    setShowDeleteDialog(false);
    setPlanToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setPlanToDelete(null);
  };

  const handleSettingsSave = (newSettings: any) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pricing Management</h2>
        <div className="flex gap-4">
          <motion.button
            onClick={() => setShowSettings(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </motion.button>
          <motion.button
            onClick={handleCreate}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B5394] text-white rounded-lg hover:bg-[#094276] transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Plan</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Plan List or Editor */}
        <div className="space-y-6">
          {isEditing ? (
            <PricingPlanEditor
              plan={selectedPlan}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : showSettings ? (
            <PricingSettings
              settings={settings}
              onSave={handleSettingsSave}
              onCancel={() => setShowSettings(false)}
            />
          ) : (
            <PricingPlanList
              plans={plans}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onReorder={handleReorder}
            />
          )}
        </div>

        {/* Right Column: Preview */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
          <PricingPreview plans={plans} settings={settings} />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <DeleteConfirmDialog
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}