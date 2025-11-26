import axios from 'axios';

// Use environment variable for API URL, fallback to local proxy
const API_URL = import.meta.env.VITE_API_URL || '';
const BASE_URL = `${API_URL}/api/company`;

export const fetchCompanyData = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyId}`, {
      timeout: 15000 // 15s timeout
    });

    if (response.data && response.data.company) {
      return response.data;
    } else {
      throw new Error("Invalid data structure received");
    }
  } catch (error) {
    console.error(`API Fetch Error for ${companyId}:`, error);
    throw error;
  }
};