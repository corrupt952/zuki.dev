+++
title = "tmuxセッション上のzshのPATHがおかしい"
date = "2018-12-04T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2018/12/fix-zsh-environment-variables/cover.jpg"
description = "12月になりましたね.もうすぐAmazonのサイバーマンデーがあるので、カメラ関連でいいものがあるといいなぁと期待しながら待っています.さて、今回はtmuxセッション上のzshのパスがおかしくなり、タブ補完がエラーが出るようになった話と、それを抑制する話です."
tags = ['tmux', 'zsh']
+++

12月になりましたね.
もうすぐAmazonのサイバーマンデーがあるので、カメラ関連でいいものがあるといいなぁと期待しながら待っています.

さて、今回はtmuxセッション上のzshのパスがおかしくなり、タブ補完がエラーが出るようになった話と、それを抑制する話です.

## TL; DR
* tmuxセッション上のzshで`exec zsh -l`を実行した後にタブ補完を使うと、`(eval):setopt:3: no such option: NO_warnnestedvar`が出てくるようになった
* tmuxセッション上のzshで`zsh --version`と、tmuxセッション外で`zsh --version`を実行すると、それぞれ異なるバージョンが返ってくることを確認
  * 前者がシステムにプリインストールされているzsh
  * 後者がHomebrewでインストールしているzsh
* `~/.zshenv`しかなく、ZDOTDIRをホームディレクトリ以外に変更した場合、*ZDOTDIR変更後に起動されたzshでは.zshenvは読み込まれない*
  * `~/.zshenv`に適当なechoを埋め込んだが実行されていなかった
* `~/.zshenv`ではZDOTDIRの設定と、`~/.zsh/.zshenv`を読み込むように変更
  * ZDOTDIRの設定以外は、`~/.zsh/.zshenv`に定義を移動する

## 前提
zsh関連のファイルは、以下のような構成になっています.

```
~
├── .zshenv
└── .zsh
    ├── .fzf.zsh
    ├── .zshrc
    ├── .zshrc.aliases
    ├── .zshrc.functions
    └── .zshrc.prompt
```

また、今回のキモとなる`~/.zshenv`は以下のように記述されていました.

```sh
# ~/.zshenv
setopt combiningchars
setopt no_global_rcs

export PATH=${HOME}/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
export ZDOTDIR=${HOME}/.zsh

# 以下省略
```

zshもシステムにインストールされているものではなく、Homebrew経由でインストールしているzshを使用しています.
Homebrewでインストールしているzshのバージョンは`5.6.2`です.

## タブ補完でエラーが出るようになる
zshの設定を変更した後に動作確認するために`exec zsh -l`を実行しているのですが、それを実行した後にタブ補完を使おうとすると、補完自体は動くのですが、`(eval):setopt:3: no such option: NO_warnnestedvar`というエラーが発生するようになりました.
かなりの頻度でタブ補完を使用するため、これは対処しないとまずいということで対処することにしました.

## zshのバージョンを確認する
こういったエラーが出た場合は、原因の突き止めるのが良いと思います.
zsh自体のデバッグ方法を私は知らないため、まずはHomebrewでインストールしたzshが読み込まれているかを確認します.
まずは、tmuxセッション上のzshで`zsh --version`を実行しました.

```
$ zsh --version # in tmux session
zsh 5.3 (x86_64-apple-darwin18.0)
```

おかしいですね.
前提条件にも書いていますが、記事作成時点では`5.6.2`をHomebrew経由でインストールしています.
となると、Homebrewでインストールされたzshよりも、システムにインストールされているzshが先に見つかっており、PATHの中身が`.zshenv`で定義しているものとは異なるものになっていると予想されます.
念の為、tmuxのセッション外で`zsh --version`を実行すると、

```
$ zsh --version # not in tmux session
zsh 5.6.2 (x86_64-apple-darwin18.0.0)
```

となり、tmuxのセッション外では期待するzshが呼び出されていることが分かります.
これで**tmuxセッション上のzshではPATHが期待するPATHと異なるものになっている**ことが確認できした.
この結果から、tmuxセッション上のzshでは、`~/.zshenv`が読み込まれていないということが予想できます.

## ~/.zshenvが呼び出されるか確認する
tmuxセッションのzshが起動する時に、`~/.zshenv`が呼び出されているか確認してみます.
適当なechoを追記してみます.

```~/.zshenv
setopt combiningchars
setopt no_global_rcs

export PATH=${HOME}/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
export ZDOTDIR=${HOME}/.zsh

echo 'zshenv loaded' # 追記

# 以下省略
```

追記した状態でtmuxのセッションを新規に起動します.

結果としては、**何も出力されずにzshが起動**しました.
この結果から、tmuxセッション上のzsh起動時に`~/.zshenv`が読み込まれていないということが分かりました.

では、これは何故でしょうか？
答えは既に`~/.zshenv`に書かれています.

シェルの起動時には、`~/.zshenv`が読み込まれており、期待する環境変数になっていることが確認できました.
この初回の読み込みでZDOTDIRを変更していることに、お気づきでしょうか？
つまり、 **`~/.zshenv`が読み込まれた後は、ZDOTDIRが`~`から`~/.zsh`に変更されているため、tmuxセッション上のzshは`~/.zsh/.zshenv`が読み込まれ**ます.

言われてみれば当たり前ですが、完全に見落としてました.

## .zshenvを適切に設定する
これが適切かどうかははたして怪しいところではありますが、今回の問題はを解決できるようにします.
やることとしては、

* ~/.zshenvのZDOTDIR以外の処理を、~/.zsh/.zshenvに移動する
* ~/.zshenvから~/.zsh/.zshenvを読み込む

になります.

`~/.zsh/.zshenv`だけでいいと思われるかもしれませんが、zshの読み込み順の問題で、ターミナル起動時は`~/.zshenv`が読み込まれ、tmuxセッションで起動されるzshでは`~/.zsh/.zshenv`が読み込まれます.
この挙動により、こういったことになります.
そのため、こういった方針にしました.

```sh
# ~/.zshenv
export ZDOTDIR=${HOME}/.zsh

#
# .zsh/.zshenv
#
source ${ZDOTDIR}/.zshenv
```

```sh
# ~/.zsh/.zshenv
setopt combiningchars
setopt no_global_rcs

export PATH=${HOME}/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

#
# Homebrew
#
export PATH=${HOME}/.brew/sbin:${HOME}/.brew/bin:$PATH

#
# rbenv
#
export RBENV_ROOT=${HOME}/.rbenv
export PATH=${RBENV_ROOT}/bin:${RBENV_ROOT}/shims:$PATH

#
# pyenv
#
export PYENV_ROOT=${HOME}/.pyenv
export PATH=${PYENV_ROOT}/bin:${PYENV_ROOT}/shims:${PATH}

#
# go & goenv
#
export GOENV_ROOT=${HOME}/.goenv
export PATH=${GOENV_ROOT}/bin:${HOME}/go/bin:${PATH}

#
# tfenv
#
export TFENV_ROOT=${HOME}/.tfenv
export PATH=${TFENV_ROOT}/bin:${PATH}

#
# Local
#
[ -f ${ZDOTDIR}/.zshenv.local ] && source ${ZDOTDIR}/.zshenv.local
```

こうすることで今回の問題が解決できました.

## 最後に
今回は、完全にtmuxを考慮しない設定にしているのが問題でした.
こういったシェルの設定をうまくデバッグする方法があれば、知りたいなと思う今日この頃です.
今日は[Japan Container Days](https://containerdays.jp/)があるのでワクワクしています.
