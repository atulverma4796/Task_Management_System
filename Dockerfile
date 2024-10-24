# Stage 1: Build
FROM node:18 AS builder
WORKDIR /usr/
COPY package*.json ./
RUN npm install

# Copy the source code
COPY ./src ./src

# Stage 2: Production
FROM node:18 AS production
WORKDIR /usr/src
COPY --from=builder /usr/ .

# Start the application
CMD ["node", "src/index.js"]
