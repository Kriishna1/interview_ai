# Use official Node.js image
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 5000

# Run the app
CMD ["node", "dist/server.js"]
