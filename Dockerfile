FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /usr/src/app

RUN rm -rf /usr/src/app/dist
# Copy all files and folders to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the server
RUN npm run build-server

# Expose the port your app runs on
EXPOSE 8080

# Command to start your server
CMD ["npm", "run", "start-server"]