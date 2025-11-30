# Machine Learning Financial Analysis Project

Complete end-to-end financial analysis system for Nifty 100 companies with ML-powered insights.

## 🎯 Project Overview

This project fetches financial data (Balance Sheet, Profit & Loss, Cash Flow) from the StockTicker API, performs machine learning operations to generate insights, and stores results in MongoDB Atlas. Real-time analysis is displayed both in the terminal and via a modern web application.

## 📊 Live Demo

- **Frontend Web App**: Access the analysis dashboard
- **Company Analysis**: View detailed financial insights
- **API Endpoint**: `https://bluemutualfund.in/server/api/company.php`

## 🏗️ Architecture

```
project-root/
├── backend_ml/          # Python ML Analysis Engine
│   ├── data/           # Input data (Excel) + cached artifacts
│   ├── logs/           # Process logs
│   ├── src/            # Core ML modules
│   └── main.py         # Entry point
│
└── frontend_web/       # React Web Application
    ├── public/         # Static assets
    ├── src/            # React components
    └── package.json    # Dependencies
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB Atlas cluster (connection string with write access)
- VS Code (recommended)

### Backend Setup

```bash
cd backend_ml
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

#### Windows quick-start command block (Python 3.11)

If you're following the exact local setup from this repo and already have Python&nbsp;3.11 installed at `C:\Users\Mashr\AppData\Local\Programs\Python\Python311\python.exe`, you can bootstrap and launch the API with just two commands (run from the project root):

```powershell
cd c:\Users\Mashr\Financial-Analysis-ML
C:\Users\Mashr\AppData\Local\Programs\Python\Python311\python.exe -m pip install -r backend_ml\requirements.txt
C:\Users\Mashr\AppData\Local\Programs\Python\Python311\python.exe backend_ml\api.py
```

Leave the PowerShell window open to keep the server running. Hit `Ctrl+C` to stop it, and repeat only the second command for subsequent restarts.

### Frontend Setup

```bash
cd frontend_web
npm install
npm run dev
```

Access the app at `http://localhost:5173`

## 📋 Features

### ✅ Backend (Python ML Engine)

- **Multi-Period Analysis**: 3/5/10 year CAGR calculations
- **ML Insights Generation**: 
  - Debt-free status detection
  - Growth trend analysis
  - ROE performance tracking
  - Dividend payout evaluation
- **Priority-Based Selection**: Top 3 pros/cons
- **Robust Data Handling**: NaN/Inf validation
- **Progress Tracking**: Real-time terminal updates
- **Error Logging**: Comprehensive debugging

### ✅ Frontend (React Web App)

- **Company Grid**: Search and browse Nifty 100 companies
- **Analysis Dashboard**:
  - Compounded growth metrics (matching UI design)
  - ML-generated Pros & Cons
  - Financial statement tables
  - Annual report links
- **Responsive Design**: Mobile, tablet, desktop
- **State Management**: Redux Toolkit
- **Modern UI**: Tailwind CSS styling

### ✅ Database

- **MongoDB Atlas**: Fully managed, globally available document DB
- **TLS by default**: Secure connection strings from Atlas
- **Idempotent Upserts**: `update_one(..., upsert=True)` to keep data fresh
- **Data Validation**: Sanitized payloads prior to storage

## 🔬 ML Analysis Engine

### Growth Analysis
```python
# Calculates CAGR for 3, 5, and 10 year periods
sales_cagr = ((latest_sales / oldest_sales) ** (1/years) - 1) * 100
```

### Priority Scoring
```python
pros = [
  (100, "Company is almost debt-free."),      # Highest priority
  (90, "Good ROE track record: 47.4%"),
  (85, "Good profit growth of 23.0%"),
  (80, "Median sales growth 28.3%"),
]
```

### Insight Examples

**Pros (>10% threshold)**
- Company is almost debt-free
- Company has good return on equity (ROE) track record: 3 Years ROE 47.4%
- Company has been maintaining healthy dividend payout of 66.2%
- Company has delivered good profit growth of 23.0%
- Company's median sales growth is 28.3% over last 10 years

**Cons (<10% threshold)**
- The company has delivered poor sales growth of 9.5% over past 5 years
- Company is not paying out dividend
- Company has low return on equity of 8.33% over last 3 years

## 📚 API Documentation

### Endpoint
```
GET https://bluemutualfund.in/server/api/company.php
```

### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Company symbol (e.g., TCS, HDFCBANK) |
| api_key | string | `ghfkffu6378382826hhdjgk` |

### Sample Request
```bash
curl "https://bluemutualfund.in/server/api/company.php?id=TCS&api_key=ghfkffu6378382826hhdjgk"
```

### Response Structure
```json
{
  "company": {
    "id": "TCS",
    "company_name": "Tata Consultancy Services",
    "roe_percentage": "47.4",
    "roce_percentage": "52.1",
    ...
  },
  "data": {
    "profitandloss": [...],
    "balancesheet": [...],
    "cashflow": [...],
    "documents": [...],
    "prosandcons": [...]
  }
}
```

## 🗄️ MongoDB Document Shape

```json
{
  "company_id": "TCS",
  "company_name": "Tata Consultancy Services",
  "top_pros": "Company is almost debt-free.|Good ROE track record",
  "top_cons": "Company is not paying out dividend",
  "roe": 47.4,
  "sales_growth": 28.3,
  "profit_growth": 23.0,
  "updated_at": ISODate("2025-11-30T06:45:12Z")
}
```

## 🛠️ Tech Stack

### Backend
- Python 3.11
- Pandas 2.2.0
- PyMongo 4.6
- Requests 2.31.0
- tqdm 4.66.1

### Frontend
- React 18.2
- Vite 4.3
- Redux Toolkit 1.9
- React Router 6.8
- Axios 1.3
- Tailwind CSS 3.2
- Lucide React 0.294

### Database
- MongoDB Atlas
- TLS-only connection strings
- Serverless & autoscaling clusters

## 📈 Workflow

1. **Data Ingestion**
   - Read company IDs from Excel
   - Fetch data from API
   - Retry logic for failures

2. **ML Processing**
   - Calculate growth metrics
   - Analyze debt levels
   - Evaluate ROE performance
   - Check dividend payouts

3. **Insight Generation**
   - Score each metric
   - Rank by priority
   - Select top 3 pros/cons

4. **Storage**
   - Validate data (NaN/Inf)
   - Upsert to database
   - Log operations

5. **Visualization**
   - Terminal progress
   - Web dashboard
   - Financial tables

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
```bash
# Ensure MONGO_URI + MONGO_DB_NAME are set in backend_ml/.env
# Confirm your IP (or VPC peering) is allowed in MongoDB Atlas Network Access
# If using SRV connection strings, keep `mongodb+srv://` prefix intact
```

**NaN Database Errors**
```python
# Fixed with math.isnan() validation
# Rerun analysis to update records
```

### Frontend Issues

**CORS Errors**
```bash
# Restart Vite dev server
# Proxy configured in vite.config.js
```

**Blank Screen**
```bash
# Check browser console
# Verify npm install completed
# Clear cache and rebuild
```

## 📦 Deliverables

✅ **Python Scripts**
- `main.py` - Entry point
- `fetcher.py` - API client
- `processor.py` - ML engine
- `db_manager.py` - Database ORM

✅ **Web Application**
- Company grid view
- Analysis dashboard
- Financial tables
- Document viewer

✅ **Database Integration**
- MongoDB collection design
- Upsert operations
- Data validation

✅ **Documentation**
- Project README
- Backend README
- Frontend README
- API documentation

## 🔐 Security

- API key included for demo (production: use env vars)
- SSL/TLS for database connections
- Input validation and sanitization
- No sensitive data in logs

## 📝 License

Internal project for educational purposes.

## 👥 Team

Developed for intern training and financial analysis automation.

## 🎓 Learning Outcomes

- API integration and error handling
- Machine learning metrics calculation
- Database design and operations
- Frontend state management
- Full-stack application development

## 🚧 Future Enhancements

- [ ] Multi-company comparison
- [ ] Historical trend charts
- [ ] Export to Excel/PDF
- [ ] Email alerts for insights
- [ ] Advanced ML models (Random Forest, XGBoost)
- [ ] Real-time data streaming
- [ ] User authentication
- [ ] Saved analysis snapshots

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review logs in `backend_ml/logs/`
3. Check browser console for frontend errors
4. Contact the development team

---

**Status**: ✅ Production Ready  
**Last Updated**: November 27, 2025  
**Version**: 1.0.0
