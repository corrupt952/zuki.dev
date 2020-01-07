+++
title = "このサイトの記事一覧・詳細が表示されていなかった"
date = "2019-01-28T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2019/01/not-visible-this-site/cover.jpg"
description = "先週の金曜日から今日にかけて記事一覧・詳細が表示されていない現象に遭遇した."
tags = ["雑記"]
+++

先週の金曜日から今日にかけて記事一覧・詳細が表示されていない現象に遭遇した.  
理由は、submoduleで組み込んでいる[hello-friend](https://github.com/panr/hugo-theme-hello-friend)というテーマで記事対象となるディレクトリ名の変更が行われていたためである.

とりあえずは、以下の対応を実施した.

* 最新のテーマで動作するようにディレクトリ構造を変更
* 最新のテーマで動作するように設定ファイルの変更
* hello-friendリポジトリのrelease watch
* 定期的に自動ビルドを行っている処理でsubmoduleの更新が入らないようにする

これ今日記事を書こうとしなかったら絶対に気づかなかったので危ない.
