+++
title = "MkDocsで資料を書く頻度が増えそうなのでテンプレートを作った"
date = "2020-03-03T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "MkDocsを使ってプライベートでも仕事でもドキュメントをまとめることが増えてきました.  リアルタイム編集には向きませんが、やはり設計ドキュメントやオンボーディング資料には向いてる気がします. "
tags = ["MkDocs"]
+++

MkDocsを使ってプライベートでも仕事でもドキュメントをまとめることが増えてきました.  
リアルタイム編集には向きませんが、やはり設計ドキュメントやオンボーディング資料には向いてる気がします.  

そこで自分向けにMkDocsをリポジトリに導入するためのテンプレートを作って、リポジトリにコミットしておきました.  

## テンプレート
[mkdocs-prj-templates](https://github.com/corrupt952/mkdocs-prj-templates)というリポジトリですが、このリポジトリにユースケースに応じてテンプレートをディレクトリで分けて管理しています.    
現時点では、2種類のテンプレートを作成しています.

### simple
[simple](https://github.com/corrupt952/mkdocs-prj-templates/tree/master/simple)は、ドキュメントだけ配置するリポジトリ向けのテンプレートです.  

```bash
simple
├── Dockerfile
├── docker-compose.yaml
├── docs
│   └── index.md
└── mkdocs.yml
```

ドキュメントだけでなくても、docker-compose.yamlやDockerfileをリポジトリルートに設置しても気にならないなら、このテンプレートでも良さそうです.  

### in-docs
[in-docs](https://github.com/corrupt952/mkdocs-prj-templates/tree/master/in-docs)は、既にdocker-compose.yamlやDockerfileがリポジトリにあり、リポジトリルートを散らかしたくない時のテンプレートです.  

```bash
in-docs
├── bin
│   └── docs-compose
├── docs
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── index.md
└── mkdocs.yml
```

構造を見ると分かるように、Dockerfileとdocker-compose.yamlが`docs`ディレクトリに存在しています.  
この状態だとリポジトリルートで`docker-compose up`をすることができないため、ラッパースクリプトとして`bin/docs-compose`を用意しています.  
ドキュメント関連の操作は`docs-compose`を使えば良いため、各々が独自のコマンドを実行しなくて良いですし、コマンド履歴も比較的キレイになります.

`mkdocs.yml`もdocsに入れられる気がしなくもないんですが、今回は諦めました.
