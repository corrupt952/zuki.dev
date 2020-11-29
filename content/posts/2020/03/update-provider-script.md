+++
title = "指定したプロパイダのバージョンを一括変更するためのスクリプト"
date = "2020-03-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "既視感がありますが、指定したproviderのバージョンを一括変更するためのスクリプトを業務終了間際に少し書いてみました."
tags = ["Terraform", "Shell"]
+++

既視感がありますが、指定したproviderのバージョンを一括変更するためのスクリプトを業務終了間際に少し書いてみました.

今までそれなりの数のTerraformを触ってきましたが、  
バージョンアップデートをする時に1ファイルずつを置換するのが正直なところかなり面倒臭いです.

全てのプロパイダのバージョンが統一されていればよいのですが、  
単純なバージョン文字列の置換だけだは対応できないケースも存在しているため、  
そういったケースでもバージョンを置換できるようなスクリプトを書きました.

```bash
#!/usr/bin/env bash

set -o pipefail
set -o errexit

if [ "$#" -lt 2 ]; then
    echo "置き換え対象のプロパイダと新しいバージョンを指定してください"
    exit 1
fi

provider="$1"
version="$2"

for fpath in $(find . -name "provider.tf");
do
    current_version="$(python3 -c "import hcl; obj = hcl.load(open('$fpath', 'r'), ); print(obj['provider']['$provider']['version'])" 2>/dev/null)"
    if [ "$(uname -s)" == "Darwin" ]; then
        sed -i '' -e "s/${current_version}/= ${version}/g" $fpath
    else
        sed -i -e "s/${current_version}/= ${version}/g" $fpath
    fi
done
```

`./update_providers.sh aws 2.54.0`を実行したと過程して、大まかな処理の流れとしては、

1. provider.tfをカレントディレクトリ配下から再帰的に探索
2. pyhclでprovider.tfにある指定したプロパイダのバージョンを抜き出す
3. sedで引数に指定されたバージョンに置き換える

となります.  
HCLの自前パースは時間的に面倒だったので、pyhclを使って指定したプロパイダのバージョンを抜き出しています.  
単一のprovider.tfに同一プロパイダが複数存在するケースは考慮してないですけどね.  

これとは別に利用するバージョンを統一するようなルールを機械的にさせる予定です.
