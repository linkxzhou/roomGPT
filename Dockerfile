FROM node:16-alpine
COPY ./ /app 
RUN cd /app && npm install && npm run build
WORKDIR /app
EXPOSE 9000
ENTRYPOINT ["npm", "run", "start"]