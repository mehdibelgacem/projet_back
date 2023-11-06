# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application is listening on
EXPOSE 8084

# Start the application when the container runs
CMD ["node", "app.js"]


# to build docker container 
# docker build -t app .

# to run docker container 
# docker run -p 8084:8084 app
