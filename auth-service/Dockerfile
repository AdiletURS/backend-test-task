FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install              # здесь подтянуть class-transformer и class-validator
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
