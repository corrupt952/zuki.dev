+++
title = "rbenvのラッパースクリプトを作る"
date = "2018-11-01T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/11/rbenv-wrapper-script/cover.jpg"
description = "今回は軽めのrbenvラッパースクリプトを作成します。"
tags = ["Ruby", "Shell"]
+++

今回は軽めのrbenvラッパースクリプトを作成します。

## TL;DR
updateしたいだけなら、[rbenv-update](https://github.com/rkh/rbenv-update)を使った方が良いよ。

## rbenv-wrapper
`PATH`で参照できるディレクトリに`rbenv-wrapper`という実行権限付きのファイルを作成します

```sh
#!/bin/bash -eu
case "$1" in
    update )
        cd ${HOME}/.rbenv && git pull && cd -
        cd ${HOME}/.rbenv/plugins/ruby-build && git pull && cd - ;;
    * )
        command rbenv $@;;
esac
```

これで`rbenv-wrapper`が実行できるようになりました。
あとは、この`rbenv-wrapper`で`rbenv`が呼び出されるように`.zshrc`などにエイリアスを定義すれば完了です。

```sh
alias rbenv='rbenv-wrapper'
```

これでrbenvの軽めなラッパースクリプトの完成です。
ぶっちゃけ、updateしたいだけなら[rbenv-update](https://github.com/rkh/rbenv-update)を使った方がいいと思います。
