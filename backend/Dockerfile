# Use Node 20 base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
