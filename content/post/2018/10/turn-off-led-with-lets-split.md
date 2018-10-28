+++
title = "Let's SplitでLEDをオフにする"
date = "2018-10-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/10/turn-off-led-with-lets-split/cover.jpg"
description = "[この記事](http://nillpo.hatenablog.com/entry/2017/09/10/015939)を参考にしただけなんですが、keymap.cに以下のコードを追加しました。"
tags = ["自作キーボード"]
+++

[この記事](http://nillpo.hatenablog.com/entry/2017/09/10/015939)を参考にしただけなんですが、keymap.cに以下のコードを追加しました。

```
#include "pro_micro.h"

void matrix_init_user(void) {
  TXLED0;
  RXLED0;
}

void matrix_scan_user(void) {
  TXLED0;
  RXLED0;
}
```

確かに`drivers/avr/pro_micro.h`に書いてるので、とりあえずはこれで。
ドキュメントにも書いてる関数もこの程度で十分そうなので、これで良さそうかな。
