# Use Python 3.11 lightweight image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (better for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .
COPY data ./data


# Expose backend API port
EXPOSE 8000

# Start the backend server
CMD ["python", "api.py"]
