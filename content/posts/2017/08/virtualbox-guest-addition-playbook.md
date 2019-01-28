+++
title = "VirtualBox Guest AdditionsをインストールするPlaybook"
date = "2017-08-17T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "[VirtualBox Guest AdditionsをCentOS公式のBoxにインストールする](/posts/install-vbox-guest-addition-to-centos7/)で書いた手順をPlaybook化。もう少しマシな方法があるんだろうけど、とりあえずはこれで。"
tags = ["Ansible", "VirtualBox"]
+++


[VirtualBox Guest AdditionsをCentOS公式のBoxにインストールする](/posts/install-vbox-guest-addition-to-centos7/)で書いた手順をPlaybook化。
もう少しマシな方法があるんだろうけど、とりあえずはこれで。

<!--more-->

```
---
- hosts: all
  become: true
  become_user: root
  tasks:
    - name: Get VBoxClient path
      changed_when: false
      shell: command -v VBoxClient
      register: vboxclient_result
    - name: Download VBoxGuestAddition
      get_url:
        url: http://download.virtualbox.org/virtualbox/5.1.26/VBoxGuestAdditions_5.1.26.iso
        force: no
        dest: /root/VBoxGuestAddition.iso
      when: vboxclient_result.stdout == ""
    - name: Mount VBoxGuestAddition directory
      mount:
        path: /mnt
        src: /root/VBoxGuestAddition.iso
        opts: loop
      when: vboxclient_result.stdout == ""
    - name: Install VBoxGuestAddition
      script: /mnt/VBoxLinuxAdditions.run
      when: vboxclient_result.stdout == ""
    - name: Unmount VBoxGuestAddition directory
      mount:
        path: /mnt
        state: absent
      when: vboxclient_result.stdout == ""
    - name: Delete VBoxGuestAddition.iso
      file:
        path: /root/VBoxGuestAddition.iso
        state: absent
      when: vboxclient_result.stdout == ""
```
