import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppTheme from "./theme/AppTheme";
import { Provider } from "react-redux";
import App from "./app/App";
import buzzStore from "./app/buzz";
import { isRunningTests } from "./testUtils/utils";

prepareAppForTestingIfNeeded();

ReactDOM.render(
  <Provider store={buzzStore}>
    <MuiThemeProvider muiTheme={AppTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

function prepareAppForTestingIfNeeded() {
  if (isRunningTests()) {
    window.store = buzzStore;
  }
}
