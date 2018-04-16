var http = require('http');
var express = require("express");
var RED = require("node-red");

// Expressアプリケーションの生成
var app = express();
var port = process.env.PORT || 1882;

// 静的コンテンツのルートを追加
app.use("/",express.static("public"));

// サーバの生成
var server = http.createServer(app);

// 設定オブジェクトの生成 - 他のオプションについてはデフォルトの 'settings.js' ファイルを参照してください
var settings = {
  uiPort: port,
  httpAdminRoot:"/",
  httpNodeRoot: "/api",
  userDir:"./node-red_userdir",
  functionGlobalContext: { }    // グローバルコンテキストを有効化
};

// サーバと設定とランタイムの初期化
RED.init(server,settings);

// エディタUIのルートを '/red' に指定
app.use(settings.httpAdminRoot,RED.httpAdmin);

// HTTP node UIのルートを '/api' に指定
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(port);

// ランタイム起動
RED.start();
