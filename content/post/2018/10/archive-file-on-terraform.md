+++
title = "Terraformでファイルを圧縮する"
date = "2018-10-24T00:00:00Z"
draft = "false"
author = "K@zuki."
cover = "2018/10/archive-file-on-terraform/cover.jpg"
description = "Terraformでファイルを圧縮するには[archive_file](https://www.terraform.io/docs/providers/archive/d/archive_file.html)を使って、ファイルを圧縮します。"
+++

Terraformでファイルを圧縮するには[archive_file](https://www.terraform.io/docs/providers/archive/d/archive_file.html)を使って、ファイルを圧縮します。
対応している圧縮フォーマットは、zipのみのようです。

## TL; DR
* ドキュメント通りに指定すれば問題はない
* ディレクトリを指定しても中に1つしかファイルがない場合は、ディレクトリ構造は維持されないので注意

## 準備
* macOS ... 10.13.4
* Terraform ... v0.11.7

今回の検証に使ったソースコードは、[Githubのリポジトリ](https://github.com/corrupt952/terraform_archive_file)にコミットしてあります。

## 単一ファイルを圧縮する
単一ファイルを圧縮する場合は、`source_file`にファイルのパスを指定します。

```terraform
data "archive_file" "archive_file" {
  type        = "zip"
  source_file = "${path.module}/data.tf"
  output_path = "${path.module}/dist/archive_file.zip"
}
```

作成されたzipファイルを、Macのアーカイブユーティリティで展開すると、ファイルが直接展開されます。

## ディレクトリを指定して圧縮してみる
ディレクトリを指定して圧縮する場合は、`source_dir`にディレクトリのパスを指定します。

```terraform
data "archive_file" "archive_dir" {
  type        = "zip"
  source_dir  = "${path.module}/archive_dir"
  output_path = "${path.module}/dist/archive_dir.zip"
}
```

作成されたzipファイルを、Macのアーカイブユーティリティで展開すると、ディレクトリ構造を維持して展開されますが、ディレクトリ内に単一ファイルしかない場合は異なります。
ディレクトリ内に単一ファイルしかない場合は、**単一ファイルを圧縮する**で書いたのと同様にファイルが直接展開されます。

## Terraformコード内でファイル内容を指定する
Terraformコード内に直接ファイル内容をæ
urce`ブロックを作り、`filename`と`content`を指定します。

```terraform
data "archive_file" "archive_sources" {
  type        = "zip"
  output_path = "${path.module}/dist/archive_sources.zip"

  source {
    filename = "README.md"
    content  = "# Archive sources"
  }

  source {
    filename = "content.txt"
    content  = "content"
  }
}
```

こちらも`source`を単数、複数指定した場合の展開の挙動は、ディレクトリ指定した時と同じです。
