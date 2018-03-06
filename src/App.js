import React, { Component } from "react";
import SplashScreen from "./splashScreen/SplashScreen";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={SplashScreen} />
      </BrowserRouter>
    );
  }
}
