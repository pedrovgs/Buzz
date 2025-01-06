import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppTheme from "./theme/AppTheme";
import { Provider } from "react-redux";
import App from "./app/App";
import buzzStore from "./app/buzz";
import testUtils from "./testUtils/utils";
import WebFont from "webfontloader";

prepareAppForTestingIfNeeded();
loadFonts();
enableWakeLock();

ReactDOM.render(
  <Provider store={buzzStore}>
    <MuiThemeProvider muiTheme={AppTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

function prepareAppForTestingIfNeeded() {
  if (testUtils.isRunningTests()) {
    window.store = buzzStore;
  }
}

function loadFonts() {
  WebFont.load({
    google: {
      families: ["Roboto:400", "sans-serif"]
    }
  });
}

async function enableWakeLock() {
  let wakeLock = null;

  try {
    // Request a wake lock
    wakeLock = await navigator.wakeLock.request("screen");
    console.log("Wake lock is active");

    // Handle wake lock release
    wakeLock.addEventListener("release", () => {
      console.log("Wake lock released");
    });
  } catch (err) {
    console.error("Failed to acquire wake lock:", err);
  }

  // Return the wake lock instance to manage it if needed
  return wakeLock;
}
