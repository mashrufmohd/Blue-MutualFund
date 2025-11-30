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
        external_url = Config.API_BASE_URL
        params = {
            'id': company_id,
            'api_key': Config.API_KEY
        }
        
        response = requests.get(external_url, params=params, timeout=15)
        response.raise_for_status()
        api_data = response.json()
        
        ml_insights = db_manager.get_analysis(company_id)
    
        if ml_insights and api_data.get('data'):
            pros_list = []
            cons_list = []
            
            top_pros = ml_insights.get('top_pros') if isinstance(ml_insights, dict) else None
            top_cons = ml_insights.get('top_cons') if isinstance(ml_insights, dict) else None

            if top_pros:
                pros_list = [{'pros': p.strip()} for p in top_pros.split('|') if p.strip()]
        
            if top_cons:
                cons_list = [{'cons': c.strip()} for c in top_cons.split('|') if c.strip()]
        
            api_data['data']['prosandcons'] = pros_list + cons_list
        
            api_data['company']['ml_sales_growth'] = ml_insights.get('sales_growth', 0)
            api_data['company']['ml_profit_growth'] = ml_insights.get('profit_growth', 0)
            api_data['company']['ml_roe'] = ml_insights.get('roe', 0)
        
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
