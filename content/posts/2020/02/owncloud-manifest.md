+++
title = "自宅鯖で動かしているownCloudをk8s環境で動かすためにマニフェストを書く"
date = "2020-02-15T00:00:00+09:00"
draft = "false"
author = "K@zuki."
description = "週末に自宅で動かしているownCloudを、Kubernetesに乗せるためにマニフェストを定義していた. 私用用途なのでPV使うまでもないかなとhostPathを使ったり、ラベルの指定もまばらで規則性がないので気が向いた時に直しておきたい."
tags = ["Kubernetes", "ownCloud"]
+++

週末に自宅で動かしているownCloudを、Kubernetesに乗せるためにマニフェストを定義していた.  
私用用途なのでPV使うまでもないかなとhostPathを使ったり、ラベルの指定もまばらで規則性がないので気が向いた時に直しておきたい.

## マニフェスト
[ira-apps/owncloud](https://github.com/corrupt952/ira-apps/tree/master/owncloud/base)で定義しているマニフェストを`kustomize build`の出力結果は以下のような形です.

### Ingress
ファイルアップロードがされるWebアプリなので、とりあえずclient_max_body_sizeを20GBに指定しています.

```yaml
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: 20G
  labels:
    app.kubernetes.io/component: owncloud-server
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-server
    app.kubernetes.io/part-of: owncloud
  name: owncloud-server
  namespace: owncloud
spec:
  rules:
  - host: owncloud.local
    http:
      paths:
      - backend:
          serviceName: owncloud-server
          servicePort: http
```

### Service
WebアプリとDBのDeploymentを分けている都合上、Serviceもそれぞれ定義しています.

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: server
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-server
    app.kubernetes.io/part-of: owncloud
  name: owncloud-server
  namespace: owncloud
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: http
  selector:
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-server
    app.kubernetes.io/part-of: owncloud
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: db
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-db
    app.kubernetes.io/part-of: owncloud
  name: owncloud-db
  namespace: owncloud
spec:
  ports:
  - name: mysql
    port: 3306
    protocol: TCP
    targetPort: mysql
  selector:
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-db
    app.kubernetes.io/part-of: owncloud
  type: ClusterIP
```

### Secret
今回は載せませんが、SealedSecretを使って定義してます.  
導入は多少面倒かもしれませんが、クラウドプロパイダを利用しない場合は手軽です.

### Deployment
[helm/charts](https://github.com/helm/charts/tree/master/stable/owncloud/templates)にあったownCloudのマニフェストを参考にしています.  
PVCを利用してソフトウェアRAIDを組んでいるディスクに書き込みたかったんですが、サクッとKubernetsに移行しておきたかったので、hostPathで動かしています.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/component: server
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-server
    app.kubernetes.io/part-of: owncloud
  name: server
  namespace: owncloud
spec:
  selector:
    matchLabels:
      app.kubernetes.io/instance: owncloud
      app.kubernetes.io/managed-by: argocd
      app.kubernetes.io/name: owncloud-server
      app.kubernetes.io/part-of: owncloud
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: owncloud
        app.kubernetes.io/managed-by: argocd
        app.kubernetes.io/name: owncloud-server
        app.kubernetes.io/part-of: owncloud
    spec:
      containers:
      - env:
        - name: OWNCLOUD_DOMAIN
          value: localhost
        - name: OWNCLOUD_DB_TYPE
          value: mysql
        - name: OWNCLOUD_MYSQL_UTF8MB4
          value: "true"
        - name: OWNCLOUD_DB_HOST
          value: owncloud-db
        - name: OWNCLOUD_DB_NAME
          value: owncloud
        - name: OWNCLOUD_DB_USERNAME
          value: owncloud
        - name: OWNCLOUD_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              key: MYSQL_PASSWORD
              name: owncloud-db
        image: owncloud/server:10.3.2
        imagePullPolicy: Always
        livenessProbe:
          exec:
            command:
            - /usr/bin/healthcheck
          initialDelaySeconds: 5
          periodSeconds: 30
          timeoutSeconds: 10
        name: owncloud-server
        ports:
        - containerPort: 8080
          name: http
        readinessProbe:
          exec:
            command:
            - /usr/bin/healthcheck
          initialDelaySeconds: 120
          periodSeconds: 30
          timeoutSeconds: 10
        volumeMounts:
        - mountPath: /mnt/data
          name: owncloud-server
      volumes:
      - hostPath:
          path: /geminos/kubernetes/owncloud/server
        name: owncloud-server

---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/component: db
    app.kubernetes.io/instance: owncloud
    app.kubernetes.io/managed-by: argocd
    app.kubernetes.io/name: owncloud-db
    app.kubernetes.io/part-of: owncloud
  name: db
  namespace: owncloud
spec:
  selector:
    matchLabels:
      app.kubernetes.io/instance: owncloud
      app.kubernetes.io/managed-by: argocd
      app.kubernetes.io/name: owncloud-db
      app.kubernetes.io/part-of: owncloud
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: owncloud
        app.kubernetes.io/managed-by: argocd
        app.kubernetes.io/name: owncloud-db
        app.kubernetes.io/part-of: owncloud
    spec:
      containers:
      - args:
        - --default-authentication-plugin=mysql_native_password
        env:
        - name: MYSQL_DATABASE
          value: owncloud
        - name: MYSQL_USER
          value: owncloud
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              key: MYSQL_PASSWORD
              name: owncloud-db
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              key: MYSQL_ROOT_PASSWORD
              name: owncloud-db
        image: mysql:8
        livenessProbe:
          exec:
            command:
            - /usr/bin/mysqladmin
            - -u root
            - --password="${MYSQL_ROOT_PASSWORD}"
            - ping
          initialDelaySeconds: 5
          periodSeconds: 30
          timeoutSeconds: 10
        name: owncloud-db
        ports:
        - containerPort: 3306
          name: mysql
        readinessProbe:
          exec:
            command:
            - /usr/bin/mysqladmin
            - -u root
            - --password="${MYSQL_ROOT_PASSWORD}"
            - ping
          initialDelaySeconds: 5
          periodSeconds: 30
          timeoutSeconds: 10
        volumeMounts:
        - mountPath: /var/lib/mysql
          name: owncloud-db
        - mountPath: /var/lib/backup
          name: owncloud-db-backup
      volumes:
      - hostPath:
          path: /geminos/kubernetes/owncloud/db
        name: owncloud-db
      - hostPath:
          path: /geminos/kubernetes/owncloud/db-backup
        name: owncloud-db-backup
```
