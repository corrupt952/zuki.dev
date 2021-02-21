FROM ubuntu:20.04
RUN apt-get update \
    && apt-get install -y --no-install-recommends wget ca-certificates git bash make \
    && wget -O hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.81.0/hugo_extended_0.81.0_Linux-64bit.deb \
    && dpkg -i hugo.deb \
    && rm hugo.deb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
