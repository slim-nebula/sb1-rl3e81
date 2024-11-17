import React from 'react';
import { VideoBackground } from './VideoBackground';
import { CTAButtons } from './CTAButtons';
import { TrustBadges } from './TrustBadges';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <VideoBackground />
      
      <div className="relative z-20 container mx-auto px-4 py-32">
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Revolutionize Real Estate with
              <span className="block text-[#0B5394] mt-2 animate-float drop-shadow-lg">
                Stunning Virtual Tours!
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white leading-relaxed font-light max-w-2xl mx-auto">
              Empower realtors to create immersive property experiences effortlessly
            </p>
          </div>

          <div className="max-w-xl">
            <CTAButtons />
            <TrustBadges />
          </div>
        </div>
      </div>
    </section>
  );
}