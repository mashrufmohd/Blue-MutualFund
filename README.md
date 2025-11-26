# Machine Learning Financial Analysis Project

Complete end-to-end financial analysis system for Nifty 100 companies with ML-powered insights.

## 🎯 Project Overview

This project fetches financial data (Balance Sheet, Profit & Loss, Cash Flow) from the StockTicker API, performs machine learning operations to generate insights, and stores results in a MySQL database. Real-time analysis is displayed both in the terminal and via a modern web application.

## 📊 Live Demo

- **Frontend Web App**: Access the analysis dashboard
- **Company Analysis**: View detailed financial insights
- **API Endpoint**: `https://bluemutualfund.in/server/api/company.php`

## 🏗️ Architecture

```
project-root/
├── backend_ml/          # Python ML Analysis Engine
│   ├── data/           # Input data and SSL certs
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
- MySQL/TiDB Cloud account
- VS Code (recommended)

### Backend Setup

```bash
cd backend_ml
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

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

- **TiDB Cloud MySQL**: Scalable cloud database
- **SSL/TLS**: Secure connections
- **Upsert Logic**: Update existing records
- **Data Validation**: Sanitized inputs

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

## 🗄️ Database Schema

```sql
CREATE TABLE ml (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_id VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  top_pros TEXT,              -- Pipe-delimited string
  top_cons TEXT,              -- Pipe-delimited string
  roe FLOAT,
  sales_growth FLOAT,
  profit_growth FLOAT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Tech Stack

### Backend
- Python 3.11
- Pandas 2.2.0
- SQLAlchemy 2.0.25
- PyMySQL 1.1.0
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
- TiDB Cloud (MySQL 8.0 compatible)
- SSL/TLS encryption
- Cloud-native scalability

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
# Check credentials in src/config.py
# Verify CA certificate in data/ca.pem
# Whitelist IP in TiDB Cloud
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
- MySQL schema
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
