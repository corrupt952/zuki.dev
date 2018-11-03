+++
title = "Terraformで作成したEC2にPublic DNSがついた"
date = "2017-10-03T00:00:00+09:00"
draft = "false"
author = "K@zuki."
# TODO: cover = ""
description = "[前回の記事](/post/2017/09/public-dns-does-not-atatch-to-ec2-created/)で、Public DNSがつかないっていう話をしていたのだが、そこに書いていた通りだった。"
tags = ["AWS", "Terraform"]
+++

[前回の記事](/post/2017/09/public-dns-does-not-atatch-to-ec2-created/)で、Public DNSがつかないっていう話をしていたのだが、そこに書いていた通りだった。

TerraformでのVPCは、DNS Supportはデフォルトでtrueなのだが、DNS Hostnamesはデフォルトでfalseだった。[参考](https://www.terraform.io/docs/providers/aws/r/vpc.html#enable_dns_hostnames)
Public DNSを割り当てるには、これらのオプションを共にtrueにする必要がある。

Public DNSを割り当てたEC2を含む最小限の定義は、こんな感じかな。

```
# VPC
resource "aws_vpc" "khasegawa" {
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"
  # ここが今回の話
  enable_dns_support = true
  enable_dns_hostnames = true
}

# Gateway
resource "aws_internet_gateway" "khasegawa" {
  vpc_id = "${aws_vpc.khasegawa.id}"
}

# Route table
resource "aws_route_table" "khasegawa" {
  vpc_id = "${aws_vpc.khasegawa.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.khasegawa.id}"
  }
}

# Subnet
resource "aws_subnet" "khasegawa" {
  vpc_id = "${aws_vpc.khasegawa.id}"
  cidr_block = "10.0.0.0/24"
  availability_zone = "ap-northeast-1a"
}

# Route table association
resource "aws_route_table_association" "khasegawa" {
  subnet_id = "${aws_subnet.khasegawa.id}"
  route_table_id = "${aws_route_table.khasegawa.id}"
}

# Security Group
resource "aws_security_group" "khasegawa" {
  name = "khasegawa"
  description = "khasegawa"
  vpc_id = "${aws_vpc.khasegawa.id}"

  # SSH
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [
      "${var.ip}/32"
    ]
  }
  # 外部への通信
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2
resource "aws_instance" "khasegawa" {
  ami = "${var.ami}"
  instance_type = "${var.instance_type}"
  disable_api_termination = false
  subnet_id = "${aws_subnet.khasegawa.id}"

  vpc_security_group_ids = [
    "${aws_security_group.khasegawa.id}"
  ]
}

# EIP
resource "aws_eip" "khasegawa" {
  vpc = true
}

# EIP association
resource "aws_eip_association" "khasegawa-eip-association" {
  instance_id = "${aws_instance.khasegawa.id}"
  allocation_id = "${aws_eip.khasegawa.id}"
}
```

何がともあれ、解決出来たので良かった。　
