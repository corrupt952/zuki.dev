+++
title = "WSL上で実行されているかどうかを判定する"
date = "2020-11-30T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# cover = "2020/11/wsl-check-script/cover.jpg"
description = "スクリプトがWSL上のLinuxで動作しているかどうかを判定できるようにしておくと、macOSやWSLといった複数環境をサポートするスクリプトを書いている時に少しだけ便利になります."
tags = ["Shell", "WSL"]
+++

スクリプトがWSL上のLinuxで動作しているかどうかを判定できるようにしておくと、  
macOSやWSLといった複数環境をサポートするスクリプトを書いている時に少しだけ便利になります.

判定方法としては、ファイルの内容やコマンドの実行結果によって判断する方法などいくつか存在しますが、  
今回は「`/proc/sys/fs/binfmt_misc/WSLInterop`ファイルが存在しているかどうか」で判定する方法です.

「`/proc/sys/fs/binfmt_misc/WSLInterop`ファイルが存在しているかどうか」だけなので非常に簡単に判定することができます.

```bash
[ -e /proc/sys/fs/binfmt_misc/WSLInterop ]
```

実際にスクリプトで使う利用する場合には、関数として切り出しておき必要に応じて呼び出すようにしておくと良さそうです.

```bash
#!/usr/bin/env bash

os::is_wsl() {
  [ -e /proc/sys/fs/binfmt_misc/WSLInterop ]
}

# e.g. if-statement
if os::is_wsl; then
  # WSL
else
  # Others
fi
```

※ 個人で利用しているdotfilesでは[os::is_wsl()](https://github.com/corrupt952/dotfiles/blob/main/.config/zsh/.zshrc.functions#L38-L40)のように関数として定義しています
