import logging
import math
from datetime import datetime
from urllib.parse import quote, unquote, urlsplit, urlunsplit

from pymongo import MongoClient, errors

from .config import Config


class DBManager:
    def __init__(self):
        try:
            normalized_uri = self._normalize_mongo_uri(Config.MONGO_URI)
            self.client = MongoClient(normalized_uri)
        except errors.ConfigurationError as exc:
            logging.critical(f"Failed to configure MongoDB client: {exc}")
            raise

        self.db = self._resolve_database()
        self.collection = self.db[Config.MONGO_COLLECTION]
        self._ensure_indexes()

    def _resolve_database(self):
        try:
            default_db = self.client.get_default_database()
        except errors.ConfigurationError:
            default_db = None

        if default_db is not None:
            return default_db

        return self.client[Config.MONGO_DB_NAME]

    def _ensure_indexes(self):
        try:
            self.collection.create_index('company_id', unique=True)
        except errors.PyMongoError as exc:
            logging.warning(f"Unable to create MongoDB index: {exc}")

    @staticmethod
    def _normalize_mongo_uri(uri: str) -> str:
        if not uri:
            return uri

        try:
            parts = urlsplit(uri)
        except ValueError:
            logging.warning("Invalid Mongo URI provided; using raw value.")
            return uri

        netloc = parts.netloc
        if not netloc or '@' not in netloc:
            return uri

        credentials, host = netloc.rsplit('@', 1)
        if not credentials:
            return uri

        if ':' in credentials:
            username, password = credentials.split(':', 1)
        else:
            username, password = credentials, ''

        def needs_encoding(value: str) -> bool:
            if not value:
                return False
            decoded = unquote(value)
            if decoded != value:
                return False
            return any(ch in value for ch in ('@', '/', ':'))

        updated_username = quote(username, safe='') if needs_encoding(username) else username
        updated_password = quote(password, safe='') if needs_encoding(password) else password

        if password:
            updated_credentials = f"{updated_username}:{updated_password}"
        else:
            updated_credentials = updated_username

        if updated_credentials == credentials:
            return uri

        normalized_netloc = f"{updated_credentials}@{host}"
        normalized_uri = urlunsplit((parts.scheme, normalized_netloc, parts.path, parts.query, parts.fragment))
        logging.info("Normalized MongoDB credentials in connection string.")
        return normalized_uri

    def save_analysis(self, data: dict):
        payload = self._sanitize_payload(data)
        try:
            self.collection.update_one(
                {'company_id': payload['company_id']},
                {'$set': payload},
                upsert=True
            )
            logging.info(f"Upserted DB record for {payload['company_id']}")
        except errors.PyMongoError as exc:
            logging.error(f"Database Error for {payload['company_id']}: {exc}")

    def _sanitize_payload(self, data: dict) -> dict:
        def _clean(value, fallback=0):
            if value is None:
                return fallback
            if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
                return fallback
            return value

        return {
            'company_id': data['company_id'],
            'company_name': data.get('company_name', 'Unknown'),
            'top_pros': data.get('top_pros', ''),
            'top_cons': data.get('top_cons', ''),
            'roe': _clean(data.get('roe'), 0),
            'sales_growth': _clean(data.get('sales_growth'), 0),
            'profit_growth': _clean(data.get('profit_growth'), 0),
            'updated_at': datetime.utcnow()
        }

    def get_analysis(self, company_id):
        try:
            document = self.collection.find_one({'company_id': company_id}, {'_id': 0})
            return document
        except errors.PyMongoError as exc:
            logging.error(f"Database Fetch Error for {company_id}: {exc}")
            return None