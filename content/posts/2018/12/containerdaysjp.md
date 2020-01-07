+++
title = "Japan Container Daysに参加してきた"
date = "2018-12-06T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2018/12/containerdaysjp/cover.jpg"
description = "参加してきた時のメモを残しておきます."
tags = ["イベント/勉強会", "Docker", "Apache Mesos", "Kubernetes", "Cloud Native"]
+++

参加してきた時のメモを残しておきます.  
※ 写真を撮りたかったのですが準備ができてなかったのでテキストデータのみです.

まず最初にJapan Container Daysを開催・運営してくださった方々、登壇してくださった方々に感謝を.  
とても刺激的な2日間でよい時間を過ごせました.  
ありがとうございました.

## Microservices Platform on Kubernetes at Mercari
<script async class="speakerdeck-embed" data-id="5ce5dcf2ea464d0d97b41ecbc6841273" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

メルカリ内部のマイクロサービスプラットフォームがどうなっているのかがまとまっていた.  
メルカリはCloud Nativeを利用するだけではなく、Cloud Native関連のOSSを公開していくことで貢献していっているというスタンスはとても良い.（前から知ってるけど）

## Kubernetesによる機械学習基盤への挑戦
<iframe src="//www.slideshare.net/slideshow/embed_code/key/HOaF4FFWFsbiKK" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/pfi/kubernetes-125013757" title="Kubernetesによる機械学習基盤への挑戦" target="_blank">Kubernetesによる機械学習基盤への挑戦</a> </strong> from <strong><a href="https://www.slideshare.net/pfi" target="_blank">Preferred Networks</a></strong> </div>

PFNの機械学習基盤でどうKubernetesが使われているのかがまとまっていた.  
こちらでもOSSで貢献していくというスタンスはとても良いと思う.

## LINE Engineerを支える CaaS基盤の今とこれから
<iframe src="//www.slideshare.net/slideshow/embed_code/key/2DA1FmBFKTyozd" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/linecorp/line-engineer-caas" title="LINE Engineerを支える CaaS基盤の今とこれから" target="_blank">LINE Engineerを支える CaaS基盤の今とこれから</a> </strong> from <strong><a href="https://www.slideshare.net/linecorp" target="_blank">LINE Corporation</a></strong> </div>

LINEのプライベートクラウドの開発基盤の変遷についてまとまっていた.  
まず一言言えば、**規模が違う**.  
とはいえ、開発者のために使いやすい環境を提供するというスタンスは良いと思った.  
ここまでの規模は難しくても、それを意識していきたい.  

## Cloud Native の未来とIBMの取り組み
<iframe src="//www.slideshare.net/slideshow/embed_code/key/IbWobbGt583mpD" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/capsmalt/jkdv1812keynoteibmcapsmalt" title="JKDv18.12_keynote_ibm_capsmalt" target="_blank">JKDv18.12_keynote_ibm_capsmalt</a> </strong> from <strong><a href="https://www.slideshare.net/capsmalt" target="_blank">capsmalt</a></strong> </div>

IBMがどうCloud Nativeに関わっているのか、どういうサービスを展開しているのかが分かるセッションだった.  
Kubernetesを使うことで、どこでもWatsonを動かすことが可能になったという話は興味深かった.  

## ZOZOTOWNリプレイスにおけるKubernetes活用
<script async class="speakerdeck-embed" data-id="c194db73d6c541bda9d241f932f109ca" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

ZOZOがどうKubernetesを活用しているのか、活用した上でどう運用しているのかが分かるセッションだった.  
k8sを導入することで、運用コストが下がって、信頼性が向上したというのは興味深いですね.  

## IBM Cloud Kubernetesの全貌と始め方
<script async class="speakerdeck-embed" data-id="6635fd8d1cc24e12980acd39ed072118" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

IBM Cloudのサービスの1つであるIBM Cloud Kubernetesについての説明.  
当初思っていたよりも、思っていたよりも使いやすそうだった.  
IKSの具体的な使い方はスライドを見てもらった方が良さそう.  
年齢的に知らないはずだけど何故か知ってるOS/2 WarpがIBMの歴史で出てきたのが嬉しかった.  

* Redhat買収するぐらいCloudNativeに力を入れてる
  * まだまだこれから
* ICP(IBM Cloud Private)とIKS(IBM Cloud Kubernetes Service）の2つのサービスがある
  * どちらもKubernetes
  * ICPは、オンプレでも動くソフトウェアパッケージ
* IKSとは
  * コンテナ層、オーケストレータ層、インフラ層の3層を定義する
  * k8sを使っているので、ベンダーロックな技術がなくても良いというメリットがある
    * ほぼ設定を変えなくても、他のクラウドサービスのk8sで動かせる
  * k8sの1.11の完全保証
  * インフラ層を気にしなくて良いサービスである
  * 諸々抽象化されてて、いちいち自分で構築する必要がない
    * Grafana、Kibana,k8sクラスタのノード
    * バージョンアップもグレイスフルでいけそう
* IBMのグローバルネットワークはすごい
  * 地球一周するデータセンター間ネットワークを持っている
  * 全てをパブリックなDCではなく、政府などに貸し出しているDCもある
  * 42DC中、31DCでIKSが使える

## Kubernetes がもたらす 分散システムの脅威との戦い
<script async class="speakerdeck-embed" data-id="fbd1b8ed2e444d80976bbf585459c761" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Kubernetesを導入した時から、組織や仕組みについての説明.  
システムを導入するために組織を変革するのはとても勇気がいる判断だと思うし、それで導入しているのは正直凄い.  

* 全てのシステムをk8sに移行した
  * これで分散システムの恩恵を受けたが、問題も発生した
* 新しい部分からマイクロサービス化していった
* 組織全体で利用
  * 全員で1つのマシンを使うようにしている
  * k8s管理専属のチームがいる
* devが触れる領域が狭く、インフラとの技術的断絶が発生していた
  * k8sを導入することで、devが触れる領域を増やしていった
* マイクロサービスを導入した理由
  * 最初は単純な技術的な興味
  * コアバリューを守るためにマイクロサービス化していった
  * 逆コンウェイを起こして、スケールする組織を作るため
* 学習コストが膨大になりがちなので、シンプルに保つ
  * 良いエコシステムはあるが、学習コストがかかるので、場合によっては必要最小限なツールを作る
  * kubectlは機能が多いので、軽くwrapしてる
* 増え続けるマイクロサービスの脅威
  * k8sのアップグレードなどがあると、一貫性のある基盤を維持するのが難しい
  * 毎回別のサービスの同じリクエストするのは無駄なのでキャッシュを導入したが、開発者がキャッシュ設計が難しい場合があるので、k8s管理チームが仕組みを作っておこうね
* k8s自体も分散システムなので、動作が不安定なときはそれなりにある
  * k8s自体のバグとか
  * 専任のチームがいないと何かあったときに対応できない
* ネットワークを信頼しない
  * 分散トレーシング、ネットワークを可視化するのが大事
    * Twitterが約5年前に取り組んでいた問題だった
* **早すぎる最適化をしない**

## 40 topics of Kubernetes
<iframe src="//www.slideshare.net/slideshow/embed_code/key/gSAH6woAqbvSFG" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/tyoshio2002/japan-container-day-2018" title="Japan Container Day 2018" target="_blank">Japan Container Day 2018</a> </strong> from <strong><a href="https://www.slideshare.net/tyoshio2002" target="_blank">Yoshio Terada</a></strong> </div>

KubernetesだけでなくDockerを使う上での心構え的な話しもあった.  
改めて振り返ることができたので面白いトピックだった.  
てらだよしおがんばった. ([参考](https://twitter.com/search?q=%23%E3%81%A6%E3%82%89%E3%81%A0%E3%82%88%E3%81%97%E3%81%8A%E3%81%8C%E3%82%93%E3%81%B0%E3%82%8C&src=typd))  

## Ansible,Terraform,Packerで作るSelf-Hosted Kubernetes
<script async class="speakerdeck-embed" data-id="fa9323ec50b0498d90c31a2f52020dfe" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

KubernetesでKubernetesクラスタを管理することで、Kubernetesが持つ機能の恩恵を受けようという話.  
実際にどうSelf-Hostingしていくかの話が盛り込んであって学びのある良いセッションだった.  

* OpenStackを用いたPrivateCloudを使っているが、PublicCloudも一部使っている
* (C,P,F)aaSを提供することで生産性を向上させたい
  * まずはk8sでCaaS
    * Swarmではだめなの？ ... k8sが持つ機能が強力かつ利用したいため、k8sがいい
* どうやって構築する？
  * k8sの構築・運用はシンプルにしておきたい
* それならどうする？
  * マネージドサービスと思いきや、Self-Hosted Kubernetes
  * k8sが自分自身を管理する
    * Auto-headlingなどどいった機能をk8sの管理で使うことができる
* Self-Hosted Kubernetesとは？
  * kubeletで各コンポーネントで管理することで、ホスト自体で管理するコンポーネントを減らせる
  * ファイルやSSHの設定管理をしなくてもよい
  * Self-Hostedだと、デバッグや調査ができる
  * 冗長構成を組むのもk8sで管理できるo
  * レイヤーを定義して、どのレイヤーをSelf-Hostedするかというので全く違ったSelf-Hostedになる（難易度が変わる）
* 自作してみた
  * 構成
    * kubelet ... Systemd管理下
    * etcd ... StaticPodを用いてk8s管理下
    * apiserver,scheduler,etc ... k8s APIを用いてk8s管理下
* Packerは何に使ってるの？
  * ベースイメージにDockerやkubelet、その他の全ノードで使うソフトウェアのインストールができる
  * ここでもAnsibleも使っている
* Terraformは何に使ってるの？
  * Self-Hosted Clusterのホストマシンリソースを管理している
* 得られたもの
  * 実際に手を動かすことによって、Self-Hostedをより詳細に理解することができた
  * 実装難度もわかった
  * k8sの各コンポートがどんな役割があったのかをしれた
* 今後の課題
  * Self-HostedされていないDocker,kubeletをどう更新するか
    * 今は、1ノードずつサービスアウト、更新、サービスインをやっている
    * Immutable Infrastructureの考え方を適用できないかを考えた
      * 思っていたよりも
  * ノードの増減をどうするか
    * Terraformのcountを使えば増減は可能
      * 減らすときはdrainしておく
    * k8s管理下におけるとよりよくできそう

## Knativeのすべて
記事作成時点でスライド未発見.(見つけ次第アップデートするかもしれない)  
眠かったので正直あんまり覚えてない...  
Knativeは、こんなに簡単に扱えるよ！っていうセッションだったはず.  
まともに覚えてるのAge of EmpiresとCiv6の話が出てたということ.  
いや、ほんとすんません... まじで...  

### Civ6知らない人向けの話
Civ6のテクノロジツリーでは、以下のように8時代あります.  
スライドで出ていたのは、この時代の中の最初と最後です.  

* 太古
* 古典
* 中世
* ルネサンス
* 産業時代
* 近代
* 原子力時代
* 情報時代

**太古は灌漑や畜産、青銅器などが始まる時代**で、**情報時代はステルス技術やロボット工学が始まる時代**です.  
Age of Empiresの例では、石器時代から鉄器時代への進化という例を出していて、この程度の進化じゃなくて、Civ6の太古時代から情報時代ぐらいへの進化が求めているものですよねっていう話だったと思います.

## Cloud Native プロダクト 1000本ノック
記事作成時点でスライド未発見.(見つけ次第アップデートするかもしれない)  
Cloud Nativeプロジェクトについてざっと話していた.  
最後はCNCF LandscapeのTrail mapの画像を出して、これぐらいあるんですよで終了.  
結構知らない技術も多かったので知る機会が得られて良かった.  

*  What is Cloud Native
  * 疎結合なシステム
  * 復元力
  * 管理しやすい
  * 可観測
  * 堅牢な自動化最小限な労力で堅牢な自動化
* X as a Service
  * k8s上で展開するソフトウェアが多い
* Vitess
  * シャーディングすることでMySQLをスケーラブルに扱うMySQL as a Service
* NATS
  * Go言語製のメッセージングソフトウェア
  * データストリーミングや様々なメッセージングを扱う
* Rook
  * Storage as a Service
  * Ceph Operatorを使うことで、ほぼ全ての種類のストレージサービスをk8s上に展開できる
* TiKV
  * KVS as a Service
  * CNCFのSandboxプロジェクト
* ServiceMesh
  * 多くのマイクロサービスがあると、可観測できることが重要
  * そういう時に使うのが大事
* Istio
  * CNCFがホストするEnvoyプロ棋士を使用
  * 複数のk8sクラスタをサービスメッシュでつなぐことも可能
* Linkerd & Conduit
  * Conduitはモニタリングツールとしてはよい
* Spinnaker
  * 継続的デリバリーツール
* Weave Flux
  * GitOpsを実現するソフトウェア
* Argo
  * CRDをリヨ空いてワークフローを設定を記述
  * ｋubflow内部で利用されている
* kubeflow
  * ML基盤を展開するサービス
* Telepresence
  * 開発時のミドルウェアをk8sで管理できる開発サポートツール
* Skaffold
  * イメージのビルド・プッシュ・デプロイを自動化できる
* Helm
  * k8sのパッケージマネージャ
* ksonnet
  * jsonnet:jsonを拡張したデータテンプレート言語
* Cortex
  * Prometheus as a Service ... マルチテナント環境でPrometheus
* Thanos
  * 古いデータを消すのではなく、S3 BucketやGCS Bucketに転送する
* [CNCF Trail Map](https://github.com/cncf/landscape#trail-map)

## LINE 機械学習
<iframe src="//www.slideshare.net/slideshow/embed_code/key/y7usZ6F99TCszF" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/linecorp/kubernetesrekcurd" title="Kubernetes上で動作する機械学習モジュールの配信＆管理基盤Rekcurd について" target="_blank">Kubernetes上で動作する機械学習モジュールの配信＆管理基盤Rekcurd について</a> </strong> from <strong><a href="https://www.slideshare.net/linecorp" target="_blank">LINE Corporation</a></strong> </div>

* 機械学習プラットフォームを誰がどう管理するのか
  * スーパー機会学習エンジニアならできるけど、一般的なエンジニアには無理
  * 実装後に、いきなりインフラエンジニア渡されても使い方悪いし、運用するにはリソース管理がざらな時もある
* こういった課題を解決するためにRekcurd
  * 機会学習モジュールの配信を簡単に
  * 機会学習モデルの管理と運用を簡単に
* Rekcurdのコンセプト
  * 機会学習モジュールの配信を簡単に
  * 機械学習モデルの管理と運用を簡単に
  * 既存のシステムへの統合を簡単に
* Rekcurdとは
  * フレームワークなので、あらゆるアルゴリズムを配信可能
  * gRPCサービスとして配信できる
* Rekcurd Dashboardとは
  * 全てのRekcurdを管理できる
  * モデルのアップロード・バージョニング可能
  * WebUIで誰も簡単に操作可能
* Rekcurd Clientとは
  * SDKとして使える
  * Netflix Feignのように使える

## runcだけじゃないlow level runtime徹底比較
<script async class="speakerdeck-embed" data-id="3bd372ee2c91404d9bf50b0f078f2e4b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

結構しっかり書いていて、面白い内容だったと思う.  
ここに載ってないランタイムもあるそうなので、誰かやってくれるのか期待.  

* 色々なlow level runtime
  * runc,runv,cc-runtime,kata-runtime,runq,runnc,runsc,railcar
* gVisor
  * アプリケーションが発行するsystem callをフックして盛業する
  * AppEngineで使われている
  * dmesgがランダムなメッセージが出るw(事前に配列で定義されている中から10行が出る)
* ベンチマークツール
  * bucketbench ... runcしか対応してない
  * cri-tools ... 使い勝手が悪い（大体固定）
  * 今回試したい用途にはどちらも合わないので自作した
* 結果
  * 大体runncが早い
  * deleteはどれも横ばいなので、クライアントが非同期で消してると思われる
* その他
  * Nabla Containers ... https://nabla-containers.github.io/
  * https://podman.io/ ... RedHat OS 8から標準搭載らしい
  * ctr
    * containerdを直接叩くCLI
      * dockerd経由じゃないのでdelete以外は早い
      * dockerd経由のdeleteは非同期でやってるから早いように見えてるだけ

## Kubernetesと暮らすRancherな生活
<iframe src="//www.slideshare.net/slideshow/embed_code/key/LHvJt4semoPJlZ" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/gchiba/kubernetesrancher-125017022" title="Kubernetesと暮らすRancherな生活" target="_blank">Kubernetesと暮らすRancherな生活</a> </strong> from <strong><a href="https://www.slideshare.net/gchiba" target="_blank">Go Chiba</a></strong> </div>

Rancherとその周辺ツールについて簡単にまとまっていた.  
初めて触ったのが1系だったので、今は結構変わってるんだなと実感.  

*  What's Rancher?
  * OSSなコンテナ管理ツール
  * クラスタの構築・管理
* Rancher and Orchestrator
  * k8sとは別のレイヤーのツールという認識
    * https://rand.pepabo.com/article/2017/06/28/iot38-matsumotory/
    * ストラテジー層
  * 2.xはまた別の機能なので、どのレイヤーに所属するのかは議論の余地あり
* v1.x
    * 実装 ... Java + Go with mysql
    * v1 ... swarm,mesos,k8s,etc...
    * アプリケーションワークロード管理 ... docker-compose
* v2.x
    * 実装 ... Go with etcd
    * 管理対象 ... k8sにフォーカス
    * アプリケーションワークロード管理 ... helm
* Rachner関連ツール
  * 似たような名前のツールもあるから混同しないでね
  * Rancher ... 今回の話し
  * Rancher OS ... コンテナ向けの軽量OS
  * Project Longhorn ... iSCIをベースとした分散ストレージ
  * RKE ... Rancher k8s Engine. k8sのインストーラー
* Rancher 2.0
  * Multi Cluster Support ... Managed k8s service support, on/off prem IaaS support
  * Import Cluster
  * Workloads Management
  * Pipeline(他のCI/CDと被りそうだが使い方次第)
* ユースケース
  * Application配信基盤 ... CaaSのような使い方ができる
  * 開発基盤 ... 既存のパイプラインで一部組み込んだり
* RIO
  * https://github.com/rancher/rio
  * Componentsは、containerd・k8s・istio・flannel
  * standaloneとk8s上で動かすというやり方がある
* 最後に
  * KnativeもRIOもそうだけど、今後はインフラを意識にせずにアプリケーションを運用する時代がきてるな
* その他
  * https://www.slideshare.net/linecorp/rancher-20-technical-deep-dive
  * RancherのSlack
    * http://slack.rancher.jp/

## showKs
記事作成時点でスライド未発見.(見つけ次第アップデートするかもしれない)  
showKsの開発裏側を説明していた.  
結構楽しそうに話していたので、学生時代の夜更かしして何かやっていた時を思い出した.  

* 10/11開発開始したけど、打ち合わせするたびに複雑化していく構成
* 開発活動時間帯 22:00-28:00
* showks-terraform ... https://github.com/containerdaysjp/showks-terraform
* showks-form ... https://github.com/containerdaysjp/showks-form
* Concource pipeline
  * GitOps的な形で、各リポジトリのマニフェスト生成と、各マニフェストをまとめるビルドを分けてる
* GitOpsの考え方 ... Single source of truth
* なぜSpinnaker
  * なんかもてそう
  * cloud nativeっぽい
* 宣言的デプロイはCloud Nativeっぽい
* ポータル <-> アグリゲーター <-> 各APIサービス（マイクロサービス的なコンテナ）といった構成
  * 全部NodeJSで実装
* アプリケーションを本業にしてるメンバーが居なかったので次回は居てくれたら助かる

## Apache Mesos
### Apache Mesos
<script async class="speakerdeck-embed" data-id="d3cbbb215b044973ab360fc5279d4417" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Apache Mesosについて分かりやすいセッションであった.  

* Apache Mesos
  * 従来のシステム管理だと、マシンリソース管理や、冗長性を管理するのがつらい
  * Mesosは、カーネルのタスクスケジューリングをシステムレベルで行う
  * 物理・仮想マシンリソースが何台あろうと、1つのマシンリソースとして扱える
  * データセンターカーネルと呼べるもの
* Apache Mesos Architecture Overview
  * Mesosは、Mesos Master・Mesos Agent・Frameworkからなる
  * Mesos Masterの役割
    * Mesos AgentとFrameworkを管理する
    * リソース割り当て・最適配置を行う
    * Framework(Scheduler)からの要求受付と結果通知
    * ZooKeeperによって冗長化されている
  * Mesos Agentの役割
    * リソース情報をMasterに通知
    * Framework(Executor)によるタスクの実行と結果通知
  * Frameworkの役割
    * SchedulerとExecutorで構成される
    * SchedulerはMasterへタスク実行を要求する
    * ExecutorはAgent上でタスクを実行する
    * Executorは、Containerによる実行も対応している
  * Matathonという長期実行アプリケーション向けに設計されたFrameworkの1つ
  * 他にもFrameworkはあるよ
* Mesosphere DC/OS
  * Mesosphere DC/OSは、分散クラウドオペレーティング・システムという立ち位置
  * 商用版もあるよ
  * 分散システム自体の管理が得意
  * `Mesosphere Kubernetes Engine`というものもあるので、k8s as a Serviceといった利用方法も可能

### IQONクローラー基盤【Mesosユーザ事例】
<script async class="speakerdeck-embed" data-id="f95374a831894f9f8250eb700f2a54a8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

2016年当時のクローラー基盤が抱えていた課題の話から、その課題にマッチしたのがMesosであったということが分かりやすくまとまっていた.  
最後のスライドに詳しく知りたい人向けのリンクが載っている.  

* IQONでは、クローラー基盤としてMesosを利用している.
* 2016年当時、300 EC Sites, 1,000,000 fashion itemsほどのデータをクロールしていた
* クローラー基盤で動く処理をワーカーと呼び、役割ごとに多段化していった（ダウンロードするだけ役割をもつワーカーなど）
* 2016年当時のクローラー基盤の課題
  * ワーカー毎にCPU,メモリといった必要なリソースを異なり管理する必要がある
  * 実行される日次によっては、個々のインスタンスリソースを考慮する必要がある
  * ワーカーのプロセスをコントロールプレーンから操作可能にする必要がある
* そこで出会ったのがMesos（課題を解決できそうだったのが）
  * Mesosの思想 ... 分散環境を巨大な計算資源をしてみなす
    * この思想のシンプルさがベストマッチ
  * シンプルなクラスタ管理が可能
    * Linuxディストリによっては、apt/yumでインストールでき、比較的容易に構築可能
  * ドキュメントが豊富
    * 詳細な公式ドキュメントがあり、公式を探せば良いという安心感があった
* シンプルに使うためにあえてDC/OSはあえて使っていない
* その他
  * クロールする時は、ECサイト運営と話し合ってから紳士的な頻度でクロールしている
  * 詳しく知りたいなら
    * [Docker / Apache Mesos / Marathon による3倍速いIQONクローラーの構築](https://qiita.com/kotatsu360/items/ffd509c666f8e64a32a7)
    * [Apache Mesos  with Amazon EC2 SpotFleet](https://speakerdeck.com/kotatsu360/apache-mesos-with-amazon-ec2-spotfleet)

## Kubernetes Meetup Tokyo 2年間の振り返りと未来
<script async class="speakerdeck-embed" data-id="4e92bdb0ec4e447faa7e8ba8300a1542" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Kubernetesと簡単な歴史とKubernetes Meetup Tokyoの歴史を時系列で遡っていったセッションだった.  
最後にスピーカー達が気になる話をしていて、個人的には[virtual-kubelet](https://github.com/virtual-kubelet/virtual-kubelet)が面白そうだなといった印象を受けた.  

## 最後に
とても参加する意義のある日々だったと思う.  
結構Kubernetesの話が多かったので、他のCloud Native話を聞けると個人的にはもっと嬉しかった.  
とはいえ、俺が期待している細かい中の話は勉強会やもっと小規模なイベントでする話なのかもしれないなと思う.  
イベントの中で一番心に残ったのは、**Dockerを知っていても、使い方を知っている人はそこまで居ない**です.  
言われみれば「確かに確かに」と納得するのですが、結構忘れがちかなと思いました.

次回からは、**Cloud Native Days**に名称変更されるので、次回も参加できるようであれば参加していきたい.

## その他
* [JapanContainerDays v18.12 のスライドたち](https://www.hidekazuna.org/?p=843)というスライドへのリンク集作っていた人がいたので、スライド探すために参考にした
* [JapanContainerDays Team](https://medium.com/@containerdaysjp) ... Mediumの公式アカウント. まとめ記事作ってくれてる
