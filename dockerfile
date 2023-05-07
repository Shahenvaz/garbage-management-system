FROM node:alpine
COPY package.json .
COPY package-lock.json .
RUN npm update
COPY . .
EXPOSE 8081
CMD ["node","index.js"]

