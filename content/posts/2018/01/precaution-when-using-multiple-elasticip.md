+++
title = "ElasticIPを複数利用する時の注意"
date = "2018-01-15T00:00:00Z"
draft = "false"
author = "K@zuki."
cover = "2018/01/precaution-when-using-multiple-elasticip/cover.jpg"
description = "今の案件で、複数のElasticIPを利用しようと思った時のメモ。"
tags = ["AWS"]
+++

今の案件で、複数のElasticIPを利用しようと思った時のメモ。

## ElasticIPが確保できない？
Terraformを利用してAWS上のリソースを管理しているのだが、`terraform apply`が失敗したのである。
その時のエラーの一部を抜粋したの以下。

```
Error creating EIP: AddressLimitExceeded: The maximum number of addresses has been reached.
```

どうやら上限に達してしまったらしい。
[公式ドキュメント](https://docs.aws.amazon.com/ja_jp/AmazonVPC/latest/UserGuide/VPC_Appendix_Limits.html#vpc-limits-eips)に書いてあるのだが、デフォルトのElasticIPの上限は**5**である。
すでに5個のIPを利用してしまっていたので、この制限にひっかかってしまった。

もし制限を緩和したい時は、AWSの[サポートセンター](https://console.aws.amazon.com/support/home#/case/create?issueType=service-limit-increase&limitType=service-code-vpc)にケースを作成して、問い合ã
