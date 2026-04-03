import { BrowserWindow, globalShortcut, session } from "electron";
import path from "path";

export let mainWindow: BrowserWindow;

export function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenu(null);
  mainWindow.setBackgroundColor("rgba(0,0,0,1)");
  mainWindow.setAspectRatio(16 / 9);
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    onDevServer();
  } else {
    onProd();
  }
}
function onDevServer() {
  mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  mainWindow.resizable = true;
  mainWindow.maximize();
  globalShortcut.register("CommandOrControl+R", () => {
    mainWindow.reload();
  });
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    mainWindow.webContents.toggleDevTools();
  });
  mainWindow.webContents.openDevTools({
    mode: "detach",
    activate: false,
    title: "Misa Devtools",
  });
}
function onProd() {
  mainWindow.loadFile(
    path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
  );
  mainWindow.setFullScreen(true);
}
