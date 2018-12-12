+++
title = "EnvoyでHTTP/1.1のFront Proxyしてみた"
date = "2018-12-11T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/12/http1.1-front-envoy/cover.jpg"
description = "EnvoyはHTTP/1.1とHTTP/2ともにサポートしているということで、HTTP/1.1のFront Proxyができるのか試してみました."
tags = ["Envoy", "Docker"]
+++

EnvoyはHTTP/1.1とHTTP/2ともにサポートしているということで、HTTP/1.1のFront Proxyができるのか試してみました.

## TL; DR
* [front-envoy.yml](https://github.com/envoyproxy/envoy/blob/master/examples/front-proxy/front-envoy.yaml)の`codec_type`を`HTTP1`に変更すれば、HTTP/1.1で通信するようになる
* [corrupt952/survey](https://github.com/corrupt952/survey/tree/master/envoy/http-front-envoy)に今回の記事の元となるコードを置いている

## Envoyとは
Cloud Nativeアプリケーションのために設計されたOSSなプロキシソフトウェアのことです.  
KubernetesやMicroservicesの話が出てくると、必ずと言っていいほどに出てくるソフトウェアですね.

* Circuit Breaker
* Distributed Tracing
* リクエストのリトライ
* Service Discovery

などといったマイクロサービスが抱える諸問題を扱えるため、アプリケーション側で扱わなくてよくなり実装がシンプルになります.  
また、マイクロサービスでなくても導入するメリットが存在するため、どのような機能があるのかを調べてみるのも良いでしょう.

Envoyが外部からのインバウンドな通信を受け取り、適切なアプリケーションへリバースプロキシすることもできます.  
公式ドキュメントでは、[Front Proxy](https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/front_proxy)というページに書かれています. ※  
また、同一ページ内に[サンプルコード](https://github.com/envoyproxy/envoy/tree/master/examples/front-proxy)へのリンクもあるので、簡単に試すことができます.

※ 記事作成時点で証明書が失効しているためブラウザによっては接続できません

## 環境
* docker ... 18.09.0
* docker-compose ...  1.23.2

## HTTP/1.1で通信させる
公式が用意しているサンプルコードでは、Envoyからサービス用のコンテナのEnvoyへHTTP/2で通信しています.  
その通信をHTTP/1.1にしてみます.  
また今回作成したコードは、[corrupt952/survey](https://github.com/corrupt952/survey/tree/master/envoy/http-front-envoy)においてあります.

### 概要
まずは大体の概要について書きます.  
`Client` - HTTP1.1 -> `Envoy` - HTTP1.1 -> `NGINX(HTTP1.1サーバ)` といった構成で通信します.

### docker-compose.yml
次にdocker-compose.ymlについてです.  
サンプルコードをベースに作っていますが、異なるのはバックエンドに置いてあるのはごく普通のNginxコンテナです.  
Nginxを使っている理由は特にありません.

```yaml
version: '3'
services:
  envoy:
    build:
      context: .
      dockerfile: dockerfiles/envoy/Dockerfile
    expose:
      - "80"
      - "8001"
    ports:
      - "8000:80"
      - "8001:8001"

  nginx:
    image: nginx:stable-alpine
    expose:
      - "80"
```

### dockerfiles/envoy/Dockerfile
EnvoyのDockerfileもサンプルコードを参考にしていますが、不要そうな行は削除しました

```dockerfile
FROM envoyproxy/envoy-alpine:01d726a41bdd790c16765e1d321cb50590574eb0

COPY dockerfiles/envoy/front-envoy.yaml /etc/front-envoy.yaml
CMD ["/usr/local/bin/envoy", "-c", "/etc/front-envoy.yaml", "--service-cluster", "front-proxy"]
```

### dockerfiles/envoy/front-envoy.yaml
今回のキモとなるEnvoyの設定ファイルです.  
こちらも他と同様にサンプルコードを参考にしています.  

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
                          cluster: nginx
              http_filters:
                - name: envoy.router
                  config: {}
  clusters:
    - name: nginx
      connect_timeout: 0.25s
      type: strict_dns
      lb_policy: round_robin
      hosts:
        - socket_address:
            address: nginx
            port_value: 80
```

細々と変更している箇所はありますが、重要なのは`codec_type`です.  
公式ドキュメントの[codec_type](https://www.envoyproxy.io/docs/envoy/latest/api-v2/config/filter/network/http_connection_manager/v2/http_connection_manager.proto#envoy-api-enum-config-filter-network-http-connection-manager-v2-httpconnectionmanager-codectype)を見ると、指定可能な値は

* AUTO
* HTTP1
* HTTP2

の3つです.  
今回は、HTTP/1.1を強制させたいため、`HTTP1`を指定します.  
たったこれだけでHTTP/1.1で通信させることが可能になりました.

## 最後に
今回は、EnvoyでHTTP/1.1のFront Proxyをやってみました.  
これといって難しいことはありませんでしたが、ドキュメントを読みながらEnvoyを少し知るよいきっかけになりました.
