import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findTickerByQuery } from '../utils/companies';
import { Search } from 'lucide-react';

const exampleCompanies = [
  { label: 'HDFC Bank', value: 'HDFCBANK' },
  { label: 'TCS', value: 'TCS' },
  { label: 'Infosys', value: 'INFY' },
  { label: 'Wipro', value: 'WIPRO' },
  { label: 'SBI Life Insurance', value: 'SBILIFE' }
];

const CompanyList = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateAndNavigate = (value) => {
    const ticker = findTickerByQuery(value);
    if (!ticker) {
      setError('Company not found in the Nifty 100 coverage set. Try a different name or ticker.');
      return;
    }
    setError('');
    navigate(`/analysis/${ticker}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAndNavigate(search);
  };

  return (
    <div className="bg-white text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <img
          src={encodeURI('/Screenshot 2025-11-27 202036.png')}
          alt="Stock analytics illustration"
          className="w-72 sm:w-96 md:w-[420px] drop-shadow-2xl"
        />

        <h1 className="mt-10 text-3xl md:text-5xl font-semibold leading-tight">
          Find the best with
          <span className="block text-4xl md:text-6xl font-extrabold text-slate-900 mt-2">
            <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-2xl bg-[#6C35FF] text-white">Stock Analytics</span>
          </span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl">
          Discover Nifty 100 companies with curated ML insights. Track fundamentals, compare peers,
          and search instantly with our smart console.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            Browse all companies
            <span aria-hidden="true">→</span>
          </Link>
          <span className="w-px h-4 bg-slate-200" aria-hidden="true"></span>
          <Link
            to="/analysis-info"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700"
          >
            How analysis works
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-3xl">
          <div className="flex items-center gap-4 px-5 py-4 rounded-3xl border border-slate-200 shadow-xl bg-white">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              className="flex-1 bg-transparent text-lg text-slate-700 placeholder-slate-400 focus:outline-none"
              placeholder="Search for a company"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              Analyze
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>

        <div className="mt-6">
          <p className="text-sm text-slate-400 mb-3">For Example :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleCompanies.map((company) => (
              <button
                key={company.value}
                type="button"
                onClick={() => {
                  setSearch(company.label);
                  setError('');
                  navigate(`/analysis/${company.value}`);
                }}
                className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition"
              >
                {company.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;