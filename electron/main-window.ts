import { BrowserWindow, shell, ipcMain } from "electron";
import { getPlatform } from "./utils/get-device-specs";
import { join } from "path";
import COMMAND from "../common/commands";
import { fetchLocalStorage } from "./utils/config-variables";
import electronIsDev from "electron-is-dev";
import { format } from "url";
import { net } from 'electron';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'


let mainWindow: BrowserWindow | undefined;

// 自動処理用サーバ立ち上げ
const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

serve({
  fetch: app.fetch,
  port: 9999,
})

const createMainWindow = () => {
  console.log("📂 DIRNAME", __dirname);
  mainWindow = new BrowserWindow({
    icon: join(__dirname, "build", "icon.png"),
    width: 1300,
    height: 940,
    minHeight: 500,
    minWidth: 500,
    show: false,
    backgroundColor: "#171717",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      preload: join(__dirname, "preload.js"),
    },
    titleBarStyle: getPlatform() === "mac" ? "hiddenInset" : "default",
  });

  const url = electronIsDev
    ? "http://localhost:8000"
    : format({
        pathname: join(__dirname, "../../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.once("ready-to-show", () => {
    if (!mainWindow) return;
    mainWindow.show();
  });

  fetchLocalStorage();

  mainWindow.webContents.send(COMMAND.OS, getPlatform());

  // ipcMain.on("hoge", () => {
  //   console.log("🚀 hoge");
  // });

  // ipcMain.on("generate_complete", () => {
  //   console.log("COMLETE!!!!!!!");
  // });

  // setTimeout(() => {
  //   if (!mainWindow) return;
  //   mainWindow.webContents.send("hoge2", "hoge2");
  // }, 2000);

  // app.post('/upscale', (c:any) => {
  //   if (!mainWindow) return;

  //   // cに画像のinport / exportのパスが入ってる
  //   // ・inport / exportのパス
  //   // ・モデルの名前
  //   // ・アップスケールの倍率
  //   // ・画質
  //     // パラメータが足りなければエラー返す
  //   // それを使って画像のアップスケール処理を行う
  //   // アップスケールが終わった後にイベントがもらえると思う
  //     // なんらかの原因でアップスケールが失敗したときはエラーを返す
  //   // そのイベントをもってexportのパスを返す

  //   mainWindow.webContents.send("post", "c.data");

  //   // generate_completeが走ってからreturnを返すみたいなやつを考える（promise使ったり、汚い方法だとsetIntervalでフラグ取得ぶんまわす）
  //   return c.json({ exportPath: 'export path', status: 'ok'});
  // })

  app.post('/upscale', async (c) => {

    if (!mainWindow) {
      return c.json({ error: 'Main window is not available', status: 'error' });
    }

    const data = await c.req.json(); // JSONデータを解析
    // console.log("📝 POSTDATA", data);
  
    try {
      // Promiseをawaitで待機
      await new Promise((resolve, reject) => {
        // タイムアウトを設定
        const timeout = setTimeout(() => {
          reject(new Error("Timeout waiting for generate_complete"));
        }, 60000); // 60秒後にタイムアウト
  
        ipcMain.once("generate_complete", () => {
          clearTimeout(timeout); // タイムアウトをクリア
          console.log("🙌 YAY!! GENERATE COMPLETED!!");
          resolve(undefined);
        });
  
        // ここでアップスケール処理を開始
        mainWindow?.webContents.send("post", data);
      });
  
      // 正常終了した場合のレスポンス
      return c.json({ exportPath: `🙌 YAY!! //export path//`, status: 'ok' });

    } catch (error) {
      // エラーハンドリング
      return c.json({ error: `🥲 EXPORT ERROR`, status: 'error' });
    }
  });
  
  mainWindow.webContents.openDevTools();

  mainWindow.setMenuBarVisibility(false);

  
};

const getMainWindow = () => {
  return mainWindow;
};

export { createMainWindow, getMainWindow };
