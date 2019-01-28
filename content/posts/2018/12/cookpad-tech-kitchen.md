+++
title = "Cookpad Tech Kitchen参加してきた"
date = "2018-12-05T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/12/cookpad-tech-kitchen/cover.jpg"
description = "Coopad Tech Kitchen#20に参加してきました.その時のメモを書いておきます."
tags = ["イベント/勉強会", "Docker", "Amazon ECS"]
+++

Coopad Tech Kitchen#20に参加してきました.
その時のメモを書いておきます.

開催・運営してくださった方々、スピーカーの方々ありがとうございました.
どういった構成でCookpadのマイクロサービスを支えてるのかが、よく分かる資料でした.

## クックパッドでのサービスメッシュについて
<script async class="speakerdeck-embed" data-id="f88a0f0a351b4ab48a5c23994f558e81" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

クックパッド内部で、どういった構成でサービスメッシュを実現しているのかのかが分かるセッションだったと思います.  
印象に残った話としては、サービスメッシュよりかは技術スタックにGolangが入っていることでした.  
私個人としては、Rubyの会社というイメージが強かったので、興味深かったです.  
その日はすぐに帰ってしまったのですが、ã<M-C-A>©ういった役割のアプリケーションが動いているのか機会があれば聞いてみたいですね.  

ちょっとお酒飲んでてメモしてる場合ではなかった...w

## gRPC in Cookpad
 <script async class="speakerdeck-embed" data-id="6d5d1010c3b8443da060d5e9a82d9f75" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

何か使えそうなGemがなにかなーって思って探すと、ちょいちょい出てくるクックパッドさん.  
gRPCでも[griffin](https://github.com/ganmacs/griffin)というGemを作っているようで、さすがだなと思った.  
開発環境からStaging環境へアクセス可能なのは、開発速度が向上しそうでいい仕組みだと思う.  
registratorという役割のコンテナを入れるという発想は面白くて、結構好き.  
sdsへの登録以外でもこういった役割のコンテナを置いとくのは便利そう.  
 
* これまでのCookpad
進していた  * マイクロサービスã
  * GarageでAPI共通化 ... Garage,GarageClient
  * ドキュメントの自動生成 ... autodoc
* なぜgRPCを導入するのか
  * IDLとスキーマがほしい
  * RESTなエンドポイントへのマッピング困難だった ... RESTよりもRPCの方が適している事が多い
  * 多言語化したい ... Ruby以外の言語の使用実績の増加
* gRPCの運用
  * cookpad/sds+Envoyを利用して、クライアントサイドロードバランシングを実現
  * Envoyのload balancing weightを使ってSlow Startをサポートしている
  * Envoy経由でリクエストを受け付ける
  * 開発環境からStaging環境へのアクセスも許可している
* gRPC環境サービスイン時
  * 1つのサービスの構成は、Envoy(Frontend),Envoy(他サービス通信用),registrator,Appという4つの構成で話が進む
  * registratorは起動時にcookpad/sdsに対してEnvoy(Frontend)のエンドポイントを登録する
  * Slow Startの場合は、徐々にsdsに対してweightを上げいてく
* gRPC環境動作中
  * registratorが定期的にAppをヘルスチェックする
  * ヘルスチェックが成功したらsdsに再登録する
* gRPC環境通信時
  * AppがEnvoy(他サービス通信用）にリクエストをすると、そのEnvoyがsdsへ問い合わせて、適切なエンドポイントにリクエストする
* gRPC環境サービスアウト時
  * registratorコンテナがサービス終了時にエンドポイントをsdsに削除要求
* サービス定義の管理
  * 1つのリポジトリで全ての定義を管理している
  * サービス用定義は、`サービス名/`のディレクトリ配下に書いていく
  * 定義を使いたいサービスは、リポジトリ内にgit submoduleで追加する
  * protoc-gen-docでドキュメントを自動生成
* メトリクス
  * 2つのEnvoyコンテナでメトリクスを取得している
  * メトリクス。ログをPrometheusに入れていて、Grafanaで見れる
  * アクセスログに対してmtailを入れてPrometheusから読めるようにしている
  * Envoyコンテナがmtailコンテナをマウントして、mtailがEnvoyのアクセスログをPrometeus用に出力
* RubyでgRPC
  * 公式のgrpc gemはマルチスレッド、シングルプロセスで動作する
  * GILがあるので並列で動かない
  * grpc gemのロードマップでは直近で、マルチプロセス化はなさそう
  * grpc-toolでサーバ、クライアント用のコードを生成する
  * 開発者はサーバを実装するだけ！簡単！
  * アプリケーションレイヤーでアクセスログを取れないのでInterceptorを実装
  * シグナルを受けると死んでしまうので、起動/停止を行うライブラリを自作
  * その他にも様々なInterceptorを自作
  * app以下にサービスを定義し、lib以下に自動生成コードを配置
  * config/initializers配下にgRPCの設定を導入する
  * rake taskだとハマりどころが多いのでrails runnerで起動している
  * ActiveRecordのconnection poolとの相性が悪く、connection pool数の上限が並列数の上限となる
* grpc gemの問題
  * CPUを使いきれない
  * Graceful Shutdownがない
  * その他にもいろいろと...
* griffin
  * 自作のgRPCライブラリ
  * grpc gemにいつでも戻れるように、互換性を意識しながら開発している
  * unary RPCのベンチマークではgriffinの方が早い...
* 今後
  * カナリアリリース
  * griffinのプロダクション導入
  * grpc-gatewayの導入

## Amazon ECSの安定運用
<script async class="speakerdeck-embed" data-id="e60c599d23ca4fada0c143147204e5e4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

私も今の職場でECSで運用を開始するための準備を諸々しているのですが、その時のツラミを言っていて納得感があった.  
Spot Fleetを使ったことがないのだが、とても便利そうだなと思う.
コンテナ自体の監視はとても学びがあったのでありがたい.

* Fargate?
  * 部分的に利用しているが、基本的には自前管理のインスタンス
  * スポットインスタンスを使った方が安い ... 分かる
  * ユースケースは、ECSクラスタ自体を操作する処理、大きなCPU、メモリリソースを必要とするジョブ
* スポットインスタンスを利用したクラスタの管理
  * Spot Fleetで管理
  * オートスケールは自前
  * interruption noticeのイベントをSQSにキューイングしてサービスアウト処理
  * 通知が来てから2分以内に必ずサービスアウトしきる必要がある
  * DRAINING状態にしてECSに任せるだけでは間に合わない場合がある
  * 通知がきたらTarget Groupからderegisterし、タスクをとめる
£を確保しておく  * 突然一部のタスクが停止しても問題ないようにやや過剰にキャパシテã
* ログ
  * fluentdをホスト側で起動しており、ログドライバーで送信している
  * ログはs3において処理している
  * Amazon Athenaで検索できるように、AWS Glueでカタログ更新している
* モニタリング
  * CloudWatchにサービス単位のメトリクスは存在しているが、コンテナ単位でのメトリクスは存在してない
  * アプリケーション開発者がみたいのは、サイドカーではなくアプリ本体のメトリクス
  * cAdvisorでメトリクスを取得し、Prometeeusからそれをscrapeし、Grafanaで可視化するようにした
