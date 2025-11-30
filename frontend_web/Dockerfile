# Use Node 18 (recommended for Vite)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json + lock first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start frontend server on 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
