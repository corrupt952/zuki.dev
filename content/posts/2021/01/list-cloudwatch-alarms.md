+++
title = "CloudWatchアラーム一覧を表示する"
date = "2021-01-26T00:00:00+09:00"
draft = "false"
author = "2021/01/list-cloudwatch-alarms"
# cover = "/cover.jpg"
description = "どのリージョンにどんなCloudWatch Alarmがあるのかを知りたかったので、Bashスクリプトを書きました."
tags = ["AWS", "Shell"]
+++

どのリージョンにどんなCloudWatch Alarmがあるのかを知りたかったので、Bashスクリプトを書きました.  
利用するツールは、jqとAWS CLIv2の2つ.

```bash
#!/usr/bin/env bash

# 利用可能なリージョンを取得
get_regions() {
    aws ec2 describe-regions | jq -r '.Regions[].RegionName'
}

# 指定されたリージョンのアラームを取得し、「リージョン\tアラーム名」というTSV形式で出力
get_alarms() {
    local region="$1"
    aws --region $region cloudwatch describe-alarms | jq --arg REGION "$region" -r '.MetricAlarms[] | [$REGION, .AlarmName] | @tsv'
}

main() {
    for region in $(get_regions); do
        local alarms=$(get_alarms $region)
        if [ -n "$alarms" ]; then
            echo "$alarms"
        fi
    done
}
main $*
```
