import React from 'react';
import { Building2, Users, Award } from 'lucide-react';

export function TrustBadges() {
  return (
    <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-16 mt-16">
      <div className="flex items-center space-x-2">
        <Building2 className="w-5 h-5 text-[#0B5394]" />
        <span className="text-white text-sm font-medium">500+ Realtors Trust Us</span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-[#0B5394]" />
        <span className="text-white text-sm font-medium">50,000+ Tours Created</span>
      </div>
      <div className="flex items-center space-x-2">
        <Award className="w-5 h-5 text-[#0B5394]" />
        <span className="text-white text-sm font-medium">#1 in Customer Satisfaction</span>
      </div>
    </div>
  );
}