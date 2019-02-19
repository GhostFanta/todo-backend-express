FROM node:8.15.0-alpine

ENV PATH /root/.yarn/bin:$PATH

RUN apk update \
  && apk add curl bash binutils tar \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del curl tar binutils

RUN mkdir /root/web

WORKDIR /root/web

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
