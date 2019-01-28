+++
title = "Playbookでuserを指定するとuserオプションが無視される"
date = "2017-12-19T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "Playbookでuserを指定すると、`ansible-playbook`の`--user`オプションが無視される。Playbookでuserを指定しないで、コマンド実行時にuserを指定するように統一した方が、実行時に変にハマらなくて良さそう。"
tags = ["Ansible"]
+++

Playbookでuserを指定すると、`ansible-playbook`の`--user`オプションが無視される。
Playbookでuserを指定しないで、コマンド実行時にuserを指定するように統一した方が、実行時に変にハマらなくて良さそう。
