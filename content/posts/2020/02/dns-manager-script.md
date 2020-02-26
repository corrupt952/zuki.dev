+++
title = "MacでネットワークのDNSサーバを変更するスクリプトを書いた"
date = "2020-02-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "新しいMacのセットアップや、ネットワークの追加した時にDNSサーバを変更する時があります.その時のセットアップを楽にするためにスクリプトを書きました."
tags = ["Shell"]
+++

新しいMacのセットアップや、ネットワークの追加した時にDNSサーバを変更する時があります.  
その時のセットアップを楽にするためにスクリプトを書きました.

[Gist](https://gist.github.com/corrupt952/292f36534e1af0aacf23874a90b3dd85)にアップロードしてあるので、具体的なスクリプトをそちらを参照してください.

## コマンド各種
`dns-manager.sh [verbs] [optins]` を意識して書いています.

### `Wi-Fi`ネットワークに設定されているDNSサーバを表示する
```sh
dns-manager.sh get -s Wi-Fi
```

### `Wi-Fi`ネットワークのDNSサーバにCloudflareのPublic DNSを設定する
```sh
dns-manager.sh set -s Wi-Fi -d cloudflare
```

### `Wi-Fi`ネットワークのDNSサーバにGoogleのPublic DNSを設定する
```sh
dns-manager.sh set -s Wi-Fi -d google
```

### `Wi-Fi`ネットワークのDNSサーバに指定したIPアドレスを設定する
```sh
dns-manager.sh set -s Wi-Fi -d 192.168.1.1 192.168.1.2
```

### `Wi-Fi`ネットワークのDNSサーバをクリアする
```sh
dns-manager.sh set -s Wi-Fi
```
