# Machine Learning Financial Analysis Project

## Project Overview

This project fetches financial data (Balance Sheet, Profit & Loss, Cash Flow) from the StockTicker API, performs machine learning operations to generate insights, and stores results in a MySQL database. Real-time analysis is displayed in the terminal and on a web application for easy access and visualization.

## Tech Stack

- **Programming Language**: Python 3.8+
- **Database**: TiDB Cloud (MySQL Compatible)
- **Tools**: VS Code
- **Packages**: Pandas, Requests, SQLAlchemy, PyMySQL, openpyxl, tqdm
- **Frontend Web App**: React + Vite + Redux Toolkit + Tailwind CSS

## API Documentation

### Base URL
```
https://bluemutualfund.in/server/api/company.php
```

### API Parameters
- `id={company_id}` (e.g., TCS, HDFCBANK, DMART)
- `api_key=ghfkffu6378382826hhdjgk`

### Sample API Call
```
https://bluemutualfund.in/server/api/company.php?id=TCS&api_key=ghfkffu6378382826hhdjgk
```

## Project Setup

### Backend Setup (Python)

1. **Navigate to backend directory**
   ```bash
   cd backend_ml
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure database**
   - Update `src/config.py` with your TiDB Cloud credentials
   - Download CA certificate and place in `data/ca.pem`

6. **Add company data**
   - Place `Nifty100Companies.xlsx` in the `data/` folder
   - Ensure it has a `company_id` column

7. **Run the analysis**
   ```bash
   python main.py
   ```

### Frontend Setup (React)

1. **Navigate to frontend directory**
   ```bash
   cd frontend_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open browser to `http://localhost:5173`

## Project Workflow

### 1. Data Fetching
- Reads company IDs from `Nifty100Companies.xlsx`
- Sends API requests for each company
- Retrieves Balance Sheet, P&L, and Cash Flow data

### 2. Machine Learning Analysis

The ML engine analyzes financial data across multiple dimensions:

#### Growth Analysis (3/5/10 years)
- **Sales CAGR**: Compounded Annual Growth Rate
- **Profit CAGR**: Net profit growth trajectory
- Thresholds: >10% (Pro), <5% (Con)

#### Debt Analysis
- **Debt-Free Status**: Borrowings < ₹1 Cr
- **Debt Reduction Trend**: Year-over-year comparison

#### ROE Analysis
- **3-Year ROE**: Return on Equity tracking
- Thresholds: >15% (Pro), <8% (Con)

#### Dividend Analysis
- **Payout Ratio**: Dividend sustainability
- Thresholds: >10% (Pro), 0% (Con)

### 3. Insight Generation

**Pros (Values > 10%)**
- Company is almost debt-free
- Company has reduced debt
- Good return on equity (ROE) track record: 3 Years ROE 47.4%
- Company has been maintaining healthy dividend payout of 66.2%
- Company has delivered good profit growth of 23.0%
- Company's median sales growth is 28.3% over last 10 years

**Cons (Values < 10%)**
- The company has delivered poor sales growth of 9.5% over past 5 years
- Company is not paying out dividend
- Company has low return on equity of 8.33% over last 3 years

The system selects **top 3 pros and cons** based on priority scoring.

### 4. Database Storage

Results are stored in the `ml` table with the following schema:

```sql
CREATE TABLE ml (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_id VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  top_pros TEXT,
  top_cons TEXT,
  roe FLOAT,
  sales_growth FLOAT,
  profit_growth FLOAT,
  updated_at DATETIME
);
```

### 5. Real-Time Display
- Terminal output with progress tracking
- Web interface for visualization
- Company comparison features

## Features Implemented

✅ **Backend ML Engine**
- Multi-period growth analysis (3/5/10 years)
- Priority-based insight selection
- Dividend payout analysis
- NaN/Inf handling for robust calculations
- Progress tracking with tqdm
- Comprehensive error logging

✅ **Frontend Web App**
- Company grid view with search
- Detailed analysis dashboard
- Growth metrics visualization (matching UI design)
- Pros/Cons ML insights display
- Financial tables (P&L, Balance Sheet, Cash Flow)
- Annual report document links
- Responsive design with Tailwind CSS

✅ **Database Integration**
- TiDB Cloud MySQL connectivity
- SSL/TLS encryption
- Upsert operations (update if exists)
- Data validation and sanitization

## Project Structure

```
backend_ml/
├── data/
│   ├── Nifty100Companies.xlsx
│   └── ca.pem
├── logs/
│   └── process.log
├── src/
│   ├── __init__.py
│   ├── config.py          # API keys, DB credentials, thresholds
│   ├── db_manager.py      # SQLAlchemy models and operations
│   ├── fetcher.py         # API data fetching with retry logic
│   └── processor.py       # ML analysis engine
├── main.py                # Entry point
├── requirements.txt
└── README.md

frontend_web/
├── public/
├── src/
│   ├── components/
│   │   ├── analysis/      # Dashboard components
│   │   ├── common/        # Reusable UI elements
│   │   └── layout/        # Navigation
│   ├── pages/
│   │   ├── CompanyAnalysis.jsx
│   │   └── CompanyList.jsx
│   ├── services/
│   │   └── api.js         # Axios API client
│   ├── store/
│   │   ├── companySlice.js
│   │   └── store.js
│   ├── utils/
│   │   ├── companies.js   # Nifty 100 list
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Troubleshooting

### Backend Issues

**MySQL Connection Error**
- Verify TiDB Cloud credentials in `src/config.py`
- Ensure CA certificate is in `data/ca.pem`
- Check IP whitelist in TiDB Cloud dashboard

**NaN/Inf Database Errors**
- Fixed in latest version with math.isnan() checks
- Rerun analysis to update problematic records

**API Rate Limiting**
- Built-in retry logic with exponential backoff
- Adjust sleep timers in `fetcher.py` if needed

### Frontend Issues

**CORS Errors**
- Vite proxy configured in `vite.config.js`
- Restart dev server after config changes

**API Not Loading**
- Check network tab for failed requests
- Verify API key is valid
- Ensure backend proxy is working

## Next Steps

1. ✅ Implement Python scripts for API fetching and ML operations
2. ✅ Develop web interface for real-time analysis monitoring
3. ✅ Database integration with MySQL storage
4. 🔄 Optimize ML models for accurate financial forecasting
5. 🔄 Add comparison features for multiple companies
6. 🔄 Implement caching for frequently accessed data

## License

Internal project for educational purposes.

## Contact

For questions or issues, contact the development team.