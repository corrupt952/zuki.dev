+++
title = "Lambdaの関数名とランタイムの一覧を取得する"
date = "2019-12-20T10:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = ""
description = ""
tags = ["AWS"]
+++

今朝、Lambdaの関数名とランタイムの一覧を取得するPythonスクリプト書いたので貼っておく.  
シェルの実装でも良かったが、これをベースに他のスクリプトを組む予定なのでboto3で実装した.

```python
#!/usr/bin/env python3

import json
import boto3

def aws_region_names():
    ec2 = boto3.client('ec2')
    regions = ec2.describe_regions()['Regions']
    return sorted([regions[_]['RegionName'] for _ in range(len(regions))])

def lambda_functions(region_name):
    client = boto3.client('lambda', region_name=region_name)
    functions = client.list_functions()['Functions']
    return [{ 'Name': functions[_]['FunctionName'], 'Runtime': functions[_]['Runtime']} for _ in range(len(functions))]

if __name__ == '__main__':
    region_functions = {}
    for region_name in aws_region_names():
        region_functions[region_name] = lambda_functions(region_name)
    print(json.dumps(region_functions))
```

処理の流れは書くまでもないが、

- リージョン一覧取得
- リージョンごとのLambda Function一覧取得

をしている.  
処理自体は簡単だが、関数名とランタイムを抽出しているリスト内包表記は大分見づらいので改善の余地はありそう.
