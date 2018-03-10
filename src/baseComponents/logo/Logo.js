import React from "react";
import logo from "./images/logo.svg";

export default class Logo extends React.Component {
  render() {
    return (
      <img
        id="logo"
        src={logo}
        alt="Buzz logo"
        className="loading-screen-logo center"
      />
    );
  }
}
