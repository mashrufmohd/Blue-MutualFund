import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-lime to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-lime/20 group-hover:shadow-accent-lime/40 transition-all duration-300">
                <span className="font-display font-bold text-midnight-900 text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-accent-lime transition-colors">Market<span className="text-accent-cyan">Mind</span></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Financial Intelligence</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-lime transition-all group-hover:w-full"></span>
            </Link>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse"></div>
              <span className="text-xs font-mono text-gray-300">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;