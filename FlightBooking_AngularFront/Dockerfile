# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod


# Stage 2
FROM nginx:alpine
COPY --from=node  /app/dist/flight-booking-angular-front /usr/share/nginx/html