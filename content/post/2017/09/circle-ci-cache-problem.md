+++
title = "CircleCIのキャッシュにハマった"
date = "2017-09-16T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "タイトル通り、CircleCIのキャッシュにハマったのである。CircleCIのキャッシュについては、[こちらのドキュメント](https://circleci.com/docs/2.0/caching/)を参照してください。"
tags = ["CircleCI", "CI"]
+++

タイトル通り、CircleCIのキャッシュにハマったのである。
CircleCIのキャッシュについては、[こちらのドキュメント](https://circleci.com/docs/2.0/caching/)を参照してください。

## 環境変数が取得できない
CircleCIではキャッシュ機能が存在しており、特定のディレクトリをキャッシュしておくことが出来る。
その際のキャッシュのキーに、ブランチ名やリビジョン、ファイルのチェックサムなどを利用することが出来る。
そして、これらの中に環境変数が利用出来ると書いてあるのだが、まあ動かない。
**{{ .Environment.variableName }}**という名前のものなのだが、RAILS_ENVを取得しようとして、**{{ .Environment.RAILS_ENV }}**を書いたところで、**<no value>**が返ってくる。

## この問題についてのディスカッション
これに関してのディスカッションは、[ここ](https://discuss.circleci.com/t/cannot-use-circle-yml-environment-variables-in-cache-keys/10994)に書いてある。
色々書いてあるのだが、CircleCIの従業員曰く、

> At this time, that is expected functionality. We do not yet fully support environment variables throughout the configuration file. This thread is a feature request not a bug report

とのこと。
要は、「ドキュメントに書いてあることは、理想であって実装しているわけではない。そして、これはバグリポートではなく機能追加ということらしい。
どう考えてもドキュメントバグだろ...

まあ、その後に

> The docs should definitely be updated- the phrasing is unclear. It supports any env var we supply, not any arbitrary env var.

と書いてあるので、一部の環境変数は使用可能なのだろうか。
時間がある時に検証してみようと思う。

ちなみにキャッシュについてのドキュメントは更新されていないが、[configuration-reference](https://circleci.com/docs/2.0/configuration-reference/)の方は更新されている。
