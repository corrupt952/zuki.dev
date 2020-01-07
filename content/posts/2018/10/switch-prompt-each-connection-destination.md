+++
title = "接続先ごとにプロンプトを切り替える"
date = "2018-10-31T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2018/10/switch-prompt-each-connection-destination/cover.jpg"
description = "開発（or テスト）、ステージング、本番環境のサーバ内で作業する必要がある場合、シェルでホスト名を表示して環境を見分けていますが、どうしても限界があります。そのため、接続先にごとにプロンプトを切り替えて、環境ごとに色を変更してみようと思います。"
tags = ["SSH"]
+++

開発（or テスト）、ステージング、本番環境のサーバ内で作業する必要がある場合、シェルでホスト名を表示して環境を見分けていますが、どうしても限界があります。
そのため、接続先にごとにプロンプトを切り替えて、環境ごとに色を変更してみようと思います。

# TL;DR

* **RemoteCommand**というオプションがあり、そこにコマンドを指定すると実行してくれる
* ssh_configに**RemoteCommand**と**RequestTTY**を定義すればよい

## 環境

* ssh ... `OpenSSH_7.6p1, OpenSSL 1.1.0g-fips 2 Nov 2017`
* GNU bash ... `4.4.19`

## 接続先にごとにプロンプトを切り替える
コマンド実行時の引数に、接続した後に実行するコマンドを指定することができますが、今回はそれを利用しません。
sshには`RemoteCommand`というオプションがあるので、それを*ssh_config*に定義して、sshを実行します。
以下がその例です。

```ssh_config
Host test-server
    HostName localhost
    Port 12345
    RequestTTY yes
    RemoteCommand PS1="\[\e[1;32m\][\u@\h \w] $\[\e[m\]" bash --login
```

これを利用して、development・staging・productionといった環境ごとにプロンプトを切り替えることができます。

```ssh_config
Host development
    ...
    RequestTTY yes
    RemoteCommand RemoteCommand PS1="\[\e[1;32m\][\u@\h \w] [development]\n$ \[\e[m\]" bash --login
Host staging
    ...
    RequestTTY yes
    RemoteCommand RemoteCommand PS1="\[\e[1;33m\][\u@\h \w] [staging]\n$ \[\e[m\]" bash --login
Host production
    ...
    RequestTTY yes
    RemoteCommand RemoteCommand PS1="\[\e[1;31m\][\u@\h \w] [production]$ \[\e[m\]" bash --login
```

こういうような定義をしておくことで、プロンプトを上書きして実行することが可能になります。

しかし、これでも上書きができないケースなどが存在します。

* .bashrcにPS1が定義されている
* /etc/bash.bashrcにPS1が定義されている

こういったケースでは、上書きができません。
理由は簡単で変数を定義してbashを実行していますが、その実行したbash上でbashrcなどが読み込まれるといった実行順序の問題になります。
では、事前に接続先にサーバー内に今回のようなPS1を定義しておけば良いでしょうか？
それは正直なところケースバイケースかもしれません。
私は、できる限り環境を汚したくないので、今回はこういった書き方を紹介してみました。
RequetTTYの定義は忘れずに。
