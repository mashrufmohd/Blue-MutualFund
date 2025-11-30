import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Brain, BarChart3, CheckCircle2, Sparkles } from 'lucide-react';

const workflow = [
  {
    title: 'Fetch Financial Data',
    icon: Database,
    description:
      'We pull Balance Sheet, Profit & Loss, and Cash Flow statements for each selected Nifty 100 company by calling the backend API in sequence.',
    bullets: [
      'Company IDs are queued and dispatched to the FastAPI service.',
      'Each response includes decade-long time-series data for core metrics.',
      'Documents such as annual reports are cached for quick access.'
    ]
  },
  {
    title: 'Perform Machine Learning Operations',
    icon: Brain,
    description:
      'The processor runs lightweight ML routines to classify every metric into strengths and risks based on adaptive thresholds.',
    bullets: [
      'Highlights are tagged as Pros when metrics stay above the 10% band.',
      'Red flags become Cons whenever performance drops below 10%.',
      'Narratives are generated dynamically to keep the copy human-friendly.'
    ]
  },
  {
    title: 'Synthesize the Analysis',
    icon: BarChart3,
    description:
      'Finally we stitch metrics, pros/cons, and documents into a single report that powers the Company Analysis screen.',
    bullets: [
      '3, 5, and 10 year compounded growth trends.',
      'Return on equity, dividend history, and book value diagnostics.',
      'Linked annual reports so users can audit the raw filings.'
    ]
  }
];

const sampleMetrics = [
  {
    title: 'Compounded Sales Growth',
    color: 'from-indigo-100 via-indigo-50 to-white',
    stats: [
      { label: '3 Years', value: '52%' },
      { label: '5 Years', value: '58%' },
      { label: '10 Years', value: '62%' }
    ]
  },
  {
    title: 'Compounded Profit Growth',
    color: 'from-purple-100 via-purple-50 to-white',
    stats: [
      { label: '3 Years', value: '31%' },
      { label: '5 Years', value: '36%' },
      { label: '10 Years', value: '41%' }
    ]
  },
  {
    title: 'Return on Equity',
    color: 'from-sky-100 via-sky-50 to-white',
    stats: [
      { label: '3 Years', value: '27%' },
      { label: '5 Years', value: '24%' },
      { label: '10 Years', value: '19%' }
    ]
  }
];

const pros = [
  'Company manages debt conservatively.',
  'Consistent ROE track record above 25% for 3 years.',
  'Healthy dividend payout maintained above 60%.',
  'Median sales growth of 28% over the last decade.'
];

const cons = [
  'Net sales growth dipped below 10% in the last 5 years.',
  'Dividends paused for one fiscal year.',
  'Return on equity cooled down to 8% in the last 3 years.'
];

const AnalysisOverview = () => {
  return (
    <div className="bg-white text-slate-900">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Analysis Workflow
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight">
          How BlueMutualFund generates <span className="text-indigo-600">AI-backed</span> insights
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto">
          Every company page is backed by a repeatable pipeline—fetch filings, run ML scoring, and surface only the clearest KPIs.
          Use this guide to understand what happens behind the scenes before you click <span className="font-semibold">Analyze</span>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/companies"
            className="px-6 py-3 rounded-full bg-white text-slate-700 border border-slate-200 text-sm font-semibold hover:border-slate-300"
          >
            Browse Companies
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">Project Workflow</h2>
          <p className="mt-2 text-slate-500 text-center max-w-3xl mx-auto">
            Three structured phases keep data accurate and insights trustworthy.
          </p>
          <div className="mt-10 space-y-8">
            {workflow.map((step, index) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">Step {index + 1}</p>
                    <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">{step.description}</p>
                <ul className="mt-4 space-y-2">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 lg:grid-cols-3">
          {sampleMetrics.map((metric) => (
            <div
              key={metric.title}
              className={`rounded-3xl bg-gradient-to-br ${metric.color} p-6 shadow-[0_30px_80px_rgba(99,102,241,0.15)] border border-white`}
            >
              <p className="text-xs uppercase tracking-widest text-slate-500">Analysis</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{metric.title}</h3>
              <div className="mt-6 space-y-4">
                {metric.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm text-slate-600">
                    <span>{stat.label}</span>
                    <span className="text-lg font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-6 shadow-[0_30px_80px_rgba(16,185,129,0.2)]">
            <p className="text-xs uppercase tracking-widest text-emerald-600">Pros</p>
            <h3 className="mt-2 text-xl font-semibold text-emerald-900">Generated using ML</h3>
            <ul className="mt-4 space-y-3 text-emerald-800 text-sm">
              {pros.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-rose-50 border border-rose-100 p-6 shadow-[0_30px_80px_rgba(244,63,94,0.2)]">
            <p className="text-xs uppercase tracking-widest text-rose-600">Cons</p>
            <h3 className="mt-2 text-xl font-semibold text-rose-900">Automatic alerts</h3>
            <ul className="mt-4 space-y-3 text-rose-800 text-sm">
              {cons.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Ready to explore a live report?</h2>
          <p className="mt-3 text-slate-300">
            Jump into any company and watch the workflow above populate real data, or keep browsing to discover more tickers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/analysis/HDFCBANK"
              className="px-6 py-3 rounded-full bg-lime-400 text-slate-900 font-semibold shadow-lg shadow-lime-600/30"
            >
              View Sample Analysis
            </Link>
            <Link
              to="/companies"
              className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10"
            >
              Browse all companies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalysisOverview;
