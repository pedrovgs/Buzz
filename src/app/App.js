import React, { Component } from "react";
import SplashScreen from "../splashScreen/SplashScreen";
import LogInScreen from "../session/LogInScreen";
import { HashRouter, Route } from "react-router-dom";
import { ALBUM, CAMERA, INDEX, LOG_IN } from "./routes";
import AlbumScreen from "../album/AlbumScreen";
import "./css/App.css";
import "../animations/css/Animations.css";
import CameraScreen from "../camera/CameraScreen";

const containerStyle = {
  height: "100%"
};

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <div style={containerStyle}>
          <Route exact path={INDEX} component={SplashScreen} />
          <Route exact path={LOG_IN} component={LogInScreen} />
          <Route exact path={ALBUM} component={AlbumScreen} />
          <Route exact path={CAMERA} component={CameraScreen} />
        </div>
      </HashRouter>
    );
  }
}
