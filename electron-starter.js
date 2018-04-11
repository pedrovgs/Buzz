const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

setUpElectron();

function setUpElectron() {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createMainWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createMainWindow();
    }
  });
}

function createMainWindow() {
  startMainWindow();
  releaseWindowOnClose();
  installDevelopmentChromeExtensions();
  openDevToolsIfNeeded();
}

function startMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    icon: path.join(__dirname + "/../assets/icons/png/logo.png"),
    show: !isRunningTests(),
    frame: false
  });
  // This hack keeps the main window hidden until is ready to be shown
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  // and load the index.html of the app.
  const appPath = path.join(__dirname, "build", "index.html");
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: appPath,
      protocol: "file:",
      slashes: true
    });
  // eslint-disable-next-line no-console
  console.log("Starting electron and loading url: " + startUrl);
  mainWindow.loadURL(startUrl);
  if (!isRunningTests()) {
    mainWindow.setFullScreen(true);
    mainWindow.setMenuBarVisibility(false);
  }
}

function releaseWindowOnClose() {
  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function installDevelopmentChromeExtensions() {
  if (isDev()) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(REDUX_DEVTOOLS);
  }
}

function openDevToolsIfNeeded() {
  if (isDev()) {
    mainWindow.webContents.openDevTools();
  }
}

function isDev() {
  return typeof process.env.ELECTRON_START_URL !== "undefined";
}

function isRunningTests() {
  const runningTestEnvVar = process.env.REACT_APP_RUNNING_TESTS;
  return runningTestEnvVar ? Boolean(runningTestEnvVar) === true : false;
}
