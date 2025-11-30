import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';
const LOCAL_BASE = API_URL ? `${API_URL}/api/company` : '/api/company';
const FALLBACK_URL = 'https://bluemutualfund.in/server/api/company.php';
const FALLBACK_KEY = import.meta.env.VITE_STOCK_API_KEY || 'ghfkffu6378382826hhdjgk';

const fetchFromLocal = async (companyId) => {
  const response = await axios.get(`${LOCAL_BASE}/${companyId}`, { timeout: 15000 });
  if (response.data && response.data.company) {
    return response.data;
  }
  throw new Error('Invalid data structure received from local API');
};

const fetchFromFallback = async (companyId) => {
  const response = await axios.get(FALLBACK_URL, {
    timeout: 15000,
    params: {
      id: companyId,
      api_key: FALLBACK_KEY
    }
  });
  if (response.data && response.data.company) {
    return response.data;
  }
  throw new Error('Invalid data structure received from fallback API');
};

export const fetchCompanyData = async (companyId) => {
  try {
    return await fetchFromLocal(companyId);
  } catch (localError) {
    console.warn(`Local API unavailable for ${companyId}. Falling back to StockTicker endpoint.`, localError?.message || localError);
    return fetchFromFallback(companyId);
  }
};