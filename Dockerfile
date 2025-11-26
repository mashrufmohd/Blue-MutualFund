# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY backend_ml/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend_ml/ .

# Expose the port that the app runs on
# Render will set the PORT environment variable, but we expose 5000 as a default documentation
EXPOSE 5000

# Define environment variable
ENV PORT=5000

# Run the application
# We use the shell form to allow variable expansion
CMD ["sh", "-c", "uvicorn api:app --host 0.0.0.0 --port $PORT"]
