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
  httpAdminRoot: process.env.NODERED_ADMIN_ROOT || "/red",
  httpNodeRoot: "/api",
  userDir:`${__dirname}/node-red_userdir`,
  flowFile: "flows.json",
  adminAuth: {
    type: "credentials",
    users: [{
      username: process.env.NODERED_USER || "admin",
      password: process.env.NODERED_PASSWORD || "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
      permissions: process.env.NODERED_PERMISSIONS || "*"
    }]
  },
  functionGlobalContext: {

  },    // グローバルコンテキストを有効化
  // httpNodeCors: {
  //   origin: "*",
  //   methods: "GET,PUT,POST,DELETE"
  // },
  logging: {
    console: {
      level: process.env.NODERED_LOG_LEVEL || "trace",
      metrics: false,
      audit: false
    }
  },
  debugMaxLength: 1000,
  debugUseColors: true,
  ui: { path: 'ui' },
  credentialSecret: "a-secret-key"
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
