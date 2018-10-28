+++
title = "Groovyことはじめ"
date = "2014-05-04T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "詳しくは[ここ](http://groovy.codehaus.org/Japanese+Home)にアクセスしてみてください。このブログよりもはるかにわかりやすく載っています！（公式ですしねｗ）"
tags = ["Groovy", "ことはじめ"]
+++

## 1. Groovyって

詳しくは[ここ](http://groovy.codehaus.org/Japanese+Home)にアクセスしてみてください。
このブログよりもはるかにわかりやすく載っています！（公式ですしねｗ）

## 2. Groovyのインストールしてみよう

私は、MacでGroovy使っているのでMacでのインストールしか解説出来ません。（現状） ※1

Homebrewだと簡単にインストールが出来ます。

```sh
brew install groovy
```

その他には、ソースコードをダウンロードしてきてビルドなんてのも一興ではないでしょうか（笑）

## 3. Groovyを動かしてみよう

Groovyで「Hello World」表示してみましょう。
まず、ただ「Helllo World」と表示させるだけなのでソースファイルは作成しません。 
そのかわりにgroovyshというgroovyの対話環境がありますのでそれを使いまã<M-C-A>。 ※2
起動は

```sh
groovysh
```

となります。
表記は若干異なると思いますが、以下のようになると思います。

```groovy
groovy:000>
```

これでgroovyshの起動が終わりました。
それでは「Hello World」を表示させてみましょう。
以下のように入力してください。

```groovy
groovy:000> println("Hello World")
```

恐らく出力は、

```groovy
Hello World

===> null
```

になります。

## 4. 終わりに

正直に言って、groovyshは使い勝手がよろしくないと思います。
簡単な動作確認程度にしか使えませんので、groovyでプログラムを書きたい方は、 groovyConsoleエディタなどでソースを書いて実行してみてください。 
本当に基礎的な部分しか書いていませんので、 もっと書いてみたい方は公式のドキュメントを見ながらやってみてはどうでしょうか？

※1 Windowsだとインストーラがあるみたいです。
※2 インストールしたくなくてGroovyを触りたい方は、Webで実行出来ますので[Groovy web console](https://groovyconsole.appspot.com/)にどうぞ。
