import os
from pathlib import Path
from dotenv import load_dotenv

BACKEND_ROOT = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_ROOT / ".env")


class Config:
    API_BASE_URL = os.getenv("API_BASE_URL", "https://bluemutualfund.in/server/api/company.php")
    API_KEY = os.getenv("API_KEY", "ghfkffu6378382826hhdjgk")

    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/financial-analysis")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "financial_analysis")
    MONGO_COLLECTION = os.getenv("MONGO_COLLECTION", "ml_analysis")

    GROWTH_THRESHOLD = 10.0
    ROE_THRESHOLD = 15.0
    DEBT_FREE_LIMIT = 1.0

    DATA_FILE = str(BACKEND_ROOT / "data" / "Nifty100Companies.xlsx")
    LOG_FILE = str(BACKEND_ROOT / "logs" / "process.log")