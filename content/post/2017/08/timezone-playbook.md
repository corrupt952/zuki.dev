+++
title = "Timezoneを設定するPlaybook"
date = "2017-08-30T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "マシンのTimezoneの設定もPlaybbook化してみる。CentOS7では、**timedatectl**というコマンド経由で設定出来るので、それを利用する。"
tags = ["Ansible"]
+++

マシンのTimezoneの設定もPlaybbook化してみる。
CentOS7では、**timedatectl**というコマンド経由で設定出来るので、それを利用する。

```yml
---
- hosts: all
  become: true
  become_user: root
  vars:
    timezone: Asia/Tokyo
  tasks:
    - name: 'タイムゾーンを確認'
      shell: timedatectl status | grep "Time zone" | sed -e "s/.*:\s\(.*\)\s(.*)/\1/" | tr -d '\n'
      changed_when: false
      register: current_timezone
    - name: 'タイムゾーンの設定'
      shell: timedatectl set-timezone {{ timezone }}
      when: current_timezone.stdout != timezone
```
