FROM node:18

WORKDIR /usr/src/app

# 타임존 설정
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezoneRUN

COPY ./package.json .

RUN npm i

RUN npx sequelize init

RUN npx sequelize db:create

COPY . .

CMD ["npm", "start"]