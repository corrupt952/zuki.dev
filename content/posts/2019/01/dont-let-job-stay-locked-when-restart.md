+++
title = "Delayed::Job再起動時にジョブがロックされたままにさせない"
date = "2019-01-30T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2019/01/dont-let-job-stay-locked-when-restart/cover.jpg"
description = "Delayed::Jobを気軽に再起動させたいために挙動確認した時のメモです."
tags = ["Ruby on Rails", "Delayed::Job"]
+++

Delayed::Jobを気軽に再起動させたいために挙動確認した時のメモです.

## 環境
* Ruby ... 2.6
* Ruby on Rails ... 5.2.2
* MySQL ... 5.7
* delayed_job_active_record ... 5.1.3
* daemons .... 1.3.1

また、Delayed::Jobを起動する際に共通するオプションとして`-n 2`を指定する前提で書きます.

ソースコードは、[graceful_delayed](https://github.com/corrupt952/survey/tree/master/apps/graceful_delayed)にまとめてあります.

## 再起動時にジョブがロックされたままにさせない
Delayed::Jobを`bin/delayed_job`経由で操作すると、[daemons](https://github.com/thuehlinger/daemons)というGemでWorkerプロセスが起動します.  
このdaemonsは停止命令（stop）が実行されると、そのプロセスで処理が終了するまで待ち、プロセスを終了させます.  
終了待機時間のデフォルト値は20秒となっており、20秒経っても処理が終了しない場合は処理を強制終了させます.

さてDelayed::Jobで20秒以上かかるジョブ実行中に、強制終了するとどうなるでしょうか？

実行中のジョブがロックされたまま、データベースに残り続けてしまいます.  
こうなってしまうとQueueに残り続けてしまうゴミデータとなりますし、最悪の場合処理が失敗しているかもしれません.  
では、ジョブがロックされたままにならないようにするにはどうしたら良いでしょうか？  
私が考えた方法は2つあります.

* `raise_signal_exceptions`に`:term`もしくは`true`を指定する
* daemonsの終了待機時間を`Delayed::Worker.max_run_time`に数秒足した値を指定する（例: `--daemon-options=-w,{seconds}`)

どちらが良いということもないはずなので、戦略的にどちらが良いのかを決めるのが良いでしょう.
