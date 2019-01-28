+++
title = "Macにdirenvを導入する"
date = "2017-08-16T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/08/install-direnv-to-macos/cover.jpg"
description = "仕事では１案件だけ集中して作業することもなく、複数の案件を同時に作業することもあると思います。（私はそう）そういう時にディレクトリごとに、環境変数を切り替えたいっていう時が多くあると思うのですが、[direnv](https://github.com/direnv/direnv)使いましょう。"
tags = ["MacOS", "direnv"]
+++

仕事では１案件だけ集中して作業することもなく、複数の案件を同時に作業することもあると思います。（私はそう）
そういう時にディレクトリごとに、環境変数を切り替えたいっていう時が多くあると思うのですが、[direnv](https://github.com/direnv/direnv)使いましょう。

## direnvのインストール
Homebrewユーザーなので、brew installするだけです。

```sh
brew install direnv
```

これだけです。
他のインストール方法は、[READMEのInstallセクション](https://github.com/direnv/direnv#user-content-install)を読んで下さい。

## 環境設定
[READMEのSetupセクション](https://github.com/direnv/direnv#user-content-setup)を見て、必要な設定をしてください。
私の場合は、zshを使っており、direnvがインストールされていない環境でも使用する時が時々あるため、以下のコードを<strong>.zshrc</strong>に追記します。

```sh
if [ "$(command -v direnv)" != "" ]; then
    eval "$(direnv hook zsh)"
fi
```

**direnv edit .**というコマンドを使って環境変数を設定するために、**.zhsrc**にEDITORを変数する。

```sh
export EDITOR=$(where vim)
```

## Gitリポジトリの設定
direnvを使って環境変数を設定すると、**envrc**というファイルが作成されます。
が、このファイルをリポジトリにコミットするわけにはいかないので、除外しときます。

```sh
# direnv
.envrc
```
