FROM ubuntu:20.04
RUN apt update \
    && apt install -y wget git bash make
RUN wget -O hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.81.0/hugo_extended_0.81.0_Linux-64bit.deb \
    && dpkg -i hugo.deb
WORKDIR /app
