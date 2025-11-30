import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ variant = 'dark' }) => {
  const isLight = variant === 'light';
  const navBase = isLight
    ? 'bg-white border-b border-slate-200 shadow-sm'
    : 'glass-panel border-b border-white/5';
  const titleClass = isLight
    ? 'text-slate-900'
    : 'text-white group-hover:text-accent-lime';
  const subtitleClass = isLight ? 'text-[10px] uppercase tracking-widest text-slate-400 font-mono' : 'text-[10px] uppercase tracking-widest text-gray-400 font-mono';
  const linkClass = isLight
    ? 'text-sm font-medium text-slate-600 hover:text-slate-900'
    : 'text-sm font-medium text-gray-300 hover:text-white';
  const dividerClass = isLight ? 'bg-slate-200' : 'bg-white/10';
  const statusWrapper = isLight
    ? 'bg-slate-100 border border-slate-200'
    : 'bg-white/5 border border-white/10';
  const statusText = isLight ? 'text-xs font-mono text-slate-600' : 'text-xs font-mono text-gray-300';
  const statusDot = isLight ? 'bg-green-500' : 'bg-accent-lime';
  const logoFrame = isLight
    ? 'border-slate-200 bg-white shadow-slate-200/60'
    : 'border-white/20 bg-white/10 shadow-black/60';
  const blueText = isLight ? 'text-slate-900' : 'text-white';
  const gradientText = isLight
    ? 'from-[#4d68ff] to-[#a26dff]'
    : 'from-[#7da4ff] to-[#d6a6ff]';

  return (
    <nav className={`sticky top-0 z-40 w-full transition-colors ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-3xl border flex items-center justify-center transition ${logoFrame}`}
              >
                <img
                  src="/logo.png"
                  alt="BlueMutualFund logo"
                  className="w-10 h-10 rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-bold text-xl tracking-tight transition-colors flex items-center gap-1 ${titleClass}`}>
                  <span className={blueText}>Blue</span>
                  <span className={`bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>MutualFund</span>
                </span>
                <span className={subtitleClass}>Stock Analytics</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${linkClass} transition-colors relative group`}>
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-lime transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/companies" className={`${linkClass} transition-colors relative group`}>
              Companies
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/analysis-info" className={`${linkClass} transition-colors relative group`}>
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
            </Link>
            <div className={`h-4 w-px ${dividerClass}`}></div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusWrapper}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${statusDot}`}></div>
              <span className={statusText}>SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;