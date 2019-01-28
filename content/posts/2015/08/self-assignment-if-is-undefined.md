+++
title = "未定義ならtrueを自己代入"
date = "2015-08-07T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2015/08/self-assignment-if-is-undefined/cover.jpg"
description = "よくRubyで||=を使って、初期値を設定する。"
tags = ["Ruby"]
+++

よくRubyで||=を使って、初期値を設定する。

trueかfalseのみ取り得る変数aに、定義されていなければをtrueで定義したい。
変数aは、すでに定義されているかもしれないし、そうでないかもしれない。
そういった時は、`a ||= true if a.nil?`と書く。

これで良いのかは分からないが、今の私が書けるコードである。

<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">
<a href="https://twitter.com/corrupt952?ref_src=twsrc%5Etfw">@corrupt952</a> nilの時(未定義)にtrueにするならa = true if a.nil?で良いんじゃないかな？自己代入しなくても。</p>
&mdash; ゆうじ＠カメさんコタツ終わりました (@yuji_developer) <a href="https://twitter.com/yuji_developer/status/629544548365000704?ref_src=twsrc%5Etfw">2015年8月7日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

と、指摘があった。
うむ、確かに。
