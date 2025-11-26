import React, { useState } from 'react';
import CompanyCard from '../components/analysis/CompanyCard';
import { NIFTY_100 } from '../utils/companies';
import { Search, TrendingUp, Activity } from 'lucide-react';

const CompanyList = () => {
  const [search, setSearch] = useState('');

  const filtered = NIFTY_100.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 max-w-7xl mx-auto flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center py-12 mb-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
          <Activity className="w-4 h-4 text-accent-lime" />
          <span className="text-xs font-mono text-accent-lime tracking-wider">LIVE MARKET DATA</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-center mb-6 tracking-tight leading-tight">
          <span className="text-white">Analyze</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-lime to-accent-cyan">Markets</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">With Precision</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mb-12 font-light">
          Advanced machine learning insights for Nifty 100 companies. 
          Decode financial reports and market sentiment in seconds.
        </p>

        <div className="relative w-full max-w-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-lime to-accent-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-midnight-800 border border-white/10 rounded-xl p-2 shadow-2xl">
            <Search className="w-6 h-6 text-gray-400 ml-4" />
            <input 
              type="text" 
              className="w-full bg-transparent border-none text-white text-lg px-4 py-3 focus:ring-0 placeholder-gray-600 font-sans" 
              placeholder="Search ticker symbol (e.g. RELIANCE, TCS)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 mr-2">
              <span className="text-xs text-gray-400 font-mono">CMD + K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
        {filtered.map((symbol, index) => (
          <div key={symbol} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <CompanyCard symbol={symbol} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;