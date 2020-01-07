+++
title = "秘密鍵から公開鍵を生成する"
date = "2019-01-25T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2019/01/generate-public-key-from-private-key/cover.jpg"
description = "sshで利用する秘密鍵から対応する公開鍵を生成する時のメモです."
tags = ["SSH"]
+++

sshで利用する秘密鍵から対応する公開鍵を生成する時のメモです.

## 公開鍵を生成する
ssh-keygenの`-y`オプションを使って、秘密鍵から公開鍵を生成することができます. ※1

```sh
$ ssh-keygen -y -f id_ed25519
ssh-ed25519 XXXXXXXXXXX
```

秘密鍵に対してパスワードが設定されている場合は、パスワードの入力が求められます.

```sh
$ ssh-keygen -y -f id_ed25519
Enter passphrase:
ssh-ed25519 XXXXXXXXXXX
```

※1 参考: https://euske.github.io/openssh-jman/ssh-keygen.html

## さいごに
今回は秘密鍵から公開鍵を生成しましたが、これを利用すれば秘密鍵に使えるパスワードの確認もできます.
ケースとしてはssh-keygenで鍵を生成した直後に、設定したパスワードの有効性を確認することができますしね.
