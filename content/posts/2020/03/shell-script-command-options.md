+++
title = "シェルスクリプトにオプションを実装する"
date = "2020-03-11T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = ""
tags = ["Shell"]
+++

シェルスクリプトをよく書くのですが、そういった時によくオプションを指定して値を受け取りたいケースがあります.  
その時の書き方をメモしておきます.

``` bash
#!/usr/bin/env bash

verbose=false

while [ "$1" != "" ]; # "$1"が空文字列になるまで繰り返す
do
  case "$1" in
    # $1が-fまたは--fileなら、filepathに$2を代入する
    # その後、shift 2で引数を2つずらす
    -f|--file)
      filepath="$2"
      shift 2
      ;;

    # $1が-vか--verboseなら、verboseにtrueを代入する
    # その後、shiftで引数を1つずらす
    -v|--verbose)
      verbose=true
      shift
      ;;

    # それ以外の文字列ならエラー出力して終了する
    *)
      "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

echo "file: $filepath"
echo "verbose: $verbose"
```

whileの箇所は他にも書き方があり、「引数の個数が0を超えるなら繰り返す」という書き方もあります.

``` bash
while [ "$#" -gt 0 ];
do
    ...
done
```
