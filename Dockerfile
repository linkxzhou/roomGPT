FROM node:16-alpine
COPY ./ /app 
RUN cd /app && npm install --registry https://registry.npm.taobao.org && npm run build
WORKDIR /app
EXPOSE 9000
ENTRYPOINT ["npm", "run", "start"]