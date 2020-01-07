+++
title = "ファイルの中身をコピーする時に、pbcopyが打つのが面倒"
date = "2017-08-22T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/08/clip-function/cover.jpg"
description = "ファイルの中身をコピーする時に、毎回**cat file | pbcopy**って打つのが面倒だったので、zshrcに関数を定義しました。"
tags = ["zsh", "MacOS"]
+++

ファイルの中身をコピーする時に、毎回**cat file | pbcopy**って打つのが面倒だったので、zshrcに関数を定義しました。

```sh
function clip() {
    cat $1 | pbcopy
}
```

柔軟性はないけど、とりあえずはこれで十分かな。
