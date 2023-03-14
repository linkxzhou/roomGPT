FROM node:16
COPY ./ /app 
RUN cd /app && npm install
WORKDIR /app
ENTRYPOINT ["npm", "run", "start"]