import React from 'react';

const FinancialTable = ({ data, title }) => {
  if (!data || data.length === 0) return (
    <div className="text-center py-12 text-gray-500 font-mono text-sm">NO DATA AVAILABLE FOR THIS METRIC</div>
  );

  // Extract headers dynamically, excluding ID fields
  const headers = Object.keys(data[0]).filter(k => !['id', 'company_id'].includes(k));
  
  // Show only last 5 entries (Years)
  const displayData = data.slice(-5);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-6 py-4 whitespace-nowrap font-mono tracking-wider first:sticky first:left-0 first:bg-midnight-800 first:z-10">
                {h.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {displayData.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors group">
              {headers.map((h, idx) => (
                <td 
                  key={h} 
                  className={`px-6 py-4 whitespace-nowrap font-mono text-gray-300 group-hover:text-white transition-colors ${idx === 0 ? 'sticky left-0 bg-midnight-800 z-10 group-hover:bg-midnight-700' : ''}`}
                >
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;