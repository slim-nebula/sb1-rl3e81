import { useState, useCallback } from 'react';
import { PricingPlan, PricingSettings } from '../types';
import * as storage from '../lib/storage';

export function usePricingManagement() {
  const [{ plans, settings }, setState] = useState(() => storage.getPricingData());

  const createPlan = useCallback((plan: Omit<PricingPlan, 'id' | 'order'>) => {
    const newPlan = {
      ...plan,
      id: Date.now().toString(),
      order: plans.length + 1
    } as PricingPlan;
    storage.createPricingPlan(newPlan);
    setState(prev => ({
      ...prev,
      plans: [...prev.plans, newPlan]
    }));
    return newPlan;
  }, [plans.length]);

  const updatePlan = useCallback((plan: PricingPlan) => {
    storage.updatePricingPlan(plan);
    setState(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === plan.id ? plan : p)
    }));
  }, []);

  const deletePlan = useCallback((planId: string) => {
    storage.deletePricingPlan(planId);
    setState(prev => ({
      ...prev,
      plans: prev.plans.filter(p => p.id !== planId)
    }));
  }, []);

  const updateSettings = useCallback((newSettings: PricingSettings) => {
    storage.updatePricingSettings(newSettings);
    setState(prev => ({
      ...prev,
      settings: newSettings
    }));
  }, []);

  const reorderPlans = useCallback((planId: string, direction: 'up' | 'down') => {
    const currentIndex = plans.findIndex(p => p.id === planId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= plans.length) return;

    const newPlans = [...plans];
    [newPlans[currentIndex], newPlans[newIndex]] = [newPlans[newIndex], newPlans[currentIndex]];

    const reorderedPlans = newPlans.map((plan, index) => ({
      ...plan,
      order: index + 1
    }));

    storage.savePricingData({ plans: reorderedPlans, settings });
    setState(prev => ({
      ...prev,
      plans: reorderedPlans
    }));
  }, [plans, settings]);

  return {
    plans,
    settings,
    createPlan,
    updatePlan,
    deletePlan,
    updateSettings,
    reorderPlans
  };
}