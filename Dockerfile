FROM zrpaplicacoes/docker-in-node:lts-alpine

# Maintainer Information
LABEL author="ZRP Aplicações Informáticas LTDA - ME <zrp@zrp.com.br>"
LABEL vendor="ZRP Aplicações Informáticas LTDA - ME"
LABEL license="GPLv3"

# Install Git because package depends on Git
# to fetch AuthSdk dependency
RUN apk update && apk upgrade && \
    apk add --no-cache git
RUN yarn install

# Configure container network
EXPOSE 3003
