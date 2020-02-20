+++
title = "conftestを使ってDeploymentにrequests,limitsが指定されているかをチェックする"
date = "2020-02-21T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "最近は、プライベートでも仕事でもKubernetesのマニフェストを書いていることが多くなってきました. "
tags = ["Kubernetes"]
+++

最近は、プライベートでも仕事でもKubernetesのマニフェストを書いていることが多くなってきました.  
今回は「Deploymentのコンテナにrequests,limitsが指定されていること」を[conftest](https://github.com/instrumenta/conftest)というツールを使ってチェックする際のポリシーをメモしておきます.

```go
# requestsが指定されていること
deny[msg] {
	input.kind = "Deployment"
	c := input.spec.template.spec.containers[_]
	not c.resources.requests

	msg = sprintf("%sコンテナにrequestsを指定してください", [c.name])
}

# limitsが指定されていること
deny[msg] {
	input.kind = "Deployment"
	c := input.spec.template.spec.containers[_]
	not c.resources.limits

	msg = sprintf("%sコンテナにlimitsを指定してください", [c.name])
}
```

OPAの[Iteration](https://www.openpolicyagent.org/docs/latest/policy-cheatsheet/#iteration)を参考に書いています.  
OPAのIterationのArrayのサンプルでは、

```go
# iterate over indices i
arr[i]

# iterate over values
val := arr[_]

# iterate over index/value pairs
val := arr[i]
```

と書かれており、今秋のようにDeployment内のコンテナにrequests,limitsが指定されていることを確認したければ、Iterationをポリシー内で使用してチェックすれば良いわけです.

## おまけ
ちょっとしたおまけですが、どのコンテナがポリシー違反なのかを分かりやすくするために`sprintf`を使ってコンテナ名を出力しています.  
こういった細かい事でも出力するのと、しないのとで実際に利用するときのデバッグのしやすさが変わりますからね.
