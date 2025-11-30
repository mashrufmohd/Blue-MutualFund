import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails, clearData } from '../store/companySlice';
import ProsConsSection from '../components/analysis/ProsConsSection';
import FinancialTable from '../components/analysis/FinancialTable';
import { BarChart3, PieChart, FileText } from 'lucide-react';

const MetricCard = ({ title, rows }) => (
  <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
    <div className="mt-4 space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{row.label}</span>
          <span className="text-lg font-semibold text-slate-900">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const PageShell = ({ children }) => (
  <div className="min-h-screen bg-[#f5f7fb]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="text-indigo-600 font-medium hover:underline">Home</Link>
        <span>/</span>
        <span className="text-slate-700">Company Analysis</span>
      </div>
      {children}
    </div>
  </div>
);

const EmptyState = ({ title, description }) => (
  <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
    <p className="text-base font-semibold text-rose-600">{title}</p>
    <p className="text-sm text-rose-500 mt-2">{description}</p>
  </div>
);

const CompanyAnalysis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCompany, loading, error } = useSelector((state) => state.company);
  const [activeTab, setActiveTab] = useState('profitandloss');

  useEffect(() => {
    dispatch(getCompanyDetails(id));
    return () => dispatch(clearData());
  }, [dispatch, id]);

  const renderLoading = () => (
    <PageShell>
      <div className="rounded-2xl bg-white shadow-sm p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500">Fetching latest company insights…</p>
        </div>
      </div>
    </PageShell>
  );

  const renderError = (message) => (
    <PageShell>
      <EmptyState
        title={message?.toLowerCase().includes('not') ? 'Company not found' : 'Unable to fetch company data'}
        description="Check the company identifier and try again."
      />
    </PageShell>
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);
  if (!currentCompany) return null;

  const { company, data } = currentCompany;

  const calculateGrowth = (financialData, field, years) => {
    if (!financialData || financialData.length < years + 1) return '%';
    const latest = parseFloat(financialData[financialData.length - 1][field]) || 0;
    const oldest = parseFloat(financialData[financialData.length - (years + 1)][field]) || 0;
    if (oldest <= 0) return '%';
    const cagr = ((Math.pow(latest / oldest, 1 / years) - 1) * 100).toFixed(0);
    return `${cagr}%`;
  };

  const metrics = {
    sales: {
      title: 'Compounded Sales Growth',
      rows: [
        { label: '3 Years', value: calculateGrowth(data?.profitandloss, 'sales', 3) },
        { label: '5 Years', value: calculateGrowth(data?.profitandloss, 'sales', 5) },
        { label: '10 Years', value: calculateGrowth(data?.profitandloss, 'sales', 10) },
      ]
    },
    profit: {
      title: 'Compounded Profit Growth',
      rows: [
        { label: '3 Years', value: calculateGrowth(data?.profitandloss, 'net_profit', 3) },
        { label: '5 Years', value: calculateGrowth(data?.profitandloss, 'net_profit', 5) },
        { label: '10 Years', value: calculateGrowth(data?.profitandloss, 'net_profit', 10) },
      ]
    },
    roe: {
      title: 'Return on Equity',
      rows: [
        { label: '3 Years', value: `${company.roe_3_years || company.roe_percentage || 0}%` },
        { label: '5 Years', value: `${company.roe_5_years || '%'}` },
        { label: '10 Years', value: '%' }
      ]
    }
  };

  return (
    <PageShell>
      <section className="bg-white rounded-3xl shadow-sm p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
              {company.company_logo ? (
                <img src={company.company_logo} alt={company.company_name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-xl font-semibold text-slate-500">{id?.slice(0, 3)?.toUpperCase()}</span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Company</p>
              <h1 className="text-3xl font-semibold text-slate-900">{company.company_name}</h1>
              <p className="text-sm text-slate-500 mt-1">Ticker: {id?.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">ROE {company.roe_percentage || '—'}%</span>
            <span className="px-4 py-2 rounded-full bg-sky-50 text-sky-600 text-sm font-medium">ROCE {company.roce_percentage || '—'}%</span>
            <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">Book Value ₹{company.book_value || '—'}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">{company.about_company}</p>
      </section>

      <section className="bg-white rounded-3xl shadow-sm p-8 space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Analysis</p>
          <h2 className="text-2xl font-semibold text-slate-900 mt-2"># Analysis Generated Using ML</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard title={metrics.sales.title} rows={metrics.sales.rows} />
          <MetricCard title={metrics.profit.title} rows={metrics.profit.rows} />
          <MetricCard title={metrics.roe.title} rows={metrics.roe.rows} />
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-sm p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-slate-900">Pros and Cons</h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Generated using Machine Learning
          </div>
        </div>
        <ProsConsSection data={data?.prosandcons || []} />
      </section>

      <section className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {[
            { id: 'profitandloss', label: 'Profit & Loss', icon: BarChart3 },
            { id: 'balancesheet', label: 'Balance Sheet', icon: PieChart },
            { id: 'cashflow', label: 'Cash Flow', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50/40' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          <FinancialTable data={data?.[activeTab]} title={activeTab} />
        </div>
      </section>

      {data?.documents?.length > 0 && (
        <section className="bg-white rounded-3xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Official filings</h3>
          <div className="flex flex-wrap gap-4">
            {data.documents.slice(0, 6).map((doc) => (
              <a
                key={doc.id}
                href={doc.Annual_Report}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-sm text-slate-600 transition"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>Annual Report {doc.Year}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
};

export default CompanyAnalysis;