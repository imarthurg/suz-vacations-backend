FROM zrpaplicacoes/docker-in-node:lts-alpine

# Install Git because package depends on Git
# to fetch AuthSdk dependency
WORKDIR /home/node/app
COPY ./ /home/node/app/
RUN apk update && apk upgrade && \
    apk add --no-cache git
RUN yarn install

EXPOSE 3003