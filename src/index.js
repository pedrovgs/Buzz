import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppTheme from "./theme/AppTheme";

import SplashScreen from "./splashScreen/Splash";

ReactDOM.render(
  <MuiThemeProvider muiTheme={AppTheme}>
    <SplashScreen />
  </MuiThemeProvider>,
  document.getElementById("root")
);
