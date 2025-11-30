import React from 'react';

const FinancialTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-mono text-sm">
        NO DATA AVAILABLE FOR THIS METRIC
      </div>
    );
  }

  const headers = Object.keys(data[0]).filter((key) => !['id', 'company_id'].includes(key));
  const displayData = data.slice(-5);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm overflow-hidden">
      <div className="financial-scroll overflow-x-auto bg-white">
        <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm text-left">
          <thead className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500 bg-slate-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={header}
                  className={`px-5 py-4 whitespace-nowrap ${
                    idx === 0
                      ? 'sticky left-0 z-20 bg-[#070b1e] text-white rounded-tl-[32px]'
                      : 'bg-slate-50'
                  }`}
                >
                  {header.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-slate-100 last:border-b-0 odd:bg-white even:bg-slate-50/60 hover:bg-indigo-50/40 transition-colors"
              >
                {headers.map((header, colIdx) => (
                  <td
                    key={`${header}-${rowIdx}`}
                    className={`px-5 py-4 whitespace-nowrap font-semibold ${
                      colIdx === 0
                        ? `sticky left-0 z-10 bg-[#070b1e] text-white tracking-[0.2em] ${
                            rowIdx === displayData.length - 1 ? 'rounded-bl-[32px]' : ''
                          }`
                        : 'text-right text-slate-700'
                    }`}
                  >
                    {row[header] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;