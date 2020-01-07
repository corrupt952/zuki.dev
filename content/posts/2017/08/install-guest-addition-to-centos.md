+++
title = "VirtualBox Guest AdditionsをCentOS公式のBoxにインストールする"
date = "2017-08-04T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "img/2017/08/install-guest-addition-to-centos/cover.jpg"
description = "CentOS公式のBox（Vagrant）だと、Guest Additionsがインストールされていません。これがインストールされてないと、VirtualBoxの共有フォルダーでマウントすることができません。"
tags = ["VirtualBox", "CentOS"]
+++

CentOS公式のBox（Vagrant）だと、Guest Additionsがインストールされていません。
これがインストールされてないと、VirtualBoxの共有フォルダーでマウントすることができません。
今日は、そんな時にどうやってインストールすればいいのかっていう話を。

## Guest Additionsをインストールする

Guest Additionsのインストールは、以下の手順に従って行えば良いです。

### 1. GuestAdditionのisoデータをダウンロード
[このページ](http://download.virtualbox.org/virtualbox/)から、適切なバージョンのGuest AdditionsのisoのURLをコピーしてください。
後は、それをwgetやらなんやらでダウンロードします。

```sh
wget -O VBoxGuestAdditions.iso {isoのURL}
```

### 2. isoをマウント
isoの中身をみるため、マウントしましょう。

```sh
sudo mount -o loop VBoxGuestAdditions.iso /mnt
```

後はインストール。### 3. Guest Additionsをインストールすã

```sh
sudo /mnt/VBoxLinuxAdditions.run
```

終わったらアンマウントを忘れないこと。
不要になったisoファイルも削除。
