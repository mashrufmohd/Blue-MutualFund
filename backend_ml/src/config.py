import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # API Configuration
    API_BASE_URL = os.getenv("API_BASE_URL", "https://bluemutualfund.in/server/api/company.php")
    API_KEY = os.getenv("API_KEY", "ghfkffu6378382826hhdjgk")
    
    # Database Configuration (TiDB Cloud - MySQL compatible)
    DB_URI = os.getenv("DB_URI")
    if not DB_URI:
        raise ValueError("DB_URI environment variable is not set")
    
    # ML Logic Thresholds
    GROWTH_THRESHOLD = 10.0  # 10%
    ROE_THRESHOLD = 15.0     # 15%
    DEBT_FREE_LIMIT = 1.0    # Values below 1cr considered zero debt
    
    # File Paths
    DATA_FILE = os.path.join("data", "Nifty100Companies.xlsx")
    LOG_FILE = os.path.join("logs", "process.log")