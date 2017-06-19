FROM node:6
WORKDIR /app
ADD index.js index.js
ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn install
ENTRYPOINT ["node","index.js"]
