+++
title = "Envoy vs Nginx: HTTP/1.1 Reverse Proxy Performance"
date = "2018-12-13T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/12/http1.1-envoy-vs-nginx/cover.jpg"
description = "HTTP/1.1のリバースプロキシとして、EnvoyとNginxとの軽めのベンチマークを取りました.  しっかりとしたベンチマークとはいえませんが、少しは参考になる結果かもしれません."
tags = ["Envoy", "Nginx", "Docker"]
+++

HTTP/1.1のリバースプロキシとして、EnvoyとNginxとの軽めのベンチマークを取りました.  
しっかりとしたベンチマークとはいえませんが、少しは参考になる結果かもしれません.

## TL; DR
* リバースプロキシコンテナは、CPU・Memoryともにリソースの制限をする
* リバースプロキシとサービスはHTTP/1.1でTCPソケットで通信する
* `wrk -t 10 -c 10 http://host`で出力結果を取る
* Nginxの方が約1msほど早かったが、はっきりいって誤差
* [corrupt952/survey](https://github.com/corrupt952/survey/tree/master/envoy/http-front-proxy-benchmark)に今回の記事の元となるコードを置いている

## 環境
* docker ... 18.09.0
* docker-compose ...  1.23.2
* wrk ... 4.1.0

## 準備
今回もdocker-composeを利用して環境を作ります.  
コードは、[corrupt952/survey](https://github.com/corrupt952/survey/tree/master/envoy/http-front-proxy-benchmark)にあります.

### docker-compose.yml
Envoy・Nginx・サービス代わりのNginxの3つを定義します

```yaml
version: '3'
services:
  envoy:
    build:
      context: .
      dockerfile: dockerfiles/envoy/Dockerfile
    expose:
      - "80"
    ports:
      - "8000:80"

  nginx:
    build:
      context: .
      dockerfile: dockerfiles/nginx/Dockerfile
    expose:
      - "80"
    ports:
      - "8001:80"

  service:
    image: nginx:stable-alpine
    expose:
      - "80"
```

### dockerfiles/envoy/Dockerfile
Envoyのサンプルコードを参考にしていますが、不要なコードは削除しました.

```dockerfile
FROM envoyproxy/envoy-alpine:01d726a41bdd790c16765e1d321cb50590574eb0

COPY dockerfiles/envoy/front-envoy.yaml /etc/front-envoy.yaml
CMD ["/usr/local/bin/envoy", "-c", "/etc/front-envoy.yaml", "--service-cluster", "front-proxy"]
```

### dockerfiles/envoy/front-envoy.yaml
Envoyのサンプルコードを参考にしてサービスへリダイレクトするようにしています.  

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001

static_resources:
  listeners:
    - address:
        socket_address:
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
          - name: envoy.http_connection_manager
            config:
              codec_type: HTTP1
              stat_prefix: ingress_http
              route_config:
                name: local_route
                virtual_hosts:
                  - name: backend
                    domains:
                      - "*"
                    routes:
                      - match:
                          prefix: "/"
                        route:
                          cluster: service
              http_filters:
                - name: envoy.router
                  config: {}
  clusters:
    - name: service
      connect_timeout: 0.25s
      type: strict_dns
      lb_policy: round_robin
      hosts:
        - socket_address:
            address: service
            port_value: 80
```

### dockerfiles/nginx/Dockerfile
次に紹介するdefault.confをNginxが読み込める位置に定義しておきます.

```dockerfile
FROM nginx:stable-alpine
COPY dockerfiles/nginx/default.conf /etc/nginx/default.conf
```

### dockerfiles/nginx/default.conf
サービスへプロキシするように定義するだけなので特筆することはありません.

```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://service/;
    }
}
```

これで準備は終わりです.

## ベンチマークしてみる
[wrk](https://github.com/wg/wrk)というツールを使い、簡易的にベンチマークを実行してみます.  
コネクション数10,スレッド数10に設定にします.（これといって根拠はないです）

**Envoy**
```sh
$ wrk -t 10 -c 10 http://localhost:8000
Running 10s test @ http://localhost:8000
  10 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.45ms    2.02ms  46.58ms   96.63%
    Req/Sec   433.29    121.99     1.17k    82.34%
  43501 requests in 10.10s, 35.39MB read
Requests/sec:   4305.17
Transfer/sec:      3.50MB
```

**Nginx**
```sh
$ wrk -t 10 -c 10 http://localhost:8001
Running 10s test @ http://localhost:8001
  10 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.65ms    0.96ms  13.85ms   88.35%
    Req/Sec   631.85    129.09     1.20k    66.53%
  63373 requests in 10.10s, 51.37MB read
Requests/sec:   6271.63
Transfer/sec:      5.08MB
```

Nginxの方が約1ms早いという結果になりました.  
ですが、実際この差は膨大なリクエストを捌く必要がある大規模なサービスでなければ誤差といえる範疇かと思います.

## 最後に
今回は、HTTP/1.1のFront Proxyという役割でやってみましたが、Nginx・Envoyともにサポートしている領域が他にもあります.  
そういった点を踏まえながら最適なモノを選んでいくのが良いでしょう.
