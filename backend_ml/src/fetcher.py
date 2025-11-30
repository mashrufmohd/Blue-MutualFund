import requests
import time
import logging
from .config import Config

class DataFetcher:
    def __init__(self):
        self.session = requests.Session()
        self.headers = {
            'User-Agent': 'FinancialMLBot/1.0',
            'Accept': 'application/json'
        }

    def fetch_company_details(self, company_id: str, retries=3):
        """
        Fetches raw financial data from the API with exponential backoff.
        """
        url = Config.API_BASE_URL
        params = {
            'id': company_id,
            'api_key': Config.API_KEY
        }

        for attempt in range(retries):
            try:
                response = self.session.get(url, params=params, headers=self.headers, timeout=10)
                
                if response.status_code == 200:
                    try:
                        data = response.json()
                        if not data or 'data' not in data:
                            raise ValueError("Empty or Invalid JSON structure")
                        return data
                    except ValueError:
                        logging.warning(f"Invalid JSON received for {company_id}")
                        return None
                elif response.status_code == 429:
                    time.sleep(2 ** attempt)
                else:
                    logging.error(f"API Error {response.status_code} for {company_id}")
            
            except requests.exceptions.RequestException as e:
                logging.error(f"Network error fetching {company_id}: {str(e)}")
                time.sleep(2)
        
        return None