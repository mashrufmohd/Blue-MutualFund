"""
FastAPI server to serve company data with ML-generated insights.
Merges external API data with ML analysis from database.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn
from src.db_manager import DBManager
from src.config import Config

app = FastAPI(title="ML Financial Analysis API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_manager = DBManager()

@app.get("/api/company/{company_id}")
async def get_company_analysis(company_id: str):
    """
    Fetch company data from external API and merge with ML insights from DB.
    """
    try:
        # 1. Fetch from external StockTicker API
        external_url = Config.API_BASE_URL
        params = {
            'id': company_id,
            'api_key': Config.API_KEY
        }
        
        response = requests.get(external_url, params=params, timeout=15)
        response.raise_for_status()
        api_data = response.json()
        
        # 2. Fetch ML insights from our database
        ml_insights = db_manager.get_analysis(company_id)
        
        # 3. Merge ML insights into response
        if ml_insights and api_data.get('data'):
            # Convert pipe-delimited strings to array format
            pros_list = []
            cons_list = []
            
            if ml_insights.top_pros:
                pros_list = [{'pros': p.strip()} for p in ml_insights.top_pros.split('|') if p.strip()]
            
            if ml_insights.top_cons:
                cons_list = [{'cons': c.strip()} for c in ml_insights.top_cons.split('|') if c.strip()]
            
            # Replace original prosandcons with ML-generated insights
            api_data['data']['prosandcons'] = pros_list + cons_list
            
            # Add ML metrics to company object
            api_data['company']['ml_sales_growth'] = ml_insights.sales_growth
            api_data['company']['ml_profit_growth'] = ml_insights.profit_growth
            api_data['company']['ml_roe'] = ml_insights.roe
        
        return api_data
    
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f'External API error: {str(e)}')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {'status': 'healthy', 'service': 'ML Financial Analysis API'}

if __name__ == '__main__':
    import os
    port = int(os.getenv("PORT", 5000))
    print("=" * 50)
    print("  ML Financial Analysis API Server")
    print(f"  Running on http://0.0.0.0:{port}")
    print("=" * 50)
    uvicorn.run(app, host="0.0.0.0", port=port)
