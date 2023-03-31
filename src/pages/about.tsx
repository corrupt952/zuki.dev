import { Markdown } from "@/components/Elements/Markdown";
import { Page } from "@/components/Layout";

const markdown = `
個人の趣味志向に関しては[個人としての属性](https://www.notion.so/d19f6e7f39764e9fa972a1df68fd2ca6)を参照してください。

## スキル

主要なスキルのみ記載します。
ここに書いていないスキルに関しても、問題なく業務を行えるものもあるので気になる場合はお問い合わせください。

- Language
    - Ruby ... 8年
    - Go ... 3年
    - Python ... 4年
    - JavaScript（TypeScript含む） ... 5年
- CI/CD
    - GitHub Actions
    - CircleCI
    - Argo CD
- Monitoring
    - Elastic Stack
    - NewRelic
    - Datadog
- Cloud Infrastructure
    - AWS
    - GCP
- Tools
    - Ansible
    - Terraform
    - Docker
    - Kubernetes

## 職務経歴

個人事業に関しては[Work](/work)を参照してください。

2013/06～2018/09の約5年間、株式会社タイムインターメディアにて、各種基幹システムやWebサービスなどの開発・運用・保守・構築に従事し、チームメンバーの育成や、PMのサポートなども行っておりました。
2018/10からは、株式会社スタディストにてスタディストが運営する各種サービスの立ち上げ・運用・保守・開発サポート・構築・可用性やパフォーマンスの改善、自立した開発チームの育成や支援、業務を効率化するためのツールの提供、サービス全体のアーキテクチャのレビューや意思決定などを行っております。

主要な経歴を新しいものから順にまとめます。

### サービスのコンテナ移行 2019/06~2020/12

2013年から開発・運用されつづけているサービスを、開発から本番にかけて一環してコンテナを使った開発・運用を行えるような基盤の導入や整備を行いました。
サービスを停止させずにEC2からEKSの基盤へと切り替えました。

FYI: https://studist.tech/teahcme-biz-containerization-58908cbcf966

- 本番・ステージングなどの環境をEKSに移行
- 開発環境の整備
- CI/CDの整備
- EKSへ移行するにあたってのリリースフローの調整
- テスト環境をブランチごとに作成・更新されるような基盤調整

### 新サービス立ち上げ支援 2018/12~2019/03

新サービスの立ち上げの主にクラウドインフラ・開発環境・CI/CDの整備を行っていました。
このサービスでは、Clojureを使って書かれていますが、社内標準のAPMが[Ring](https://github.com/ring-clojure/ring)に対応していなかったため、対応したMiddlewareを社内向けに実装していました。

- サービスを構築
- 開発環境の整備
- CI/CDの整備
- モニタリングの設定
- APMをRingに対応させる

### 他チームや組織への支援 2018/10~

Enabling SRE・テックリードのような立ち位置として、コンテナ技術やシステム・各種アーキテクチャを踏まえた意思決定、リリース後の運用を考慮したアプリケーションや基盤の作り方、開発・運用にかけての相談や支援などを随時実施しています。

- DockerやKubernetesなどの技術情報共有や研修の実施
- 各種チームが自立したサービスの立ち上げから開発・運用まで一環して行えるような基盤やツールの整備から導入・運用までのサポート
- バグや障害発生時の調査や原因特定方法の共有やペアプロ
- パフォーマンス改善についての共有やペアプロ含む
- 開発に必要な自動化や標準化の導入や推進

### オンライン予約サービスの開発 2017/09~2018/02

開発リーダーとして開発に従事し、プロジェクトマネージャーの補佐として業務のサポートも行っておりました。
また、ここで初めてクラウドインフラに関する業務を自分でやる良い機会になりました。

- 予約サービスの開発
- 開発環境・デプロイフローの整備
- プロジェクトマネージャーのサポート（進行や進捗管理、顧客との関わり方など）
- デザイナーとエンジニアが連携しやすい環境整備（ポリシーやツールの統一など）

### VODサービスの基幹システム・Webサービスの開発・運用 2015/01~2018/06

初期は開発メンバーとしてコンテンツを管理する基幹システムを開発し、途中からは開発リーダーとして一般利用者が利用するWebサービスの設計・開発に従事していました。
途中からは、同系列のWebサービスの開発や運用にも従事していました。

- コンテンツ入稿システムの開発・運用保守
- VODサービスのアーキテクチャ設計・開発・運用保守
- 外部委託への管理
- 他チームへの開発サポートと全体最適化
- 開発環境・デプロイフローの整備

### 資格管理システムの開発・運用 2014/02~2014/12

開発メンバーとして開発に従事し、リリース後は開発リーダとして開発・運用に従事していました。
アルバイト時代から関わっているプロジェクトや、GitやRuby on Rails、複数人での開発や遂行、プロジェクト管理について学ぶ良い機会でした。
利用しているライブラリのバグ報告をする姿勢を学び、それが起きないようにテストドリブンな開発についても導入・実践しておりました。

- 資格管理システムの開発・運用

### 中古品ECサービスの開発 2013/06~2014/01

この当時はアルバイトとして開発に従事していました。
ほぼフルタイムとはいえ当時の開発で利用されているようなツールや概念については無知で、初めてSpring Framework、サービスのパフォーマンス、Git、Mercurialなどの技術について学びました。

- 中古品ECサービスの開発

## 保有資格

|名称|取得日|
|:--|:--|
|基本情報技術者|2012/05|
|応用情報技術者|2012/12|
|情報セキュリティスペシャリスト|2013/06|
`;

export default function About() {
  return (
    <Page>
      <Markdown markdown={markdown} />
    </Page>
  )
}
