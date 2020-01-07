+++
title = "Nginxでメンテナンスページを表示する"
date = "2018-01-02T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2018/01/display-maintenance-page-with-nginx/cover.jpg"
description = "Nginxでメンテナンスページを表示させる仕組みを作った時の覚書。"
tags = ["Nginx"]
+++

Nginxでメンテナンスページを表示させる仕組みを作った時の覚書。

## 環境

* Nginx ... 1.12.2

## やりたいこと
今回、メンテナンスページを表示させるに当たって、前提条件・実現したいことをまとめます。

### 前提条件

* Nginxのrootに指定してあるディレクトリに`maintenance.hmtl`というメンテンナンスページ用のページを用意している

### 実現したいこと

* メンテナンス画面への切り替えで、Nginxの再起動を必要としない
* メンテナンス中は、Webアプリと通信しない
* メンテナンス中に`/health_check`へのリクエストが来た場合、200で空のレスポンスを返す
* `/health_check`以外へのリクエストの場合は、メンテナンスページを表示させる
* メンテナンスページのHTTPステータスコードは**503**にする

これらを実現したいのです。

## やってみる。
°条件が書けないですし、ifの中にifを書くことも出来ません。
どういうことかというと、`メンテナンス中`かつ`/health_checkへのリクエストである`をifの条件式に書くことが出来ません。
そのため、無理やりですが以下のように書きました。

```nginx
error_page 503 @maintenance;

# Maintenance
set $maintenance false;
set $maintenance_app_request false;
set $maintenance_health_check_request false;

if (/usr/src/app/tmp/maintenance.txt) {
    set $maintenance true;
}
if ($request_uri ~ ^/health_check) {
    set $maintenance_health_check_request $maintenance;
}
if ($request_uri !~ ^/health_check) {
    set $maintenance_app_request $maintenance;
}

if ($maintenance_app_request = true) {
    return 503;
}

location @maintenance {
    try_files /maintenance.html =404;
}

# Health Check
location /health_check {
    if ($maintenance_health_check_request = true) {
        return 200;
    }

    proxy_pass http://app;
}
```

<M-C-G>うか？どうでしã
良くない書き方だと自分でも思いますが、複数条件の論理積について思い出してみましょう。
複数条件の論理積の場合は、自分以外の条件が成り立たない場合、論理式の結果としては、偽となります。
この性質を利用して書きました。
つまり、`メンテナンス中`かつ`/health_checkへのリクエストである`という条件は、`/health_checkへのリクエストである`という条件が成り立つ場合、他の条件である`メンテナンス中`という条件の結果を入れれば良い。
ということになります。
`/health_checkへのリクエストである`という条件が成り立ったとしても、他の条件である`メンテナンス中`が成り立たない場合は、論理式としては偽となります。
これらの条件の結果を保存する変数を事前に偽を初期値として定義しておき、ある条件が成り立つ場合は、その条件のå	
の条件の結果を保存しておけば、論理積としては正しくなります。

ただ、このやり方のデメリットは、

* 条件分の変数定義が必要になる
* 論理和を表すことができない

あたりです。
他のやり方で、論理和などを表現することは出来るのですが、余り良い方法とは思えません。

## 最後に
自分でも余り良い書き方ではないと思いますが、とりあえず自分のやりたいことを実現するにはこれで十分だったので、こうしました。
もっとマシなやり方を思いついたら、書きますね。

ちなみにifディレクティブは、公式から[If Is Evil](https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/)と書かれるぐらいなので、必要がない限りは使用しない方がいいですよ。
