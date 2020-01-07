+++
title = "Googleカレンダーを同期するGASを書いた"
date = "2018-11-29T00:00:00+09:00"
draft = "false"
author = "K@zuki."
cover = "img/2018/11/sync-google-calendars/cover.jpg"
description = "最近は、イベントに参加することも多く、複数のGoogleアカウント感でスケジュールを手動コピーすることが多くなってきました.さすがに手動コピーは面倒なので、複数のGoogleカレンダーから1つのカレンダーへ同期するようなスクリプトを書きました."
tags = ["Google Apps Script"]
+++

最近は、イベントに参加することも多く、複数のGoogleアカウント感でスケジュールを手動コピーすることが多くなってきました.
さすがに手動コピーは面倒なので、複数のGoogleカレンダーから1つのカレンダーへ同期するようなスクリプトを書きました.

## 前提
* Google Apps ScriptやFusion Tablesについて説明はしない
* Google Apps ScirptsからFusion Tables APIが使えるようになっていること

## Googleカレンダーを同期する
今回作るスクリプトは、以下を満たすことを目的とします.

* 複数のカレンダーから、特定のカレンダーへ予定が登録される
* 登録先のカレンダーへは直接予定が登録されることもあるため、予定を削除することはしない
* 定期実行した際に予定が重複登録されないこと
* 登録元の予定が変更・削除された場合は考慮しなくてよい

1つ目と2つ目は特に難しい話ではないですが、3つ目の**「定期実行した際に予定が重複登録されないこと」**は、どこかに同期した情報を保存しておく必要があります.
そこで今回はSQLでデータを操作可能な`Fusion Tables`を使い、同期した情報を保存することにしました.

```js
var config = {
  // 統合先カレンダーID
  destCalId: "XXX",
  // 統合元カレンダーID
  srcCalIds: [
    "YYY"
  ],
  // 同期対象日数
  syncDays: 365,
  // Fusion TableのID
  tableId: 'ZZZ',
};

function main() {
  var startDate = new Date();
  var endDate = new Date((new Date()).setDate(startDate.getDate() + config.syncDays));

  var destCal = getCalendarById(config.destCalId);
  for (var i = 0; i < config.srcCalIds.length; i++) {
    var srcCal = getCalendarById(config.srcCalIds[i]);
    copyEvents(destCal, srcCal, startDate, endDate);
  }
}

function getCalendarById(id) {
  return CalendarApp.getCalendarById(id);
}

function getEvents(cal, startDate, endDate) {
  return cal.getEvents(startDate, endDate);
}

function copyEvents(destCal, srcCal, startDate, endDate) {
  var events = getEvents(srcCal, startDate, endDate);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var table = new SyncTable(config.tableId);

    if (table.notExists(event)) {
      var destEvent = createEvent(destCal, event);
      table.save(event, destEvent);
    } else {
      Logger.log("Already synced event: " + event.getId());
    }
  }
}

function createEvent(destCal, event) {
  if (event.isAllDayEvent()) {
    return destCal.createAllDayEvent(
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime(),
      {
        description: event.getDescription(),
        location: event.getLocation()
      }
    );
  } else {
    return destCal.createEvent(
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime(),
      {
        description: event.getDescription(),
        location: event.getLocation()
      }
    );
  }
}

// 同期確認用テーブルへのI/F
function SyncTable(id) {
  this.id = id;

  // 同期前か確認
  this.notExists = function(event) {
    var query = "SELECT * FROM " + this.id + " WHERE 'SrcEvtId' = '" + event.getId() + "'";
    var result = FusionTables.Query.sql(query);
    return result.rows === undefined || result.rows.length === 0;
  };

  // 同期履歴を保存
  this.save = function(srcEvent, destEvent) {
    var query = "INSERT INTO " + this.id + " (SrcEvtId, DestEvtId) VALUES ('" + srcEvent.getId() + "', '" + destEvent.getId() + "');"
    var result = FusionTables.Query.sql(query);
  };
}
```

処理の大筋の流れとしては、

1. 登録元のカレンダーから予定を取得する
2. 予定がすでに登録済みか確認する
3. 登録されている場合は次の予定へ、登録されていない場合はイベントを登録する
4. イベントを登録する

になります.
ちょっと気まぐれで書きすぎて、Fusion Tablesへの操作の処理が適当になってしまいました.
自分しかいじらないし、動けばいいんですよ. 動けば.

### config
スクリプトの設定をまとめたオブジェクトです.
適切な値で登録しておくことが重要です

```js
var config = {
  // 統合先カレンダーID
  destCalId: "XXX",
  // 統合元カレンダーID
  srcCalIds: [
    "YYY"
  ],
  // 同期対象日数
  syncDays: 365,
  // Fusion TableのID
  tableId: 'ZZZ',
};
```

### main関数
定期実行トリガーが呼び出すための関数です.
ここでは「同期期間の設定」「登録先カレンダーの取得」「登録元カレンダー分、予定のコピー関数の呼び出し」を役割にしています.

```js
function main() {
  var startDate = new Date();
  var endDate = new Date((new Date()).setDate(startDate.getDate() + config.syncDays));

  var destCal = getCalendarById(config.destCalId);
  for (var i = 0; i < config.srcCalIds.length; i++) {
    var srcCal = getCalendarById(config.srcCalIds[i]);
    copyEvents(destCal, srcCal, startDate, endDate);
  }
}
```

### getCalendarById関数
指定されたIDのカレンダーをオブジェクトを取得するだけの関数です.
正直関数化する必要もなかったかな.

```js
function getCalendarById(id) {
  return CalendarApp.getCalendarById(id);
}
```

### getEvents関数
引数に指定されたカレンダーから、指定期間の予定を取得する関数です.
こちらも関数化する必要は特になかったかな...

```js
function getEvents(cal, startDate, endDate) {
  return cal.getEvents(startDate, endDate);
}
```

### copyEvents関数
登録元のカレンダーの予定を、登録先のカレンダーへ登録する関数です.
Fusion Tablesに存在確認をし、存在しなければ登録するための関数を呼び出します.
登録完了後、Fusion Tablesに同期した情報を保存します.
少し役割をもたせすぎていて、見通しが悪くなっています.
とはいえ、登録用の関数でFusion Tablesへの操作を行わせるのは良くないので、ここに書いてしまいました.

```js
function copyEvents(destCal, srcCal, startDate, endDate) {
  var events = getEvents(srcCal, startDate, endDate);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var table = new SyncTable(config.tableId);

    if (table.notExists(event)) {
      var destEvent = createEvent(destCal, event);
      table.save(event, destEvent);
    } else {
      Logger.log("Already synced event: " + event.getId());
    }
  }
}
```

### createEvent関数
カレンダーへ予定を登録する関数です.
1日予定と時間指定の予定によっては、登録する関数を呼び分けています.
引数が一緒なので、うまいことまとめたいですね.

```js
function createEvent(destCal, event) {
  if (event.isAllDayEvent()) {
    return destCal.createAllDayEvent(
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime(),
      {
        description: event.getDescription(),
        location: event.getLocation()
      }
    );
  } else {
    return destCal.createEvent(
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime(),
      {
        description: event.getDescription(),
        location: event.getLocation()
      }
    );
  }
}
```

### SyncTableオブジェクト
何故かオブジェクト化してしまったFusion Tables関連の操作をまとめたオブジェクトです.
関数の定義の仕方はバッドプラクティスの塊なので、絶対に真似しないようにしましょう.
というか、なんでこんなオブジェクト書いたんだ...

```js
// 同期確認用テーブルへのI/F
function SyncTable(id) {
  this.id = id;

  // 同期前か確認
  this.notExists = function(event) {
    var query = "SELECT * FROM " + this.id + " WHERE 'SrcEvtId' = '" + event.getId() + "'";
    var result = FusionTables.Query.sql(query);
    return result.rows === undefined || result.rows.length === 0;
  };

  // 同期履歴を保存
  this.save = function(srcEvent, destEvent) {
    var query = "INSERT INTO " + this.id + " (SrcEvtId, DestEvtId) VALUES ('" + srcEvent.getId() + "', '" + destEvent.getId() + "');"
    var result = FusionTables.Query.sql(query);
  };
}
```

## 最後に
今回は、Googleカレンダーを同期するためにGoogle Apps Scriptでスクリプトを書きました.
変な実装になってしまったので反省です.
そのうち予定の変更・削除に対応させようかなと思います.
