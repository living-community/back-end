FROM node:18

WORKDIR /usr/src/app

# 타임존 설정
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezoneRUN

COPY ./package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]
