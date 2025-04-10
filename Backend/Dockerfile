FROM node:latest

WORKDIR /Backend

COPY . .

RUN rm -rf node_modules
RUN npm i

CMD ["npm", "start"]

EXPOSE 5002