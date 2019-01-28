+++
title = "ブラウザの現在開いているタブを閉じる"
date = "2018-10-25T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/10/close-current-tab/cover.jpg"
description = ""
tags = ["Javascript"]
+++

## TL;DR
* タブを閉じるアクション時に`window.open('about:blank','_self').close();` を実行する

## 現在のタブを閉じる
シンプルに考えると`window.close();`で動きます。
この方法で動かない場合、「開いているウィンドウに対して新しいウィンドウ（ドキュメント）を開き、それを閉じる」という方法が取れます。

`window.open('about:blank','_self').close();`

### window.open関数
これだけではつまらないので、window.open関数の仕様を見てみます。
[window.open](https://developer.mozilla.org/ja/docs/Web/API/window.open)

第1引数はURL、第2引数はウィンドウ名です。
URLは適当なもので良いとして、ウィンドウ名をどうすれば現在開いているタブを指定できるでしょうか。

このウィンドウ名、実は気づかないうちに使っている人も多いと思いますが、aタグ（anchor）のtarget属性に指定する値になります。
となると、このtarget属性に指定できる値で、現在開いているタブを表現する値がないかを確認してみましょう。

[Anchor target Property](https://www.w3schools.com/jsref/prop_anchor_target.asp)を見ていくと、お馴染みの`_blank`があったり、馴染みのない値もあるかと思います。
今回探しているのは「現在開いているタブを表現する値」です。
`_self`が該当しそうです。
説明を見てみると、

> Opens the linked document in the same frame as it was clicked (this is default)

と書いてあるので、この値で良さそうです。
