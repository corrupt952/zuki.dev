FROM alpine:3.8
RUN wget -O hugo.tgz https://github.com/gohugoio/hugo/releases/download/v0.49.2/hugo_0.49.2_Linux-64bit.tar.gz \
	&& tar xzvf hugo.tgz \
	&& mv ./hugo /usr/local/bin/hugo \
	&& apk update \
	&& apk add --no-cache make imagemagick bash \
	&& mkdir /app
WORKDIR /app
