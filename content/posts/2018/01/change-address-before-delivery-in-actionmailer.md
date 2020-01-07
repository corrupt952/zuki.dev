+++
title = "ActionMailerで配信前にメールの宛先を変更する"
date = "2018-01-22T00:00:00Z"
draft = "false"
author = "K@zuki."
cover = "img/2018/01/change-address-before-delivery-in-actionmailer/cover.jpg"
description = "Railsガイドを読んだことある人であれば知っていると思いますが、ActionMailerには`register_interceptor`というメソッドがあり、これに特定のクラスを登録することで、メール配信前のフックを実現することができます。"
tags = ["Ruby on Rails"]
+++

Railsガイドを読んだことある人であれば知っていると思いますが、ActionMailerには`register_interceptor`というメソッドがあり、これに特定のクラスを登録することで、メール配信前のフックを実現することができます。
参考: [メールを配信直前に加工する](https://railsguides.jp/action_mailer_basics.html#%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%92%E9%85%8D%E4%BF%A1%E7%9B%B4%E5%89%8D%E3%81%AB%E5%8A%A0%E5%B7%A5%E3%81%99%E3%82%8B)
今回は、それのお話。

## 配信前に宛先を変更する
Railsガイドに書いてあることと内容が全く同じなので、余り意味がないかもしれません。
基本的には以下のステップで書きます。

1. フック用のクラスを作成する
2. `register_interceptor`にフック用のクラスを渡す

です。

### フック用のクラスを作成する
ここでやることは、以下になります。

* `delivering_email`メソッドを定義する
* メソッド内で宛先を書き換える

それをまとめると、以下の用になります。

```ruby
class TestEmailInterceptor
  def self.delivering_email(message)  # クラスメソッドとして定義する
      message.to = ["test@example.com"] # 宛先を書き換える
        end
        end
        ```

このようになります。
簡単ですね。

`delivering_email`の中では、まだ送信が確定されていないため、色々な加工をすることができます。（後日そのあたりを使った記事を書こうかと）

### `register_interceptor`にフック用のクラスを渡す
ここでやることは、以下になります。

* config/initializersに適当なファイルを用意する
* `register_interceptor`の引数に、フック用のクラスを渡す

今回は、`config/initializers/test_email_interceptor.rb`に定義することにします。

```ruby
ActionMailer::Base.register_interceptor(TestEmailInterceptor) if Rails.env.test?
```

のような形です。
最後に`if`をつけるのかどうかは、どういった処理にしたいかによるかと思います。

## 最後に
Railsガイドと全く同じと言っても良い記事になってしまいました。
自分のメモ用の記事として書いてみました。
途中でも書いた通り、後日今回のフックでメールのちょっとした配信制御などを記事にしようかなと思います。
