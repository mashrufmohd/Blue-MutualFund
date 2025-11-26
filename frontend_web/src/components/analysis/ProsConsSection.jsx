import React from 'react';
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

const ProsConsSection = ({ data }) => {
  // Filter out NULL or empty strings
  const validPros = data.filter(i => i.pros && i.pros !== "NULL");
  const validCons = data.filter(i => i.cons && i.cons !== "NULL");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pros Card */}
      <div className="glass-card rounded-xl p-1 border-l-4 border-l-accent-lime group">
        <div className="bg-accent-lime/5 p-6 h-full rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent-lime/10 text-accent-lime">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-bold text-white">Strengths</h2>
          </div>
          
          {validPros.length > 0 ? (
            <div className="space-y-4">
              {validPros.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group/item">
                  <CheckCircle className="w-5 h-5 text-accent-lime shrink-0 mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {item.pros}
                  </p>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-500 italic text-sm">No specific strengths detected.</p>}
        </div>
      </div>

      {/* Cons Card */}
      <div className="glass-card rounded-xl p-1 border-l-4 border-l-accent-pink group">
        <div className="bg-accent-pink/5 p-6 h-full rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent-pink/10 text-accent-pink">
              <ThumbsDown className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-bold text-white">Risks</h2>
          </div>
          
          {validCons.length > 0 ? (
            <div className="space-y-4">
              {validCons.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group/item">
                  <XCircle className="w-5 h-5 text-accent-pink shrink-0 mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {item.cons}
                  </p>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-500 italic text-sm">No major risks detected.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProsConsSection;