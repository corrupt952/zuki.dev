FROM node:10
RUN npm install -g yarn \
	&& mkdir -p /app
WORKDIR /app
COPY entrypoint-webpack.sh /usr/local/bin/entrypoint-webpack.sh
ENTRYPOINT ["/usr/local/bin/entrypoint-webpack.sh"]
