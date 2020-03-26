+++
title = "Terraformの指定したproviderのバージョンを一括変更するためのスクリプトを書いた"
date = "2020-03-26T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "どこかで見たことあるような気がしたが、指定したproviderのバージョンを一括変更するためのスクリプトを業務終了間際に少し書いてみた."
tags = ["Terraform", "Shell"]
+++

どこかで見たことあるような気がしたが、指定したproviderのバージョンを一括変更するためのスクリプトを業務終了間際に少し書いてみた.

それなりに数のTerraformを触っているのだが、プロパイダのバージョンアップデートをする時に置き換えが結構だるい.
全てのバージョンが統一されていればいいのだが、そうじゃないケースもあるため単純な置き換えでは対応できないため、それを解決するために一括で変更するスクリプトを書いた

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

`./update_providers.sh aws 2.54.0`を実行したと過程して、大まかな流れとしては、

1. provider.tfをカレントディレクトリ配下から再帰的に探索
2. pyhclでprovider.tfにある指定したプロパイダのバージョンを抜き出す
3. sedで引数に指定されたバージョンに置き換える

となる.
HCLのパースが面倒だったので、pyhclを使って指定したプロパイダのバージョンを抜き出している.
単一のprovider.tfに複数の同一プロパイダが存在するケースは考慮してないけど、これが異なることはないと願いたい.

これとは別に利用するバージョンを統一するようなルールを機械的にさせる予定.
