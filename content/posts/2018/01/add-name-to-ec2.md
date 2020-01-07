+++
title = "EC2にNameをつける"
date = "2018-01-03T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2018/01/add-name-to-ec2/cover.jpg"
description = "AWSを利用している方なら基本中の基本だと思いますが、EC2の管理画面を見ていると`Name`という列があり、Terraformで作成していると空になっています。これは何故でしょうか？"
tags = ["AWS", "Terraform"]
+++

AWSを利用している方なら基本中の基本だと思いますが、EC2の管理画面を見ていると`Name`という列があり、Terraformで作成していると空になっています。
これは何故でしょうか？

## TL;DR

* `Name`タグを設定すれば表示される。

## 何故、表示されないのか？
AWSの公式ドキュメントである[Amazon EC2 リソースにタグを付ける - Amazon Elastic Compute Cloud](http://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/Using_Tags.html)に書いてある通り、キーが`Name`のタグの値に名前を入れれば、表示されます。
つまり、`Name`タグが未設定なだけだったのです。
以下が当時書いていたtfファイルです。

```terraform
resource "aws_instance" "khasegawa" {
  ami                     = "${data.aws_ami.image_id}"
  instance_type           = "${var.instance_type}"
  disable_api_termination = false
  subnet_id               = "${aws_subnet.khasegawa.id}"

  tags {
    Administrator = "${var.email}"
    Environment   = "${var.environment}"
  }

  lifecycle {
    "ignore_changes" = ["ami"]
  }
}
```

`tags`に見事に`Name`を書いてませんね。

## Nameタグを設定しよう
`Name`タグを設定した方がEC2インタンスだけでなく、他のAWSリソースでも判別しやすくなります。
適切な名前を設定をしましょう。
先程のtfファイルに追記すると、こうなります。

```terraform
resource "aws_instance" "khasegawa" {
  ami                     = "${data.aws_ami.image_id}"
  instance_type           = "${var.instance_type}"
  disable_api_termination = false
  subnet_id               = "${aws_subnet.khasegawa.id}"

  tags {
    Name          = "${var.environment}" # NOTE: 追記
    Administrator = "${var.email}"
    Environment   = "${var.environment}"
  }

  lifecycle {
    "ignore_changes" = ["ami"]
  }
}
```
