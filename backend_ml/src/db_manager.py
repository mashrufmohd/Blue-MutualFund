from sqlalchemy import create_engine, Column, Integer, String, Text, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.dialects.mysql import LONGTEXT
from datetime import datetime
from .config import Config
import logging
import math

Base = declarative_base()

class CompanyAnalysis(Base):
    __tablename__ = 'ml'
    
    # Matching the schema required for the project
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(String(50), unique=True, nullable=False)
    company_name = Column(String(255))
    
    # Storing ML insights as JSON strings or Delimited text
    top_pros = Column(Text)  # Stores "Pro 1|Pro 2|Pro 3"
    top_cons = Column(Text)  # Stores "Con 1|Con 2|Con 3"
    
    # Metrics for quick access
    roe = Column(Float)
    sales_growth = Column(Float)
    profit_growth = Column(Float)
    
    updated_at = Column(DateTime, default=datetime.utcnow)

class DBManager:
    def __init__(self):
        # SSL configuration for TiDB Cloud
        connect_args = {
            'ssl': {
                'ca': 'data/ca.pem',  # Path to the downloaded CA certificate
                'check_hostname': True  # Equivalent to ssl_mode=VERIFY_IDENTITY
            }
        }
        self.engine = create_engine(Config.DB_URI, echo=False, connect_args=connect_args)
        self.Session = sessionmaker(bind=self.engine)
        # Create table if it doesn't exist (Safety feature)
        Base.metadata.create_all(self.engine)
        
    def save_analysis(self, data: dict):
        """
        Upsert operation: Updates if exists, Inserts if new.
        """
        session = self.Session()
        try:
            # Handle NaN values before saving
            profit_growth = data.get('profit_growth', 0)
            if profit_growth is None or (isinstance(profit_growth, float) and (math.isnan(profit_growth) or math.isinf(profit_growth))):
                profit_growth = 0
                
            sales_growth = data.get('sales_growth', 0)
            if sales_growth is None or (isinstance(sales_growth, float) and (math.isnan(sales_growth) or math.isinf(sales_growth))):
                sales_growth = 0
            
            # Check if company exists
            existing = session.query(CompanyAnalysis).filter_by(company_id=data['company_id']).first()
            
            if existing:
                existing.top_pros = data['top_pros']
                existing.top_cons = data['top_cons']
                existing.roe = data.get('roe', 0)
                existing.sales_growth = sales_growth
                existing.profit_growth = profit_growth
                existing.updated_at = datetime.utcnow()
                logging.info(f"Updated DB record for {data['company_id']}")
            else:
                new_record = CompanyAnalysis(
                    company_id=data['company_id'],
                    company_name=data.get('company_name', 'Unknown'),
                    top_pros=data['top_pros'],
                    top_cons=data['top_cons'],
                    roe=data.get('roe', 0),
                    sales_growth=sales_growth,
                    profit_growth=profit_growth
                )
                session.add(new_record)
                logging.info(f"Inserted new DB record for {data['company_id']}")
            
            session.commit()
        except Exception as e:
            session.rollback()
            logging.error(f"Database Error for {data['company_id']}: {str(e)}")
        finally:
            session.close()
    
    def get_analysis(self, company_id):
        """
        Retrieves ML analysis for a specific company.
        Returns CompanyAnalysis object or None if not found.
        """
        session = self.Session()
        try:
            return session.query(CompanyAnalysis).filter_by(company_id=company_id).first()
        except Exception as e:
            logging.error(f"Database Fetch Error for {company_id}: {str(e)}")
            return None
        finally:
            session.close()