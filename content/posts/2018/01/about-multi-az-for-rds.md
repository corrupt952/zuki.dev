+++
title = "RDSのMultiAZについて"
date = "2018-01-30T07:30:00Z"
draft = "false"
author = "K@zuki."
cover = "img/2018/01/about-multi-az-for-rds/cover.jpg"
description = "[Amazon RDS Multi-AZ 配備](https://aws.amazon.com/jp/rds/details/multi-az/)という公式のドキュメントに書いてあることだが、RDSのインスタンスを**Multi-AZ 配備**という項目を設定するだけで、簡単にMulti-AZ構成にすることができる。"
tags = ["AWS"]
+++

[Amazon RDS Multi-AZ 配備](https://aws.amazon.com/jp/rds/details/multi-az/)という公式のドキュメントに書いてあることだが、RDSのインスタンスを**Multi-AZ 配備**という項目を設定するだけで、簡単にMulti-AZ構成にすることができる。
ただし、DB Instanceが所属するDB Subnet Groupに設定するSubnetが複数AZであることが前提条件である。

今の案件で最初から、DB Subnet Groupに複数AZのSubnetを登録していため、特にはまらずMulti-AZに変更することができた。
単純に可用性を高めたいだけだったので、レプリカインスタンスを作るのではなく、Multi-AZ構成で十分である。
