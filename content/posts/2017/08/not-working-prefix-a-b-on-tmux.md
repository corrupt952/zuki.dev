+++
title = "tmux上のCtrl-a・Ctrl-eが動かない"
date = "2017-08-21T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/08/not-working-prefix-a-b-on-tmux/cover.jpg"
description = "Tmux2.5上でCtrl-a・Ctrl-eが効かなくなりました。shellは、zshを使っています。"
tags = ["tmux"]
+++

Tmux2.5上でCtrl-a・Ctrl-eが効かなくなりました。
shellは、zshを使っています。

解決策はよく分からないのですが、superuserで転がっていた質問の対応で、期待通りの動きをするようにしました。
[https://superuser.com/questions/523564/emacs-keybindings-in-zsh-not-working-ctrl-a-ctrl-e](https://superuser.com/questions/523564/emacs-keybindings-in-zsh-not-working-ctrl-a-ctrl-e)

**bindkey -e**をzshrcに追加しただけです。

Emacsモードのキーバインドだけっか...
