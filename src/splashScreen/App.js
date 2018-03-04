import React, { Component } from "react";
import logo from "./images/logo.svg";

export default class SplashScreen extends Component {
  render() {
    return <img src={logo} alt="Buzz logo" className="loading-screen-logo" />;
  }
}
