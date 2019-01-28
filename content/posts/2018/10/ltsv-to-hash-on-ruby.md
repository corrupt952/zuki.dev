+++
title = "RubyでLTSVをハッシュに変換する"
date = "2018-10-30T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/10/ltsv-to-hash-on-ruby/cover.jpg"
description = "Rubyで、LTSVファイルをライブラリを使わずハッシュに変換する時のメモ。"
tags = ["Ruby"]
+++

Rubyで、LTSVファイルをライブラリを使わずハッシュに変換する時のメモ。

## TL;DR
考慮が足りていないかもしれないが、サイズが小さい分にはこれで十分なはずです。

```ruby
lines = File.readlines('file.ltsv')
lines.map(&:strip).map { |l| l.split("\t").each_with_object({}) { |t,h| k,v = t.split(':'); h[k] = v } }
```

## ライブラリを使わずに変換する
[LTSVのサイト](http://ltsv.org/)でLTSVのABNFが載っています。

```abnf
ltsv = *(record NL) [record]
record = [field *(TAB field)]
field = label ":" field-value
label = 1*lbyte
field-value = *fbyte

TAB = %x09
NL = [%x0D] %x0A
lbyte = %x30-39 / %x41-5A / %x61-7A / "_" / "." / "-" ;; [0-9A-Za-z_.-]
fbyte = %x01-08 / %x0B / %x0C / %x0E-FF
```

ABNFを読むと、

* `ltsv`は、`record`と改行によって構成される
* `record`は、`field`とタブ文字によって構成される
* `field`は、`label`と`:`、そして`field-value`で構成される

というシンプルな規則で構成されており、これを順に実行すれば良いだけです。

## 最後に
LTSVは非常にシンプルなフォーマットです。
そのためライブラリを利用せずとも、比較的容易にパースできるのが良いですし、Labeledであるため途中からの拡張にも強いです。
もし、ライブラリを使って変換するのであれば、LTSVのサイトで紹介されているライブラリを使うのが良さそうですね。
