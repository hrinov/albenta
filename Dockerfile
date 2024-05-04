FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to take advantage of caching
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files and folders to the working directory
COPY . .

# Clean up previous builds (assuming build artifacts are generated in a specific directory)
RUN rm -rf /usr/src/app/dist

# Build the server
RUN npm run build-server

# Expose the port your app runs on
EXPOSE 8080

# Command to start your server
CMD ["npm", "run", "start-server"]