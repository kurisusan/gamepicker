import { BrowserWindow } from "electrobun/bun";
import { runServer } from "./app";
import path from "path";
import os from "os";

function getUserDataPath() {
  // This logic is based on Electron's default behavior
  // https://www.electronjs.org/docs/latest/api/app#appgetpathname
  const appName = "GamePicker";
  switch (process.platform) {
    case "win32":
      return path.join(process.env.APPDATA || os.homedir(), appName);
    case "darwin":
      return path.join(os.homedir(), "Library", "Application Support", appName);
    case "linux":
      return path.join(os.homedir(), ".config", appName);
    default:
      // For other platforms, use a generic hidden directory in the home folder
      return path.join(os.homedir(), `.${appName}`);
  }
}

const gameCachePath = path.join(getUserDataPath(), "cache");

runServer({
  port: 3000,
  idleTimeout: 60,
  gameCache: gameCachePath,
});

const window = new BrowserWindow({
  title: "Game Picker",
  url: "views://gui/index.html",
});
