+++
title = "Terraformで作成したEC2にPublic DNSがつかない"
date = "2017-09-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2017/09/public-dns-does-not-atatch-to-ec2-created/cover.jpg"
description = "今回はHow-to系でも、問題解決系でもなく、率直に思ったことを書く"
tags = ["Terraform", "AWS"]
+++

今回はHow-to系でも、問題解決系でもなく、率直に思ったことを書く。

これはTerraformに限った話ではないと思うんだけど、EC2を作成してPublicIPを割り当ててもPublicDNSに値がないことがある。
別に困りはしないんだけど、ちょっと調べてみたら、こんな記事が見つかる。
[AWSでPublic DNS(パブリックDNS)が割り当てられない時の解決法](http://qiita.com/sunadoridotnet/items/4ea689ce9f206e78a523)

これの通りなら、TerraformでもVPC定義の[オプション](https://www.terraform.io/docs/providers/aws/r/vpc.html#enable_dns_hostnames)を見直せば割り当てられるんじゃないかなと。
出社してから試してみる。
