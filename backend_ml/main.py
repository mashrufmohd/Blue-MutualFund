import pandas as pd
import logging
from tqdm import tqdm
from src.config import Config
from src.fetcher import DataFetcher
from src.processor import MLProcessor
from src.db_manager import DBManager

# Setup Logging
logging.basicConfig(
    filename=Config.LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
console = logging.StreamHandler()
console.setLevel(logging.INFO)
logging.getLogger('').addHandler(console)

def main():
    print("------------------------------------------------")
    print("   Financial ML Analysis Engine v1.0 Started    ")
    print("------------------------------------------------")

    # 1. Initialize Modules
    fetcher = DataFetcher()
    processor = MLProcessor()
    db = DBManager()

    # 2. Load Company List
    try:
        # Assuming Excel has a column 'company_id'
        df_companies = pd.read_excel(Config.DATA_FILE)
        company_ids = df_companies['company_id'].dropna().unique().tolist()
        print(f"Loaded {len(company_ids)} companies from {Config.DATA_FILE}")
    except Exception as e:
        logging.critical(f"Failed to load Excel file: {str(e)}")
        return

    # 3. Processing Loop
    success_count = 0
    
    # tqdm creates a nice visual progress bar in the terminal
    for company_id in tqdm(company_ids, desc="Analyzing Companies"):
        try:
            # A. Fetch
            raw_data = fetcher.fetch_company_details(company_id)
            if not raw_data:
                logging.warning(f"Skipping {company_id}: No data fetched")
                continue

            # B. Process (ML)
            analysis_result = processor.process_financials(raw_data)
            
            # C. Save to DB
            db.save_analysis(analysis_result)
            
            success_count += 1
            
        except Exception as e:
            logging.error(f"Critical failure processing {company_id}: {str(e)}")

    print("------------------------------------------------")
    print(f"Analysis Complete.")
    print(f"Successfully Processed: {success_count}/{len(company_ids)}")
    print(f"Check logs at: {Config.LOG_FILE}")
    print("------------------------------------------------")

if __name__ == "__main__":
    main()