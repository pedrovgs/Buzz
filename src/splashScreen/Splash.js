import React, { Component } from "react";
import logo from "../images/logo.svg";
import "./css/Splash.css";

export default class SplashScreen extends Component {
  render() {
    return <img src={logo} alt="Buzz logo" className="loading-screen-logo" />;
  }
}
