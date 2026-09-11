import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Aurora Fluid Blob 1: Golden Amber Flow */}
      <div 
        className="absolute -top-32 -left-28 w-[500px] h-[500px] rounded-full blur-[100px] opacity-70 dark:opacity-40 animate-liquid-blob-1 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* Aurora Fluid Blob 2: Deep Navy & Electric Blue Wave */}
      <div 
        className="absolute top-1/3 -right-36 w-[550px] h-[550px] rounded-full blur-[110px] opacity-60 dark:opacity-45 animate-liquid-blob-2 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(14, 116, 144, 0.25) 0%, rgba(11, 27, 54, 0.35) 50%, transparent 80%)',
        }}
      />

      {/* Aurora Fluid Blob 3: Center Bottom Fluid Pool */}
      <div 
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-50 dark:opacity-30 animate-liquid-blob-3 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
