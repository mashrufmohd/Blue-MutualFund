const normalizeCompanyQuery = (value = '') => {
  let normalized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

  const suffixes = ['LIMITED', 'LTD', 'CORPORATION', 'CORP', 'COMPANY', 'CO', 'PLC'];
  for (const suffix of suffixes) {
    if (normalized.length - suffix.length >= 3 && normalized.endsWith(suffix)) {
      normalized = normalized.slice(0, -suffix.length);
      break;
    }
  }

  return normalized;
};

const BASE_COMPANIES = [
  { ticker: 'ABB', name: 'ABB India' },
  { ticker: 'ADANIENSOL', name: 'Adani Energy Solutions' },
  { ticker: 'ADANIENT', name: 'Adani Enterprises' },
  { ticker: 'ADANIGREEN', name: 'Adani Green Energy' },
  { ticker: 'ADANIPORTS', name: 'Adani Ports & SEZ', aliases: ['Adani Ports and Special Economic Zone'] },
  { ticker: 'AMBUJACEM', name: 'Ambuja Cements' },
  { ticker: 'APOLLOHOSP', name: 'Apollo Hospitals' },
  { ticker: 'ASIANPAINT', name: 'Asian Paints' },
  { ticker: 'AXISBANK', name: 'Axis Bank' },
  { ticker: 'BAJAJ-AUTO', name: 'Bajaj Auto' },
  { ticker: 'BAJAJFINSV', name: 'Bajaj Finserv' },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance' },
  { ticker: 'BANKBARODA', name: 'Bank of Baroda' },
  { ticker: 'BEL', name: 'Bharat Electronics' },
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel' },
  { ticker: 'BPCL', name: 'Bharat Petroleum', aliases: ['BPCL'] },
  { ticker: 'BRITANNIA', name: 'Britannia Industries' },
  { ticker: 'CIPLA', name: 'Cipla' },
  { ticker: 'COALINDIA', name: 'Coal India' },
  { ticker: 'DLF', name: 'DLF Limited' },
  { ticker: 'DMART', name: 'Avenue Supermarts', aliases: ['DMart'] },
  { ticker: 'DRREDDY', name: "Dr. Reddy's Laboratories" },
  { ticker: 'EICHERMOT', name: 'Eicher Motors' },
  { ticker: 'GAIL', name: 'GAIL India' },
  { ticker: 'GODREJCP', name: 'Godrej Consumer Products' },
  { ticker: 'GRASIM', name: 'Grasim Industries' },
  { ticker: 'HAL', name: 'Hindustan Aeronautics', aliases: ['HAL India'] },
  { ticker: 'HCLTECH', name: 'HCL Technologies' },
  { ticker: 'HDFCBANK', name: 'HDFC Bank', aliases: ['HDFC'] },
  { ticker: 'HDFCLIFE', name: 'HDFC Life Insurance', aliases: ['HDFC Life'] },
  { ticker: 'HINDALCO', name: 'Hindalco Industries' },
  { ticker: 'HINDUNILVR', name: 'Hindustan Unilever', aliases: ['HUL'] },
  { ticker: 'ICICIBANK', name: 'ICICI Bank' },
  { ticker: 'INDIGO', name: 'InterGlobe Aviation', aliases: ['IndiGo'] },
  { ticker: 'INDUSINDBK', name: 'IndusInd Bank' },
  { ticker: 'INFY', name: 'Infosys' },
  { ticker: 'ITC', name: 'ITC' },
  { ticker: 'JSWSTEEL', name: 'JSW Steel' },
  { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank', aliases: ['Kotak Bank'] },
  { ticker: 'LT', name: 'Larsen & Toubro', aliases: ['L and T'] },
  { ticker: 'LTIM', name: 'LTIMindtree' },
  { ticker: 'M&M', name: 'Mahindra & Mahindra', aliases: ['Mahindra and Mahindra'] },
  { ticker: 'MARUTI', name: 'Maruti Suzuki' },
  { ticker: 'NESTLEIND', name: 'Nestlé India', aliases: ['Nestle India'] },
  { ticker: 'NTPC', name: 'NTPC' },
  { ticker: 'ONGC', name: 'Oil and Natural Gas Corporation', aliases: ['Oil and Natural Gas', 'ONGC India'] },
  { ticker: 'POWERGRID', name: 'Power Grid Corporation' },
  { ticker: 'RELIANCE', name: 'Reliance Industries', aliases: ['Reliance'] },
  { ticker: 'SBILIFE', name: 'SBI Life Insurance' },
  { ticker: 'SBIN', name: 'State Bank of India', aliases: ['SBI'] },
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical' },
  { ticker: 'TATACONSUM', name: 'Tata Consumer Products' },
  { ticker: 'TATAMOTORS', name: 'Tata Motors' },
  { ticker: 'TATAPOWER', name: 'Tata Power' },
  { ticker: 'TATASTEEL', name: 'Tata Steel' },
  { ticker: 'TCS', name: 'Tata Consultancy Services', aliases: ['TCS'] },
  { ticker: 'TECHM', name: 'Tech Mahindra' },
  { ticker: 'TITAN', name: 'Titan Company', aliases: ['Titan'] },
  { ticker: 'ULTRACEMCO', name: 'UltraTech Cement' },
  { ticker: 'WIPRO', name: 'Wipro' },
  { ticker: 'ZOMATO', name: 'Zomato' }
];

const buildLookup = () => {
  const map = new Map();
  const register = (key, ticker) => {
    if (key) {
      map.set(normalizeCompanyQuery(key), ticker);
    }
  };

  BASE_COMPANIES.forEach(({ ticker, name, aliases = [] }) => {
    register(ticker, ticker);
    register(name, ticker);
    aliases.forEach((alias) => register(alias, ticker));
  });

  return map;
};

const COMPANY_LOOKUP = buildLookup();

export const NIFTY_100_COMPANIES = BASE_COMPANIES;

export const NIFTY_100 = BASE_COMPANIES.map(({ ticker }) => ticker);

export const findTickerByQuery = (value) => {
  const normalized = normalizeCompanyQuery(value);
  if (!normalized) return null;
  return COMPANY_LOOKUP.get(normalized) || null;
};