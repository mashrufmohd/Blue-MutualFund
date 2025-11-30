import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { NIFTY_DIRECTORY } from '../utils/companyDirectory';

const PAGE_SIZE = 10;

const getLogoFromWebsite = (website) => {
  try {
    const hostname = new URL(website).hostname;
    return `https://logo.clearbit.com/${hostname}`;
  } catch (error) {
    return null;
  }
};

const CompanyDirectory = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(NIFTY_DIRECTORY.length / PAGE_SIZE);

  const currentSlice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return NIFTY_DIRECTORY.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <div className="bg-white text-slate-900 min-h-[calc(100vh-5rem)] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-slate-400">Directory</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
            All Companies <span className="text-slate-400">/</span>{' '}
            <span className="inline-flex items-center px-2 py-1 rounded-xl bg-blue-100 text-blue-700 text-lg">Nifty 100</span>
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Logos auto-fetched via Clearbit; click any website to open the official portal.
          </p>
        </header>

        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <span className="text-sm text-slate-500">Showing {currentSlice.length} of {NIFTY_DIRECTORY.length} companies</span>
          <Link to="/" className="text-sm text-indigo-500 hover:text-indigo-600">← Back to search</Link>
        </div>

        <nav className="flex justify-center gap-2 mb-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition border ${
                page === number
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {number}
            </button>
          ))}
        </nav>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="px-6 py-3 font-semibold">Symbol</th>
                <th className="px-6 py-3 font-semibold">Logo</th>
                <th className="px-6 py-3 font-semibold">Company Name</th>
                <th className="px-6 py-3 font-semibold">Website</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {currentSlice.map((company) => {
                const logo = getLogoFromWebsite(company.website);
                return (
                  <tr key={company.symbol} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-700">{company.symbol}</td>
                    <td className="px-6 py-4">
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${company.symbol} logo`}
                          className="w-10 h-10 object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          {company.symbol.slice(0, 2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-blue-700 font-medium">
                      <a href={company.website} target="_blank" rel="noreferrer" className="hover:underline">
                        {company.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700"
                      >
                        {company.website.replace('https://', '').replace('http://', '')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyDirectory;
