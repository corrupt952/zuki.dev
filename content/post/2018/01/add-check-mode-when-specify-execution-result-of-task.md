+++
title = "タスクの実行結果をwhenで指定するならcheck_modeつける"
date = "2018-01-26T16:53:24Z"
draft = "false"
author = "K@zuki."
cover = "2018/01/add-check-mode-when-specify-execution-result-of-task/cover.jpg"
description = "Ansibleでコマンドの実行結果をwhenで指定するなら、そのコマンドに`check_mode`をつける。"
+++

Ansibleでコマンドの実行結果をwhenで指定するなら、そのコマンドに`check_mode`をつける。
Ansibleの[公式ドキュメント](http://docs.ansible.com/ansible/latest/playbooks_checkmode.html#id2)に書いてあることだが、`cehck_mode: no` をつけないと、dryrunでコマンドが実行されずにエラーとなる。
Ansibleのバージョンが2.2未満であれば、`alwarys_run`というオプションがあるので、そちらを利用する。

エラーになるタスクの例は、下記のようになる。

```yaml
---

- name: 'LANGの確認'
  shell: localectl status | grep "System Locale" | sed -re "s/.*:\sLANG=//"
  changed_when: false
  register: current_lang

- name: 'LANGの設定'
  shell: localectl set-locale LANG={{lang}}
  when: current_lang.stdout != lang
```

dryrunを実行した場合、1つ目のタスク`LANGの確認`が実行されずに、2つ目のタスク`LANGの設定`のwhenが評価されてしまう。
が、`LANGの確認`はå®NGの確認`に`check_mode: no`をつければよい。

```yaml
---

- name: 'LANGの確認'
  shell: localectl status | grep "System Locale" | sed -re "s/.*:\sLANG=//"
  changed_when: false
  register: current_lang
  check_mode: no

- name: 'LANGの設定'
  shell: localectl set-locale LANG={{lang}}
  when: current_lang.stdout != lang
```

例の場合は、マシンに対しての破壊的タスクに対して追加しているわけではないが、破壊的なタスクにつければ、思わぬ変更が入ってしまうので注意しよう。
