+++
title = "Postfixでsasl_passwdを変更するときの作業メモ"
date = "2018-01-29T07:25:10Z"
draft = "false"
author = "K@zuki."
cover = "2018/01/note-when-changing-sasl-passwd-in-postfix/cover.jpg"
description = "PostfixでSESにリレーしてメールを配信する仕組みを作っている時の作業を忘れがちなため、メモ書きを残す。"
+++

PostfixでSESにリレーしてメールを配信する仕組みを作っている時の作業を忘れがちなため、メモ書きを残す。

## sasl_passwdの編集
大体の場合は、`/etc/postfix/sasl_passwd`にあると思うので、これを適切な内容に変更する。
DBファイルを作成しないと、再起動しても変更が反映されないので注意。

```sh
sudo vi /etc/postfix/sasl_passwd
```

## Postfixで使うDBファイルの作成
変更した内容に基づいてDBファイルを作成する。
Postfixで使うDBファイルを作成する場合、`postmap`コマンドを利用する。
これが終わったら、後はPostfixの再起動だけである。

```sh
sudo postmap /etc/postfix/sasl_passwd
```

## Postfixの再起動
今回は、systemdを利用しているので、systemdでの例を書く。

```sh
sudo systemctl restart postfix
```

## 最後に
何回も同じ作業をやっているのだが、短期間で頻繁に設定することがないため、忘れてしまう。
このあたりの設定もAnsibleでできるようにしておくと捗りそう。
