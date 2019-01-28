+++
title = "zshでfunction definition file not foundの続き"
date = "2017-08-15T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/08/function-definition-file-not-found-2/cover.jpg"
description = "[前回の記事](/post/2017/08/function-definition-file-not-found/)なんですが、恐らく解決した。"
tags = ["zsh"]
+++

[前回の記事](/post/2017/08/function-definition-file-not-found/)なんですが、恐らく解決した。

zshrc内で、compinitを呼び出しているところを書き換えた。

```sh
autoload -U compinit; compinit
```

を

```sh
autoload -U compinit; compinit -d
```

**-d**をつけただけですね。
具体的にコードの説明したいけど、そこまで理解が追いついていない。
見たい人は、[このあたり](https://github.com/zsh-users/zsh/blob/master/Completion/compinit#L78-L85)を読むといいと思います。

ひとまずこれで。
