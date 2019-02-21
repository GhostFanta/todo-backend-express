FROM node:8.15.0-alpine

# use yarn as package manager
ENV PATH /root/.yarn/bin:$PATH

# SET environment to be production mode
ENV NODE_ENV production

# Install yarn
RUN apk update \
  && apk add curl bash binutils tar \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && apk del curl tar binutils

# Create root working dir
RUN mkdir /root/web

# Setting root working dir
WORKDIR /root/web

COPY package*.json ./

# Install dependencies
RUN yarn install

# copy all resources
COPY . .

# Use 3000 as production port
EXPOSE 3000

CMD ["yarn", "start"]
