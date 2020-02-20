+++
title = "tmuxのステータスラインにk8sのvwntextとnamespaceを表示する"
date = "2020-02-05T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = ""
tags = ["Kubernetes", "tmux"]
+++

複数のk8sクラスタに接続する頻度が増えてきたので、現在どのコンテキストへ接続しているのかが分かりやすくtmuxのステータスラインに表示するようにしました.  

{{< figure src="/img/2020/02/kctx-kns-in-tmux-status/1.png" >}}

この画像で言えば`(kind-ira/owncloud)`が、それぞれ現在選択するContextとNamespaceです.  
実際の設定は、

```bash
set-option -g status-right "#[fg=colour33]#(/bin/bash ${HOME}/bin/tmux-kubectl) #[fg=green][#S:#I.#P]"
```

と定義し、スクリプトの実行結果をステータスラインに表示しています.  
細かいケースを考慮できていないかもしれませんが、スクリプトは以下のように定義しています.

```shell
#!/usr/bin/env bash

if [[ -z "$(which kubectl 2>/dev/null)" ]]; then
    echo "kubectl doesn't exist"
    exit 1
fi

kubeconfig="$HOME/.kube/config"
if [[ -n "${KUBECONFIG}" ]]; then
    kubeconfig=${KUBECONFIG}
fi

context="$(kubectl config current-context 2>/dev/null)"
if [[ -z "${context}" ]]; then
    echo "current-context doesn't exist"
    exit 1
fi

namespace="$(kubectl config view -o "jsonpath={.contexts[?(@.name==\"${context}\")].context.namespace}" 2>/dev/null)"
[[ -z "${namespace}" ]] && namespace="default"

echo "(${context}/${namespace})"
```

今後、使っていく時に何か不都合があれば少しずつ改善していきますか.
