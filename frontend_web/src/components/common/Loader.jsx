import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-accent-lime border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-4 border-4 border-b-accent-cyan border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-reverse"></div>
      </div>
      <span className="text-accent-lime font-mono text-sm animate-pulse tracking-widest">PROCESSING DATA...</span>
    </div>
  );
};

export default Loader;