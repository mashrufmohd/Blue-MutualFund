import pandas as pd
import logging
from pathlib import Path
from tqdm import tqdm
from src.config import Config
from src.fetcher import DataFetcher
from src.processor import MLProcessor
from src.db_manager import DBManager

log_path = Path(Config.LOG_FILE)
log_path.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    filename=str(log_path),
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

    fetcher = DataFetcher()
    processor = MLProcessor()
    db = DBManager()

    try:
        df_companies = pd.read_excel(Config.DATA_FILE)
        company_ids = df_companies['company_id'].dropna().unique().tolist()
        print(f"Loaded {len(company_ids)} companies from {Config.DATA_FILE}")
    except Exception as e:
        logging.critical(f"Failed to load Excel file: {str(e)}")
        return

    success_count = 0
    
    for company_id in tqdm(company_ids, desc="Analyzing Companies"):
        try:
            raw_data = fetcher.fetch_company_details(company_id)
            if not raw_data:
                logging.warning(f"Skipping {company_id}: No data fetched")
                continue

            analysis_result = processor.process_financials(raw_data)
            
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