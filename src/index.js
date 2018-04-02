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
