+++
title = "Alpine Linuxのパッケージ一覧"
date = "2017-07-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/07/alpine-linux-packge-list/cover.jpg"
description = "仕事ではDockerに触れる機会が余りないのですが、プライベートでは結構使っています。"
tags = ["Alpine Linux"]
+++

仕事ではDockerに触れる機会が余りないのですが、プライベートでは結構使っています。
Dockerを本格的に使うと、Dockerイメージのサイズ削減に勤しむことになるんですが、ベースイメージをAlpineにすることが多くなります。
Alpineだとパッケージが提供されておらず、自前ビルドする必要がある時が多いため、そのビルドに必要なパッケージが存在するのか確認したい時が多々あります。
そういう時は、[Alpine packages](https://pkgs.alpinelinux.org/packages?name=&branch=&repo=&arch=&maintainer=)で必要なパッケージを探せます。

適当にコンテナ立ち上げて探した方が早いんですが、立ち上げられない時に利用する時には便利です。
