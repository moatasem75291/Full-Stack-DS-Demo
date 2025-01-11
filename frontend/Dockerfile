FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package.json .
RUN npm install

COPY --from=build /app/dist/ /app/dist/

EXPOSE 7077

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "7077"]