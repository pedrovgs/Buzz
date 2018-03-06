import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppTheme from "./theme/AppTheme";
import { Provider } from "react-redux";
import App from "./App";
import buzzStore from "./buzz";

ReactDOM.render(
  <Provider store={buzzStore}>
    <MuiThemeProvider muiTheme={AppTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);