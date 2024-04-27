FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server directory to the working directory
COPY server ./server

# Build the server
RUN npm run build-server

# Expose the port your app runs on
EXPOSE 10000

# Command to start your server
CMD ["npm", "run", "start-server"]