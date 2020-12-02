+++
title = "AWS LambdaでRubyコンテナを動かしてみる"
date = "2020-12-02T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# cover = "/cover.jpg"
description = "re:Inventで[AWS Lambdaがコンテナをサポート](https://aws.amazon.com/jp/blogs/aws/new-for-aws-lambda-container-image-support/)したようなので、aws-lambda-rubyコンテナを使った動作確認をしてみました."
tags = ["AWS", "Ruby"]
+++

re:Inventで[AWS Lambdaがコンテナをサポート](https://aws.amazon.com/jp/blogs/aws/new-for-aws-lambda-container-image-support/)したようなので、  
aws-lambda-rubyコンテナを使った動作確認をしてみました.

TODO: ここにgistかgithubのリポジトリでも置いておく

## TL; DR

- コンテナがサポートされたことにより関数を実行するランタイムの柔軟さが向上した（ように思える）

- Lambdaで実行しづらかった一部のユースケースが利用可能になる程度で、ECSなどで実行されているような処理が置き換え可能になるわけではなさそう

## Lambda Functionを作成する

コンテナを使ったLambda Functionを作成手順は、以下のような流れになります.

1. Lambdaで利用するためのECRリポジトリを作成

2. Rubyランタイムで実行可能なコードを作成

3. Lambdaで実行するためのDockerfileを作成

4. コンテナイメージをビルド

5. コンテナイメージを1で作成したECRリポジトリにプッシュ

6. Lambda Functionを作る時に5で指定したコンテナイメージのURIを指定

それぞれについて少しだけ詳細に書いておきます.

### 1. Lambdaで利用するためのECRリポジトリを作成

特筆して書くことはないですが、コンテナイメージをプッシュするためにECRリポジトリを作成しておきます.

### 2. Rubyランタイムで実行可能なコードを作成

[Ruby の AWS Lambda 関数ハンドラー](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/ruby-handler.html)を参考にRubyランタイムで実行可能なコードを作っておきます.

今回は`app.rb`というファイル名で`www.khasegawa.net`へリクエストするだけのコードを作成しておきます.

```ruby
# app.rb
require 'faraday'

module LambdaFunction
  class Handler
    def self.process(event:, context:)
      response = Faraday.get 'https://www.khasegawa.net'
      puts response.body
    end
  end
end
```

### 3. Lambdaで実行するためのDockerfileを作成

Lambda Runtime API
どんなコンテナでも動作するというわけではなく[Lambda Runtime API](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-api.html)が実装されているコンテナである必要があります.  
実装するのは面倒なので[amazon/aws-lambda-ruby](https://hub.docker.com/r/amazon/aws-lambda-ruby)を使ってコンテナイメージを作成します.

```dockerfile
FROM amazon/aws-lambda-ruby:2.7
COPY Gemfile Gemfile.lock $LAMBDA_TASK_ROOT
# vendor/bundleにインストールしないと参照できないので注意
RUN bundle install --path vendor/bundle
COPY app.rb $LAMBDA_TASK_ROOT
CMD ["app.LambdaFunction::Handler.process"]
```

### 4. コンテナイメージをビルド

```bash
docker build -t xxx.dkr.ecr.ap-northeast-1.amazonaws.com/hasegawa-sandbox-lambda:latest .
```

### 5. コンテナイメージを1で作成したECRリポジトリにプッシュ

ビルドしたコンテナイメージをECRにプッシュします.

```bash
aws ecr get-login-password | docker login --username AWS --password-stdin xxx.dkr.ecr.ap-northeast-1.amazonaws.com
docker push xxx.dkr.ecr.ap-northeast-1.amazonaws.com/hasegawa-sandbox-lambda:latest
```

### 6. Lambda Functionを作る時に5で指定したコンテナイメージのURIを指定

以下のように、コンテナイメージを選択した上で、ECR上にあるコンテナイメージのURIを指定して関数を作成します.

{{< figure src="/img/2020/12/lambda-ruby-container/create-function.jpg" >}}

## 実行

実際に実行した結果としては以下のようになります.（見づらい）

{{< figure src="/img/2020/12/lambda-ruby-container/result.jpg" >}}

## さいごに

Lambdaでコンテナがサポートされたころにより、今までよりもランタイムが柔軟になり、  
利用するハードルやコンテナイメージの作成自体のハードルも低く、とても魅力的に感じました.  

とはいえ、実際に使ってみた感想としてはランタイムの柔軟性が増しただけのような気もするので、  
ユースケースによってはマッチしない可能性はありそうですね.