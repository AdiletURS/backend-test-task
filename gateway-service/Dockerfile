FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Создаем директорию для логов
RUN mkdir -p logs

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]