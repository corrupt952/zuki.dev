+++
title = "特定の配列に別の配列の値が入っているか確認する"
date = "2017-12-24T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/12/confirm-that-specific-array-contains-a-value-of-another-sequence/cover.jpg"
description = "最近、Twitterでこんな話をみたような気がしなくもないんだけど、とりあえず仕事でも書く機会があったのでメモ。"
tags = ["Ruby"]
+++

最近、Twitterでこんな話をみたような気がしなくもないんだけど、とりあえず仕事でも書く機会があったのでメモ。

Arrayの[&演算子](https://ref.xaio.jp/ruby/classes/array/ampersand)を利用します。
結果である積集合が空かどうかをチェックすれば良さそうですね。

```ruby
a = [1, 2, 3, 4]
b = [3, 2]
puts (a & b).empty?
```

結果

```ruby
false
```

十分ですね。
`&`は他にも利用するシーンがあると思うので、うまく利用していけたらいいですね。
