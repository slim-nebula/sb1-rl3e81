import React from 'react';
import { Play } from 'lucide-react';

export function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
      <button className="px-10 py-4 bg-[#0B5394] text-white rounded-full font-semibold transform transition-all hover:bg-[#094276] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0B5394] focus:ring-opacity-50 shadow-xl text-lg">
        Start for Free
      </button>
      <button className="group px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold transform transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center space-x-3 shadow-xl text-lg">
        <Play className="w-5 h-5" />
        <span>Watch Demo</span>
      </button>
    </div>
  );
}