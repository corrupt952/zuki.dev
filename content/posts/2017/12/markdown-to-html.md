+++
title = "ブログ用のMarkdown変換ツール"
date = "2017-12-27T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/12/markdown-to-html/cover.jpg"
description = "このブログはBloggerで書いてるんですが、下書きはMarkdownで書いています。となると、HTMLに変換するツールが必要になります。専用のコマンドラインツールを用意しているんですが微妙だったので、ウェブアプリとして作り直しました。"
tags = ["Ruby"]
+++

このブログはBloggerで書いてるんですが、下書きはMarkdownで書いています。
となると、HTMLに変換するツールが必要になります。
専用のコマンドラインツールを用意しているんですが微妙だったので、ウェブアプリとして作り直しました。

## Markdown to HTML
[Markdown to HTML](https://shielded-chamber-65842.herokuapp.com/)というのを、herokuで動かしています。
自分でパーサーなどを作っているわけではないので、技術的には面白みがないです。
[md2html](https://github.com/corrupt952/md2html)というリポジトリにコードは公開してあります。
`<p>`タグで囲いたくない（囲わなくていい設定にしてる）ので、こういうツールを作ったんですねー。

## 最後に
JSのライブラリもあるので、ここまでやる必要もなかった気がしますが、今回は普段使い慣れてるRubyでさっと書きました。
他にもã<M-C-A>ういうツールを、作っては捨て、作っては捨てしてるので、ある程度は残していこうかなと思いました。
