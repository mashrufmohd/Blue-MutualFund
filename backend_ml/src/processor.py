import pandas as pd
import logging
import math
from .config import Config

class MLProcessor:
    def process_financials(self, raw_data):
        """
        Orchestrates the analysis pipeline.
        Returns a dictionary formatted for the database.
        """
        company_meta = raw_data.get('company', {})
        financial_data = raw_data.get('data', {})
        
        company_id = company_meta.get('id')
        
        # 1. Convert lists to DataFrames for analysis
        df_pl = pd.DataFrame(financial_data.get('profitandloss', []))
        df_bs = pd.DataFrame(financial_data.get('balancesheet', []))
        
        # 2. Run Analysis with priority scoring
        pros = []  # List of tuples: (priority, message)
        cons = []  # List of tuples: (priority, message)
        metrics = {}

        if not df_pl.empty:
            metrics.update(self._analyze_growth(df_pl, pros, cons))
            self._analyze_dividend(company_meta, pros, cons)
        
        if not df_bs.empty:
            self._analyze_debt(df_bs, pros, cons)
            
        # 3. Analyze ROE (from meta or calculated)
        self._analyze_roe(company_meta, pros, cons, metrics)

        # 4. Sort by priority and Select Top 3
        pros.sort(key=lambda x: x[0], reverse=True)
        cons.sort(key=lambda x: x[0], reverse=True)
        
        final_pros = [msg for _, msg in pros[:3]]
        final_cons = [msg for _, msg in cons[:3]]

        return {
            "company_id": company_id,
            "company_name": company_meta.get('company_name'),
            "top_pros": "|".join(final_pros), # Delimiter for DB
            "top_cons": "|".join(final_cons),
            "roe": metrics.get('roe', 0),
            "sales_growth": metrics.get('sales_growth', 0),
            "profit_growth": metrics.get('profit_growth', 0)
        }

    def _analyze_growth(self, df, pros, cons):
        """Analyze Sales and Profit Growth for multiple time periods"""
        metrics = {}
        try:
            # Clean data
            df['sales'] = pd.to_numeric(df['sales'], errors='coerce')
            df['net_profit'] = pd.to_numeric(df['net_profit'], errors='coerce')
            df = df.dropna(subset=['sales', 'net_profit'])
            
            if len(df) < 2:
                return metrics

            # Calculate growth for different periods: 3, 5, 10 years
            periods = [
                (3, 3 if len(df) >= 4 else None),
                (5, 5 if len(df) >= 6 else None),
                (10, 10 if len(df) >= 11 else None)
            ]
            
            latest = df.iloc[-1]
            best_sales_growth = None
            best_profit_growth = None

            for label, period in periods:
                if period is None:
                    continue
                    
                oldest = df.iloc[-(period + 1)]
                
                # Sales Growth
                if oldest['sales'] > 0:
                    sales_cagr = ((latest['sales'] / oldest['sales']) ** (1/period) - 1) * 100
                    if not math.isnan(sales_cagr) and not math.isinf(sales_cagr):
                        if best_sales_growth is None or abs(sales_cagr) > abs(best_sales_growth[1]):
                            best_sales_growth = (label, sales_cagr)
                
                # Profit Growth
                if oldest['net_profit'] > 0 and latest['net_profit'] > 0:
                    profit_cagr = ((latest['net_profit'] / oldest['net_profit']) ** (1/period) - 1) * 100
                    if not math.isnan(profit_cagr) and not math.isinf(profit_cagr):
                        if best_profit_growth is None or abs(profit_cagr) > abs(best_profit_growth[1]):
                            best_profit_growth = (label, profit_cagr)

            # Store metrics and generate insights
            if best_sales_growth:
                years, sales_cagr = best_sales_growth
                metrics['sales_growth'] = round(sales_cagr, 2)
                
                if sales_cagr > Config.GROWTH_THRESHOLD:
                    pros.append((80, f"Company's median sales growth is {sales_cagr:.2f}% over last {years} years"))
                elif sales_cagr < 5:
                    cons.append((80, f"The company has delivered poor sales growth of {sales_cagr:.2f}% over past {years} years"))

            if best_profit_growth:
                years, profit_cagr = best_profit_growth
                metrics['profit_growth'] = round(profit_cagr, 2)
                
                if profit_cagr > Config.GROWTH_THRESHOLD:
                    pros.append((85, f"Company has delivered good profit growth of {profit_cagr:.2f}%"))
                elif profit_cagr < 5:
                    cons.append((85, f"The company has delivered poor profit growth of {profit_cagr:.2f}% over past {years} years"))
                    
        except Exception as e:
            logging.error(f"Growth Analysis Error: {str(e)}")
        
        return metrics

    def _analyze_debt(self, df, pros, cons):
        """Analyze Borrowings"""
        try:
            df['borrowings'] = pd.to_numeric(df['borrowings'], errors='coerce').fillna(0)
            latest_debt = df.iloc[-1]['borrowings']
            
            if latest_debt <= Config.DEBT_FREE_LIMIT:
                pros.append((100, "Company is almost debt-free."))  # Highest priority
            elif len(df) >= 2:
                # Check trend (is debt reducing?)
                prev_debt = df.iloc[-2]['borrowings']
                if latest_debt < prev_debt:
                    pros.append((70, "Company has reduced debt."))
        except Exception as e:
            logging.error(f"Debt Analysis Error: {str(e)}")

    def _analyze_roe(self, meta, pros, cons, metrics):
        """Analyze Return on Equity for different time periods"""
        try:
            # Check for 3-year ROE (priority)
            roe_3y = float(meta.get('roe_3_years', meta.get('roe_percentage', 0)))
            roe_5y = float(meta.get('roe_5_years', 0))
            
            metrics['roe'] = roe_3y
            
            if roe_3y > Config.ROE_THRESHOLD:
                pros.append((90, f"Company has good return on equity (ROE) track record: 3 Years ROE {roe_3y:.1f}%"))
            elif roe_3y < 8 and roe_3y > 0:
                cons.append((90, f"Company has low return on equity of {roe_3y:.2f}% over last 3 years"))
        except:
            pass
    
    def _analyze_dividend(self, meta, pros, cons):
        """Analyze Dividend Payout"""
        try:
            dividend_payout = float(meta.get('dividend_payout_ratio', 0))
            
            if dividend_payout > Config.GROWTH_THRESHOLD:
                pros.append((75, f"Company has been maintaining healthy dividend payout of {dividend_payout:.1f}%"))
            elif dividend_payout == 0:
                cons.append((60, "Company is not paying out dividend"))
        except:
            pass