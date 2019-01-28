+++
title = "Chronyをインストールする時のPlaybook"
date = "2017-08-29T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/08/chrony-playbook/cover.jpg"
description = "Chronyをインストールする箇所もPlaybook化。基本的に初期設定のままなので、何もいじらず書けばいい。"
tags = ["Ansible"]
+++

Chronyをインストールする箇所もPlaybook化。
基本的に初期設定のままなので、何もいじらず書けばいい。

<!--more-->

```yml
---
- hosts: all
  become: true
  become_user: root
  tasks:
    - name: 'chronyのインストール'
      yum:
        name: chrony
    - name: 'chronydをsystemdに登録'
      systemd:
        name: chronyd
        enabled: true
        daemon_reload: true
        state: restarted
      changed_when: false
```

今のところ複雑なプレイブック書いてないので、NTPサーバーを指定して、テンプレートを展開するようなタスクを追加してみようかなと思ったり。
