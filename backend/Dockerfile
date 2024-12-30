# Build stage
FROM node:16.13-alpine AS builder

# Install dependencies for AWS CLI
RUN apk update && \
    apk add --no-cache \
    ca-certificates \
    groff \
    less \
    curl \
    python3 \
    py3-pip

# Install AWS CLI v2
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm awscliv2.zip

# Set the working directory
WORKDIR /app

# Copy the npm packages 
COPY ./backend/package*.json ./

# Install npm dependencies
RUN npm install --legacy-peer-deps

# Copy environment variables
COPY ./backend/.env.example ./.env

# Copy the rest of the application
COPY ./backend .

# Runtime stage
FROM node:16.13-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app .

# Expose port
EXPOSE 8000/tcp

# Entry point
CMD ["npm", "run", "start", "&&", "npm", "run", "seed"]