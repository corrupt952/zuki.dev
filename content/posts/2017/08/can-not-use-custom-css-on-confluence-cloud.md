+++
title = "Confluence CloudでカスタムCSSが使えない"
date = "2017-08-03T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "個人で利用しているわけではないのですが、Confluence CloudではカスタムCSSが制限機能になっています。カスタムCSSだけでなく、他の多くの機能も制限されていますね。"
tags = ["Confluence", "Confluence Cloud", "Atlassian"]
+++

個人で利用しているわけではないのですが、Confluence CloudではカスタムCSSが制限機能になっています。

カスタムCSSだけでなく、他の多くの機能も制限されていますね。


## デフォルトのテーマ
Confluence Cloudデフォルトのテーマだと、h2,h3などの違いが非常に分かり辛いことを知っていますか？

<a href="https://1.bp.blogspot.com/-KmMU7nou2Pc/WhRkb1DcpHI/AAAAAAAAA0w/txuzOWk5Rb8uUqFZdam6Sb6wiiS1iSfsACLcBGAs/s1600/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588-2017-08-02-13.10.21.png" imageanchor="1" ><img border="0" src="https://1.bp.blogspot.com/-KmMU7nou2Pc/WhRkb1DcpHI/AAAAAAAAA0w/txuzOWk5Rb8uUqFZdam6Sb6wiiS1iSfsACLcBGAs/s400/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588-2017-08-02-13.10.21.png" width="400" height="210" data-original-width="368" data-original-height="193" /></a>

これがデフォルトのテーマなんですが、非常に見づらいですよね。
他のドキュメントを漁ると、テーマをインストールすればいいんだよとか書いてるんですが、**Confluence Cloudではインストールする方法が利用者側にない**です。
本当に悲しい。

## それでもレイアウトは変えたい
それでもレイアウトは変えたいですよね。
俺は変えたいです。
だって見づらいもん。

ちょっと冗長になるかもしれないですが、一番簡単な方法は、**各ページにStyleマクロを埋め込んでCSSを書いていく**ことです。

<a href="https://1.bp.blogspot.com/-x57NqIABelg/WhRkgY5ntCI/AAAAAAAAA00/oRkgoKV5_6I21xBPXikhxW5upcy2wD8uQCLcBGAs/s1600/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588-2017-08-02-13.15.15-1024x162.png" imageanchor="1" ><img border="0" src="https://1.bp.blogspot.com/-x57NqIABelg/WhRkgY5ntCI/AAAAAAAAA00/oRkgoKV5_6I21xBPXikhxW5upcy2wD8uQCLcBGAs/s400/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588-2017-08-02-13.15.15-1024x162.png" width="400" height="63" data-original-width="1024" data-original-height="162" /></a>

後は、このStyleマクロを埋め込んだテンプレートを用意しておくのがベターでしょう。

カスタムCSS制限するなら、もう少し見やすいテーマにしてほしい。
