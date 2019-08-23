+++
title = "ssmのラッパースクリプト書きました"
date = "2019-07-08T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "最近はsshではなく[session-manager-plguin](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)を使い、Session Manager経由でインスタンス上での操作を行っています.  しかし、session-manager-pluginを使って接続する時はインスタンスIDを指定するのが面倒だったので、それを楽にするためのラッパースクリプトを作りました."
tags = ["AWS", "SSM", "Shell"]
+++

最近はsshではなく[session-manager-plguin](https://docs.aws.amazon.com/ja_jp/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html)を使い、Session Manager経由でインスタンス上での操作を行っています.
しかし、session-manager-pluginを使って接続する時はインスタンスIDを指定するのが面倒だったので、それを楽にするためのラッパースクリプトを作りました.

## 何故、Session Managerを使うの？
まずはsshと比べたSession Manager経由の操作のPros,Consを挙げます.

### Pros
* (AWS上に）証跡を残すことができる
* インスタンスへ接続するための鍵管理をしなくてよい
* インスタンスへの接続制限をIAMポリシーで定義できる
* ssh用のインバウンド通信を許可しなくてよい

### Cons
* sshを利用するコマンドが使えない（scp）
* ブラウザ版を使っているとレスポンスが悪いときがある
* 接続後にログインシェルを起動しないとコマンド履歴が残らない
* インスタンス自身が外部と通信できるようにしなければならない（Public IPの割当やNat Gateway）

と個人的には感じています.
そのため、「開発をする想定でなければ事足りる」という判断で、Session Managerを使っています.
IAMとは別に接続用の鍵を管理するのはできればやりたくないです. **※1**

## ssm-session

このように事前にインスタンスIDを控えておく必要があるため、接続することになった時にリズムが崩れてしまいます.
私は開発でもオペレーションでもリズムを重視しているので、これは看過できません.
というわけでこれのラッパースクリプトである[ssm-session](https://github.com/corrupt952/ssm-session)を書きました.

ラッパースクリプトなので難しいことはしていません.

1. インスタンス一覧を取得
2. 取得した情報からインスタンス名とインスタンスIDのみを切り出す
3. 2で切り出した情報をfzfで1つ選択する
4. 選択したインスタンスにaws ssm start-sessionを行う

といった一連の操作をパイプで繋げただけです.

## さいごに
今の所SSMの中でもSession Managerしか使っていないため、Documentを実行する時がきたら、名前やコマンドを見直すかもしれません.
また引数でインスタンスIDを受け取ったり、インスタンス名とインスタンスID以外の情報を出せるようにするかもしれません.

**※1** [EC2 Instance Connect](https://aws.amazon.com/jp/about-aws/whats-new/2019/06/introducing-amazon-ec2-instance-connect/)でも十分ですが、ユースケースに応じて選択すればよいと思います.
