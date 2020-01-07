+++
title = "bashrcに環境変数が定義されていなければ設定する"
date = "2017-07-31T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/07/set-environment-variable-if-undefined-that/cover.jpg"
description = ".bashrcに環境変数が定義されていなければ設定するメモ。"
tags = ["bash"]
+++

.bashrcに環境変数が定義されていなければ設定するメモ。
ぶっちゃけ他にいい方法が普通にあると思うからググった方が早いと思う。

## 普通に環境変数を定義する
単純に定義するだけなら、普通にechoで書き込む。

## bashrcに未定義の場合のみ定義する
最近はAnsibleを触ることが多いので、何度も実行されないように書く。
他にいいやり方はあるんだろうけど、とりあえずはgrepの結果が空文字列であるかどうかで判断。

ダサい気もするけど、パッと思いついたのはこれだし、当分はこれで行く。
