+++
title = "Ansibleでsftp出来ない"
date = "2017-12-15T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "仕事で使っているCentOS7のマシンに対して**ansible-playbook**実行時、sftpの箇所で接続エラーが出てしまい、反映出来ないという問題に遭遇しました。"
tags = ["Ansible"]
+++

仕事で使っているCentOS7のマシンに対して**ansible-playbook**実行時、sftpの箇所で接続エラーが出てしまい、反映出来ないという問題に遭遇しました。

## 環境

* Ansible ... 2.3.2.0

## 解決策
[SFTP disableなCentOS環境でansibleを使う](http://tagomoris.hatenablog.com/entry/20140318/1395118495)という記事を見つけまして、ここに書いてある状況とそっくりでした。
実際に**ANSIBLE_SCP_IF_SSH**を環境変数として指定したら動作しました。
`paramiko`の動作上、仕方ないんですねー。
今のところ、困らないので環境変数を指定していく方針にしていきます。
