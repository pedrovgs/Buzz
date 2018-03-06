const Application = require("spectron").Application;
const path = require("path");

const electronPath =
  process.platform === "win32"
    ? path.join("node_modules", ".bin", "electron.cmd")
    : path.join("node_modules", ".bin", "electron");
const appPath = path.join("public", "index.html");

const app = new Application({
  path: electronPath,
  args: [appPath]
});

export default app;
