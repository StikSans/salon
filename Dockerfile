FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4500

CMD ["sh", "-c", "sleep 10 && npx prisma generate && npx prisma migrate deploy && npm run start:prod"]


