import React from 'react';

export function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/45 z-10" />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{ 
          width: '100%',
          height: '100%'
        }}
      >
        <source
          src="https://res.cloudinary.com/dbqgetyu3/video/upload/v1731188076/hero_section_vid_qea1hg.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}