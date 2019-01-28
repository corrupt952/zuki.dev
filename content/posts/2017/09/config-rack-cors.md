+++
title = "Rack::CorsでCORSの設定"
date = "2017-09-25T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = "2017/09/config-rack-cors/cover.jpg"
description = "SinatraやRailsでCORSの設定をする時に、よくRack::Corsを利用します。riginsメソッドの引数は、可変長引数となっているため、**example.com**を追加します。"
tags = ["Ruby", "Rack", "Ruby on Rails"]
+++

SinatraやRailsでCORSの設定をする時に、よくRack::Corsを利用します。
riginsメソッドの引数は、可変長引数となっているため、**example.com**を追加します。

```ruby
use Rack::Cors do
  allow do
    origins 'www.khasegawa.net', 'example.com'
    resource '*', methods: %i[get]
  end
end
```

これでリクエストが通るようになりました。
簡単ですね。

この時の*Access-Control-Allow--Origin*は、「www.khasegawa.net」からリクエストした場合、**https://www.khasegawa.net**になり、「example.com」からのリクエストの場合は、**https://example.com**という期待する値になっていることも確認出来ます。

複数指定した場合は、マッチしたホストが設定されています。（正確にはschemeやポートを含めてものだが）

### www.khasegawa.netとsub.khasegawa.netを許可する
Rack::Corsでは、引数に正規表現を指定することも出来るので、それを利用します。

```ruby
use Rack::Cors do
  allow do
    origins /\Ahttps:\/\/(www|sub)\.khasegawa\.net\z/
    resource '*', methods: %i[get]
  end
end
```

正規表現で指定する場合の注意点としては、セキュリティを考慮し、schemeを含めた**完全一致**にすることをオススメします。

この時の*Access-Control-Allow--Origin*は、「www.khasegawa.net」からリクエストした場合、**https://www.khasegawa.net**になり、「sub.khasegawa.com」からのリクエストの場合は、**https://sub.khasegawa.com**という期待する値になっていることも確認出来ますね。

正規表現を指定した場合は、マッチしたホストを返却するようになっています。

## 挙動から分かる注意点
これらから分かることはなんでしょうか。
どれだけ指定しても、*Access-Control-Allow-Origin*に設定される値は、1つなのです。（許可されていない場合は何も設定されない）
ということは、どこかでレスポンスをキャッシュすると不都合が出そうです。

これは、READMEの[Common Gotchas](https://github.com/cyu/rack-cors#user-content-common-gotchas)に書いてあることからも分かります。
Common GotchasのCachingでは、Rack::Cacheの話しか出ていませんが、要はキャッシュさせないでっていうことですね。

こういうのは、見落としがちだったりするので要注意ですね。
