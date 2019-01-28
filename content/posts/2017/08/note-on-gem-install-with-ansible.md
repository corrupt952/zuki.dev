+++
title = "Ansibleでgem installする時の注意"
date = "2017-08-18T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "Ansibleでgem installしても、参照出来なくて困った時の話。"
tags = ["Ansible", "Ruby"]
+++

Ansibleでgem installしても、参照出来なくて困った時の話。

## Playbook
とりあえず、Playbookを貼ります。。

```yml
---
- hosts: all
  become: false
  tasks:
    - name: Download rbenv
      git:
        repo: https://github.com/rbenv/rbenv.git
        dest: /home/vagrant/.rbenv
        update: no
    - name: Download rbenv-build
      git:
        repo: https://github.com/sstephenson/ruby-build.git
        dest: /home/vagrant/.rbenv/plugins/ruby-build
        update: no
    - name: Set rbenv environment
      register: result
      changed_when: '"Set rbenv environment" in result.stdout'
      shell: |
        if [ "$(grep rbenv ${HOME}/.bashrc)" == "" ]; then
          echo 'Set rbenv environment'
          echo 'export PATH="${HOME}/.rbenv/shims:${HOME}/.rbenv/bin:${PATH}"' >> ${HOME}/.bashrc
        fi
    - name: Install ruby
      register: ruby_installer_result
      changed_when: '"Installing ruby" in ruby_installer_result.stdout'
      shell: |
        if [ "$(rbenv versions 2>&1 | grep 2.4.1)" == "" ]; then
          echo 'Installing ruby 2.4.1'
          ${HOME}/.rbenv/bin/rbenv install 2.4.1
          ${HOME}/.rbenv/bin/rbenv global 2.4.1
          ${HOME}/.rbenv/bin/rbenv rehash
        fi
    - name: Install bundler
      gem:
        name: bundler
        state: present
        executable: ${HOME}/.rbenv/shims/gem
        version: 1.15.3
    - name: Install rails
      gem:
        name: rails
        state: present
        executable: ${HOME}/.rbenv/shims/gem
        version: 5.1.3
```

余りキレイな書き方ではないのですが、

1. ホームディレクトリ配下にrbenvをインストール
2. ruby-buildを追加
3. rbenv周りの環境変数を.bashrcに追記
4. Rubyのインストール
5. bundlerのインストール
6. railsのインストール

をしているだけです。
このPlaybookを実行しても、bundleやrailsが見つかりません。
が、gem listにはあったのです。

まさか...

## --user-install
るということは、どこかにインストールはされているわけです。gem listにã<M-C-A>
今の設定で、参照出来なくてインストールされているとなると、可能性が高いのは、**--user-install**オプションをつけてインストールしているときです。

Ansibleの[gemモジュール](http://docs.ansible.com/ansible/latest/gem_module.html)のOptionsを見てみます。

--user-installに該当するオプションがありますね。
**user_install**です。
どうやら、デフォルト値がtrueになっているようです。

ということは、これをfalseで指定してあげればいいですね。

```yml
---
- hosts: all
  become: false
  tasks:
    - name: Download rbenv
      git:
        repo: https://github.com/rbenv/rbenv.git
        dest: /home/vagrant/.rbenv
        update: no
    - name: Download rbenv-build
      git:
        repo: https://github.com/sstephenson/ruby-build.git
        dest: /home/vagrant/.rbenv/plugins/ruby-build
        update: no
    - name: Set rbenv environment
      register: result
      changed_when: '"Set rbenv environment" in result.stdout'
      shell: |
        if [ "$(grep rbenv ${HOME}/.bashrc)" == "" ]; then
          echo 'Set rbenv environment'
          echo 'export PATH="${HOME}/.rbenv/shims:${HOME}/.rbenv/bin:${PATH}"' >> ${HOME}/.bashrc
        fi
    - name: Install ruby
      register: ruby_installer_result
      changed_when: '"Installing ruby" in ruby_installer_result.stdout'
      shell: |
        if [ "$(rbenv versions 2>&1 | grep 2.4.1)" == "" ]; then
          echo 'Installing ruby 2.4.1'
          ${HOME}/.rbenv/bin/rbenv install 2.4.1
          ${HOME}/.rbenv/bin/rbenv global 2.4.1
          ${HOME}/.rbenv/bin/rbenv rehash
        fi
    - name: Install bundler
      gem:
        name: bundler
        state: present
        executable: ${HOME}/.rbenv/shims/gem
        user_install: false # 追記
        version: 1.15.3
    - name: Install rails
      gem:
        name: rails
        state: present
        executable: ${HOME}/.rbenv/shims/gem
        user_install: false # 追記
        version: 5.1.3
```

これで期待するところにインストールされるようになりました。
一安心一安心
