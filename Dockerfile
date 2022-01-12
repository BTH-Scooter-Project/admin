FROM node:16

WORKDIR api

COPY ./package*.json ./

RUN apt update && apt -y upgrade && apt -y dist-upgrade

RUN npm install

COPY ./ .

EXPOSE 1338

ENTRYPOINT [ "npm" ]
CMD [ "start" ]