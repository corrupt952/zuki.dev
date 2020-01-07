+++
title = "Terraformの反映をCircleCIで自動化"
date = "2017-12-05T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2017/12/automating-terraform-apply-with-circleci/cover.jpg"
description = "今の仕事では、アプリのテストもデプロイも、全てCircleCIで自動化しています。その自動化の流れにのって、Terraformでの構成管理もCircleCIで自動化ています。**.circleci/config.yml**の内容を備忘録。"
tags = ["Terraform", "CircleCI", "CI"]
+++

今の仕事では、アプリのテストもデプロイも、全てCircleCIで自動化しています。
その自動化の流れにのって、Terraformでの構成管理もCircleCIで自動化ています。
**.circleci/config.yml**の内容を備忘録。

```yml
version: 2
jobs:
  test:
    docker:
      - image: hashicorp/terraform:0.10.7
    steps:
      - checkout
      - run: terraform init
      - run: terraform state pull
      - run: terraform validate
      - run: terraform plan
  deploy:
    docker:
      - image: hashicorp/terraform:0.10.7
    steps:
      - checkout
      - run: terraform init
      - run: terraform state pull
      - run: terraform apply
workflows:
  version: 2
  test_accept_deploy:
    jobs:
      - test
      - deploy:
          filters:
            branches:
              only: master
          requires:
            - test
```

余り複雑な記述にはならないので、他のTerraformリポジトリにも移行しやすそうです。
Bitbucketを使ってるå ´合は、Bitbucket Pipelinesで十分な気がしますよ。
