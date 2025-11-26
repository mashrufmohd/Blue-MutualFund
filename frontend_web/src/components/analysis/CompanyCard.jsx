import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, BarChart2 } from 'lucide-react';

const CompanyCard = ({ symbol }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/analysis/${symbol}`)}
      className="glass-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-lime/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-accent-lime/10"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-lime/50 transition-colors">
          <BarChart2 className="text-gray-400 w-6 h-6 group-hover:text-accent-lime transition-colors" />
        </div>
        <span className="bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider">NSE</span>
      </div>
      
      <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-accent-lime transition-colors">{symbol}</h3>
      <p className="text-sm text-gray-400 mb-6 font-light">AI-powered financial analysis and market sentiment decoding.</p>
      
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-xs font-mono text-gray-500">REAL-TIME</span>
        <div className="flex items-center text-white font-medium text-sm group-hover:text-accent-lime transition-colors">
          <span className="mr-2">Analyze</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;