import React, { Component } from "react";
import SplashScreen from "./splashScreen/SplashScreen";
import LogInScreen from "./session/LogInScreen";
import { BrowserRouter, Route } from "react-router-dom";
import { INDEX, LOG_IN } from "./routes";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={INDEX} component={SplashScreen} />
          <Route exact path={LOG_IN} component={LogInScreen} />
        </div>
      </BrowserRouter>
    );
  }
}
