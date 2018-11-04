+++
title = "自己署名証明書サイトに対してHeadless Chromeでスクリーンショットを撮ろうとしたら撮れない"
date = "2018-11-05T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "2018/11/can-not-take-screenshot-when-try-to-take-screenshot-with-headless-chrome-for-self-signed-certificated-site/cover.jpg"
description = "11月からT-Potを個人で運用を始めており、日々の攻撃傾向などが表示されるダッシュボードのスクリーンショットを自動で送ってくれる仕組みを構築中です.そこでHeadless Chromeが必要なダッシュボードにアクセスし、スクリーンショットを撮る仕組みを構築中に、自己署名証明書サイトに対してスクリーションショットがうまく撮れなかった悲しい経緯を紹介します."
tags = ["セキュリティ", "Ruby"]
+++

11月からT-Potを個人で運用を始めており、日々の攻撃傾向などが表示されるダッシュボードのスクリーンショットを自動で送ってくれる仕組みを構築中です.
そこでHeadless Chromeが必要なダッシュボードにアクセスし、スクリーンショットを撮る仕組みを構築中に、自己署名証明書サイトに対してスクリーションショットがうまく撮れなかった悲しい経緯を紹介します.

## TL;DR
* 自己署名証明書サイトに対しては接続自体が成功していない様子
* `accept_insecure_certs: true`を`Selenium::WebDriver::Remote::Capabilities.chrome`に渡すHashに追加してリクエストする

## 環境
### クライアント環境
比較的書きなれているRubyを使って今回は話を進めていきます.
Alpine Linuxを使っている理由は、今後はCircleCIなどで定期実行する予定があるためです.

* Alpine Linux ... 3.8
* Ruby ... 2.5.3
* Chromium ... 68.0.3440.106
* chromedriver ... 2.38 (chromium-chromedriver)

### 接続先環境
タイトルに書いてある通り、自己署名証明書を使っています.

* Kibana ... 5.6.9
* T-Pot ... 17.10


### Dockerfile
Alpine Linuxベースのイメージで作っています.
```Dockerfile
FROM alpine:edge

RUN apk add --no-cache --update \
		udev ttf-freefont chromium chromium-chromedriver \
		ruby ruby-bundler ruby-dev ruby-json build-base \
		libxml2-dev libxslt-dev libffi-dev zlib-dev mesa-dev

RUN mkdir /app \
	&& gem update --system --no-doc --no-ri

WORKDIR /app
```

## Seleniumで撮ってみる
これから先の話をする前に、接続先の環境について前提条件を話しておきます.
今回接続するKibanaはAngularJSを使っており、サーバーサイドレンダリングではなくクライアントサイド（Javascript）でレンダリングしています.
そのため、Chromeで表示した後すぐにスクリーンショットを撮っても、ほぼ初期表示のページしか撮れません.
ダッシュボードがレンダリングされた後に生成される特定の要素が見るかるまで待つ処理を入れています.

スクリーンショットを撮るためのコードは、以下のようになっています.

```ruby
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'

  gem 'selenium-webdriver'
end

require 'selenium-webdriver'

caps = Selenium::WebDriver::Remote::Capabilities.chrome(
  'chromeOptions': {
    'binary': '/usr/bin/chromium-browser',
    'args': [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      '--disable-extensions',
      '--disable-desktop-notifications',
      '--window-size=2560x1600'
    ]
  }
)
driver = Selenium::WebDriver.for :chrome, desired_capabilities: caps
# NOTE: Chromeが立ち上がるまで待つ
# TODO: 他にいいやり方を見つける
sleep 5

# NOTE: URLにアクセスする
driver.navigate.to ENV['DASHBOARD_URL']

wait = Selenium::WebDriver::Wait.new(timeout: 10)
begin
  # NOTE: タグクラウド機能が含まれるダッシュボードなので要素が追加されるまで待つ
  wait.until{ html = driver.find_element(class: 'tagcloud-notifications'); html.text }

  # NOTE: レンダリングが進むか待ってみる
  sleep 5

  # NOTE: ダッシュボード全体を出力するためリサイズする
  driver.manage.window.resize_to(
    driver.execute_script('return document.getElementsByClassName("app-wrapper")[0].scrollWidth'),
    driver.execute_script('return document.getElementsByClassName("app-wrapper")[0].scrollHeight')
  )

  driver.save_screenshot('screenshot.png')
rescue RuntimeError => e
  puts e.message
ensure
  driver.quit
end
```

これで動きそうなものなんですが、`wait.until{ html = driver.find_element(class: 'tagcloud-notifications'); html.text }`のところで、以下のようなタイムアウトエラーが発生してしまいます.

```
Traceback (most recent call last):
        1: from scripts/screenshot.rb:36:in `<main>'
/usr/lib/ruby/gems/2.5.0/gems/selenium-webdriver-3.141.0/lib/selenium/webdriver/common/wait.rb:71:in `until': timed out after 10 seconds (no such element: Unable to locate element: {"method":"class name","selector":"tagcloud-notifications"} (Selenium::WebDriver::Error::TimeOutError)
  (Session info: headless chrome=68.0.3440.106)
  (Driver info: chromedriver=2.38 (05121428cd0fc129e40a3694cf5405698236ad14),platform=Linux 4.9.93-linuxkit-aufs x86_64))
```

この場合、レンダリングが進んでいないか、何らかの理由がページが取得できていないという事が考えられます.
タイムアウト後にページをスクリーンショットを撮ってみると、真っ白なページが表示されているため、何らかの理由がスクリーンショットが撮れないのではないのかという説が濃厚になってきました.

## CLIで撮ってみる
とりあえず問題の切り分けをã<M-C-A>るために、そもそもCLIで実行した場合にスクリーンショットが撮れるかどうかを試してみます.

```sh
chromium-browser --headless --disable-gpu --screenshot --window-size=2560,1600 ${DASHBOARD_URL}
```

これを実行してみると、以下のようなメッセージとエラーメッセージが表示されます.

```
[1104/172034.716398:WARNING:dns_config_service_posix.cc(333)] Failed to read DnsConfig.
[1104/172034.721119:ERROR:gpu_process_transport_factory.cc(1016)] Lost UI shared context.
[1104/172034.762772:ERROR:gl_implementation.cc(292)] Failed to load /usr/lib/chromium/swiftshader/libGLESv2.so: Error loading shared library /usr/lib/chromium/swiftshader/libGLESv2.so: No such file or directory
[1104/172034.768792:ERROR:viz_main_impl.cc(201)] Exiting GPU process due to errors during initialization
[1104/172034.818760:ERROR:cert_verify_proc_nss.cc(981)] CERT_PKIXVerifyCert for xxx.yyy.zzz.xxx failed err=-8172
[1104/172035.252916:INFO:headless_shell.cc(590)] Written to file screenshot.png.
```

どうやらスクリーンショットは保存に成功しているようですが、こちらも真っ白なページになっています.
GPU関連のエラーが発生していますが、これを無視して他のエラーメッセージに注目してみると1つだけになります.

`[1104/172034.818760:ERROR:cert_verify_proc_nss.cc(981)] CERT_PKIXVerifyCert for xxx.yyy.zzz.xxx failed err=-8172`

と書いてあり、証明書関係でエラーが出ていると仮説を立てられます.
その仮説に基づいて、Seleniumで自己署名証明書関連のオプションが無いかを確認してみます.

## ついにスクリーンショットが撮れた
というわけで、Seleniumの使い方を再度確認してみます.
seleniumのWikiに[Ruby Bindings](https://github.com/SeleniumHQ/selenium/wiki/Ruby-Bindings)というページがあるので、そこで確認してみます.

> geckodriver will not implicitly trust untrusted or self-signed TLS certificates on navigation. To override this you can do:

と書いてある箇所があり、そこを見てみるとCapabilitiesに`accept_insecure_certs`を指定しています.

```ruby
capabilities = Selenium::WebDriver::Remote::Capabilities.firefox(accept_insecure_certs: true)
driver = Selenium::WebDriver.for :firefox, desired_capabilities: capabilities
```

「まさかなぁ...」と思いつつ、以下のようなCapabilitiesに追加してみると**撮れました!!!**

```ruby
caps = Selenium::WebDriver::Remote::Capabilities.chrome(
  accept_insecure_certs: true, # NOTE: ここ追加
  'chromeOptions': {
    'binary': '/usr/bin/chromium-browser',
    'args': [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--hide-scrollbars',
      '--disable-extensions',
      '--disable-desktop-notifications',
      '--window-size=2560x1600'
    ]
  }
)
```

{{< figure src="/img/2018/11/can-not-take-screenshot-when-try-to-take-screenshot-with-headless-chrome-for-self-signed-certificated-site/dashboard.png" >}}

まだ文字化けしている箇所や微妙に収まってない箇所があるため、そこは今後の課題としますが今回はこれで良しとします.

## 最後に
証明書を無視して接続するのは本当は良くないのでやらないでほしいですが、もし必要になった場合は参考にしてほしいです.
ググる力が足りなさ過ぎたのは反省です.

T-Potの構築に関しては、メモ代わりに記事として書く予定です.
