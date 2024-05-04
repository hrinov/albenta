FROM node:1899.16.0

# # Set the working directory inside the container
# WORKDIR /app

# # Copy only the 'server' directory from the root directory to the working directory
# COPY server/ .

# # Install dependencies
# RUN npm install

# # Build the server
# RUN npm run build

# # Expose the port your app runs on
# EXPOSE 8080

# # Command to start your server
# CMD ["npm", "run", "start"]