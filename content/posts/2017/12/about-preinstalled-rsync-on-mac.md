+++
title = "Macにプリインストールされているrsync"
date = "2017-12-30T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/12/about-preinstalled-rsync-on-mac/cover.jpg"
description = "Macにプリインストールされているrsyncを使って、リモートのホストへファイルを同期している時に起きた問題です。"
tags = ["MacOS", "rsync"]
+++

Macにプリインストールされているrsyncを使って、リモートのホストへファイルを同期している時に起きた問題です。

## TL;DR

* Macにプリインストールされてるrsyncは2.6.9
* 2.6.9だとiconvオプション使えないので、ファイル名が文字化けしたり、エラーになる
* Homebrewでインストールしたrsyncを使うか、ファイル名に日本語入れないで

## 環境

* MacOS ... 10.12.6
* rsync ... 2.6.9

## invalid byte sequence in UTF-8
MacOS上でリモートにファイルを同期しようとしたら、突如エラーが出ました。
`invalid byte sequence in UTF-8` 何とも悲しいメッセージです。
まさかと思い、ファイル名をリストにしてみると...
ファイル名に日本語が含まれているファイルがありました。

rsync2.6.9だとiconvオプションもないし、文字化けすると聞きました。
うにしてみます。Homebrewでrsyncをインストールして、そちらを使うã

## Homebrewでrsyncをインストール
特に難しいこともないです。
最新のrsyncをインストールしましょう。

```sh
$ brew install rsync

$ rsync --version
rsync  version 3.1.2  protocol version 31
Copyright (C) 1996-2015 by Andrew Tridgell, Wayne Davison, and others.
Web site: http://rsync.samba.org/
Capabilities:
    64-bit files, 64-bit inums, 64-bit timestamps, 64-bit long ints,
    socketpairs, hardlinks, symlinks, IPv6, batchfiles, inplace,
    append, ACLs, xattrs, iconv, symtimes, no prealloc, file-flags

rsync comes with ABSOLUTELY NO WARRANTY.  This is free software, and you
are welcome to redistribute it under certain conditions.  See the GNU
General Public Licence for details.
```

## 実行する
特にエラーもなく、うまく同期されました。
下がサンプルのコード。

```sh
rsync -av path/to/ hoge@example.com:/remote/path/to/
```

## 最後に
rsyncのバージョンも、きちんと確認しないといけないでã<M-C-A>ね。
この問題が出たのがリリースするタイミングだったので、ちょっとだけ焦りました。
チョットダケ...

ファイル名に、日本語というか英数字以外入れるのやめてほしい。
