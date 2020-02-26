+++
title = "aptでnpmをインストールしたらlibmysqlclient-devが削除されていた"
date = "2020-02-27T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "業務で`ubuntu:18.04`イメージをベースとしたコンテナを使っていた時に、困った現象に出会いました.それは`libmysqlclient-dev`をインストール後、`npm`をaptでインストールすると`libmysqlclient-dev`が削除されるという現象です."
tags = ["Ubuntu"]
+++

業務で`ubuntu:18.04`イメージをベースとしたコンテナを使っていた時に、困った現象に出会いました.  
それは`libmysqlclient-dev`をインストール後、`nodejs`と`npm`をaptでインストールすると`libmysqlclient-dev`が削除されるという現象です.

結論としては、

- `libmysqlclient-dev`は`libssl-dev`に依存しているが、`npm`は`libssl1.0-dev`に依存している
- `npm`インストールする際に`libssl-dev`と`libssl1.0-dev`が競合し、`libssl-dev`と依存している`libmysqlclient-dev`を削除する
- Ubuntu公式リポジトリではなく[nodesource/distributions](https://github.com/nodesource/distributions)でaptリポジトリからNodeJSをインストールすれば良い

といった現象でした.

今のいままで問題なく動作していたんですが、昨日から動かなくなっていたので回避策があって良かったです.  

## 挙動確認
挙動確認した時のコマンドを貼っておきます.
ubuntu:18.04コンテナ上でaptの操作するだけで確認できます.

```bash
# Host
docker run --rm -it ubuntu:18.04 bash

# Ubuntu guest
apt update
apt install -y libmysqlclient-dev
apt install -s --no-remove nodejs npm # ERROR!
```

最後の`apt install -s --no-remove nodejs npm`のところのオプションについて軽く説明をしておきます.

`-s`オプションは、インストールやパッケージ削除などは行わないモードで、いわゆるDryRunです.  
`--no-remove`オプションは、インストール時に他のパッケージが削除される場合にエラー終了させるためのオプションです.  

コンテナイメージのビルドでaptを使う場合、`--no-remove`をつけておいた方が意図しないパッケージの削除が起こらないので、つけておいた方が良さそうです.
