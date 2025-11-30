import React from 'react';

const ProsConsSection = ({ data }) => {
  const validPros = data.filter((item) => item.pros && item.pros !== 'NULL');
  const validCons = data.filter((item) => item.cons && item.cons !== 'NULL');

  const renderList = (items, emptyLabel) => (
    <ul className="space-y-3 text-sm leading-relaxed">
      {items.length > 0 ? (
        items.map((entry, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-1 text-base">•</span>
            <span>{entry}</span>
          </li>
        ))
      ) : (
        <li className="text-slate-600/80 italic">{emptyLabel}</li>
      )}
    </ul>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl bg-teal-500 text-white shadow-sm p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Pros</p>
        <h3 className="text-xl font-semibold mt-2 mb-4">What the company does well</h3>
        {renderList(validPros.map((item) => item.pros), 'No stand-out strengths detected yet.')}
      </div>

      <div className="rounded-2xl bg-rose-500 text-white shadow-sm p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Cons</p>
        <h3 className="text-xl font-semibold mt-2 mb-4">Where caution is needed</h3>
        {renderList(validCons.map((item) => item.cons), 'No major risks identified yet.')}
      </div>
    </div>
  );
};

export default ProsConsSection;