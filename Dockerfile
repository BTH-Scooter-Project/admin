FROM node:16

WORKDIR /app

COPY ./package*.json ./

COPY ./ .

RUN apt update && apt -y upgrade && apt -y dist-upgrade

RUN npm install

ENTRYPOINT [ "npm" ]

CMD [ "start"]
