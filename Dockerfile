FROM node
WORKDIR /app
COPY . .
ARG PORT_ENV=8090
ENV PORT=${PORT_ENV}
EXPOSE 8090

RUN npm install

ENTRYPOINT npm start
            