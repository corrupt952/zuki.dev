+++
title = "zshでfunction definition file not found"
date = "2017-08-11T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/08/function-definition-file-not-found/cover.jpg"
description = "新しいPCを渡されたので、それのセットアップ時に出たエラー。"
tags = ["zsh"]
+++

新しいPCを渡されたので、それのセットアップ時に出たエラー。

```sh
_arguments:451: _vim_files: function definition file not found
```

antigenインストール後に起きたっぽい。
[ここ](https://github.com/zsh-users/antigen/issues/528)を参考にすると、zcomp系のファイルを削除してzshを起動すればいいらしい。

```sh
rm -rf ~/.zcomp* ~/.antigen/.zcomp*
```

後は**exec zsh**を実行するか、iTerm2を再起動するとか。
それぐらい。

と思っていたが、さらにその後zshを起動し直すと同じエラーが発生する。
ふむ。
困ったもんだ
