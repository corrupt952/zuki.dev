+++
title = "Deviseのメールを非同期で送信する"
date = "2017-12-21T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "Ruby on Railsを使った開発に関わっていると、Deviseを利用しているアプリケーションによく出会います。ここではDeviseの良し悪しはさておき、Gemを利用してDeviseが送信するメールを手軽に非同期送信してみます。"
tags = ["Ruby", "Ruby on Rails"]
+++

Ruby on Railsを使った開発に関わっていると、Deviseを利用しているアプリケーションによく出会います。
ここではDeviseの良し悪しはさておき、Gemを利用してDeviseが送信するメールを手軽に非同期送信してみます。

## TL;DR

* [devise-async](https://github.com/mhfs/devise-async)というGemを利用する
* config/initializer/devise_async.rbで設定を書く
* Deviseを使うARモデルのdeviseの引数に、`:async`を追加する

## 前提

* ActiveJobを使った非同期送信の仕組みを、アプリに組み込まれている（Sidekiqなど）
* Ruby on Rails ... 5.1.4
* Devise ... 4.3.0

## Deviseのメールを非同期送信する
[devise-async](https://github.com/mhfs/devise-async)というGemがあります。
これをGemfileに定義して、設定を書いて、ARモデルのdeviseの引数に`:async`を追加するだけです。

### Gemfileに追記する
これは書かなくてもいいレベルだと思いますが、`devise-async`を定義しましょう。

```ruby
gem 'devise-async'
```

### devise-asyncの設定を書く
今回は分かり易くするために、**config/initializers/devise-async.rb**を追加して、ここに書きます。

```ruby
Devise::Async.setup do |config|
  config.enabled = true
end
```

これだけです。

### deviseの引数に`:async`を追加する
Deviseを使うARモデルのdeviseの引数に`:async`を追加するだけです。
今回は、例としてUserクラスを使います。

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :async # NOTE: devise-async
end
```

これで完了です。

## 最後に
Deviseのメールを非同期で送信する場合の簡単な方法を書きました。
今回の記事を書くために、検証用に作ったアプリは、[send-devise-mail-asynchronously-sample](https://github.com/corrupt952/send-devise-mail-asynchronously-sample)に置いておきました。

今回の記事を書きましたが、Deviseがいいぜっていうわけじゃないです。
私自身、ちょっと前までは「Devise最高！」みたいなタイプの人だったのですが、今ではそれなりに後悔しています。
Deviseだと、やっぱり思想に従って書かないと途端に扱いづらくなるし、もっとシンプルなGemを利用した方がアプリとしては良いぐらいの時も多々ある。
結局、何事も適材適所です。
