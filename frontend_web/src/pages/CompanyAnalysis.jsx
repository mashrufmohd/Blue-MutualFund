import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails, clearData } from '../store/companySlice';
import ProsConsSection from '../components/analysis/ProsConsSection';
import FinancialTable from '../components/analysis/FinancialTable';
import { ArrowLeft, FileText, BarChart3, PieChart, TrendingUp, Activity, Layers } from 'lucide-react';

const CompanyAnalysis = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCompany, loading, error } = useSelector((state) => state.company);
  const [activeTab, setActiveTab] = useState('profitandloss');

  useEffect(() => {
    dispatch(getCompanyDetails(id));
    return () => dispatch(clearData());
  }, [dispatch, id]);

  if (loading) return (
    <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-accent-lime/20 border-t-accent-lime rounded-full animate-spin mb-4"></div>
      <div className="text-accent-lime font-mono animate-pulse">INITIALIZING NEURAL LINK...</div>
    </div>
  );
  
  if (error) return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="glass-panel p-8 rounded-xl border-red-500/30 text-center">
        <div className="text-red-500 font-mono mb-2">SYSTEM ERROR</div>
        <div className="text-gray-400">{error}</div>
      </div>
    </div>
  );

  if (!currentCompany) return null;

  const { company, data } = currentCompany;

  // Calculate 3, 5, 10 year growth metrics
  const calculateGrowth = (financialData, field, years) => {
    if (!financialData || financialData.length < years + 1) return '%';
    const latest = parseFloat(financialData[financialData.length - 1][field]) || 0;
    const oldest = parseFloat(financialData[financialData.length - (years + 1)][field]) || 0;
    if (oldest <= 0) return '%';
    const cagr = ((Math.pow(latest / oldest, 1 / years) - 1) * 100).toFixed(0);
    return `${cagr}%`;
  };

  const salesGrowth3y = calculateGrowth(data?.profitandloss, 'sales', 3);
  const salesGrowth5y = calculateGrowth(data?.profitandloss, 'sales', 5);
  const salesGrowth10y = calculateGrowth(data?.profitandloss, 'sales', 10);
  
  const profitGrowth3y = calculateGrowth(data?.profitandloss, 'net_profit', 3);
  const profitGrowth5y = calculateGrowth(data?.profitandloss, 'net_profit', 5);
  const profitGrowth10y = calculateGrowth(data?.profitandloss, 'net_profit', 10);

  return (
    <div className="pb-20 animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-white/5 bg-midnight-800/50 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-accent-lime mb-6 text-sm font-mono transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO DASHBOARD
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-24 h-24 bg-white rounded-2xl p-4 shadow-lg shadow-black/20 flex items-center justify-center">
              <img src={company.company_logo} alt={id} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">{company.company_name}</h1>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="px-4 py-1.5 rounded-full bg-accent-lime/10 border border-accent-lime/20 text-accent-lime text-sm font-mono">
                  ROE: {company.roe_percentage}%
                </div>
                <div className="px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-mono">
                  ROCE: {company.roce_percentage}%
                </div>
                <div className="px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm font-mono">
                  BV: ₹{company.book_value}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-4xl font-light border-l-2 border-white/10 pl-4">
                {company.about_company}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Analysis Section */}
        <div className="glass-card rounded-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-accent-cyan" />
            <h2 className="text-2xl font-display font-bold text-white">Growth Analysis</h2>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-gray-400">ML GENERATED</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Compounded Sales Growth */}
            <div className="bg-midnight-900/50 border border-white/5 rounded-xl p-6 hover:border-accent-lime/30 transition-colors group">
              <h3 className="text-gray-400 font-mono text-xs mb-4 uppercase tracking-wider group-hover:text-accent-lime transition-colors">Compounded Sales Growth</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">3 Years</span>
                  <span className="text-xl font-mono text-white">{salesGrowth3y}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-lime/50" style={{ width: salesGrowth3y !== '%' ? salesGrowth3y : '0%' }}></div>
                </div>
                
                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-500 text-sm">5 Years</span>
                  <span className="text-lg font-mono text-gray-300">{salesGrowth5y}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">10 Years</span>
                  <span className="text-lg font-mono text-gray-300">{salesGrowth10y}</span>
                </div>
              </div>
            </div>

            {/* Compounded Profit Growth */}
            <div className="bg-midnight-900/50 border border-white/5 rounded-xl p-6 hover:border-accent-purple/30 transition-colors group">
              <h3 className="text-gray-400 font-mono text-xs mb-4 uppercase tracking-wider group-hover:text-accent-purple transition-colors">Compounded Profit Growth</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">3 Years</span>
                  <span className="text-xl font-mono text-white">{profitGrowth3y}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-purple/50" style={{ width: profitGrowth3y !== '%' ? profitGrowth3y : '0%' }}></div>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-500 text-sm">5 Years</span>
                  <span className="text-lg font-mono text-gray-300">{profitGrowth5y}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">10 Years</span>
                  <span className="text-lg font-mono text-gray-300">{profitGrowth10y}</span>
                </div>
              </div>
            </div>

            {/* Return on Equity */}
            <div className="bg-midnight-900/50 border border-white/5 rounded-xl p-6 hover:border-accent-cyan/30 transition-colors group">
              <h3 className="text-gray-400 font-mono text-xs mb-4 uppercase tracking-wider group-hover:text-accent-cyan transition-colors">Return on Equity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">3 Years</span>
                  <span className="text-xl font-mono text-white">{company.roe_3_years || company.roe_percentage || 0}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan/50" style={{ width: `${Math.min(parseFloat(company.roe_3_years || 0), 100)}%` }}></div>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-500 text-sm">5 Years</span>
                  <span className="text-lg font-mono text-gray-300">{company.roe_5_years || '%'}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-sm">10 Years</span>
                  <span className="text-lg font-mono text-gray-300">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pros and Cons Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-accent-pink" />
            <h2 className="text-2xl font-display font-bold text-white">Strategic Assessment</h2>
          </div>
          <ProsConsSection data={data?.prosandcons || []} />
        </div>

        {/* Financial Tabs */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="flex border-b border-white/10 bg-midnight-900/50">
            {[
              { id: 'profitandloss', label: 'Profit & Loss', icon: BarChart3 },
              { id: 'balancesheet', label: 'Balance Sheet', icon: PieChart },
              { id: 'cashflow', label: 'Cash Flow', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-6 text-sm font-medium transition-all relative overflow-hidden ${
                  activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-lime/10 to-transparent"></div>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]"></div>
                )}
                <tab.icon className={`w-4 h-4 mr-2 ${activeTab === tab.id ? 'text-accent-lime' : ''}`} />
                <span className="font-mono tracking-wide uppercase">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="p-8 bg-midnight-800/30">
            <FinancialTable data={data?.[activeTab]} title={activeTab} />
          </div>
        </div>

        {/* Documents */}
        <div className="mt-12">
            <h3 className="text-lg font-mono font-bold text-gray-400 mb-6 uppercase tracking-wider">Official Filings</h3>
            <div className="flex flex-wrap gap-4">
              {data?.documents?.slice(0, 6).map((doc) => (
                 <a 
                   key={doc.id}
                   href={doc.Annual_Report} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center px-5 py-3 bg-midnight-800 border border-white/10 rounded-lg hover:border-accent-lime/50 hover:shadow-[0_0_15px_rgba(204,255,0,0.1)] transition-all text-sm text-gray-300 group"
                 >
                   <FileText className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-400" />
                   <span className="font-mono">Annual Report {doc.Year}</span>
                 </a>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyAnalysis;