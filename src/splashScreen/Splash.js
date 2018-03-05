import React, { Component } from "react";
import logo from "../images/logo.svg";
import "./css/Splash.css";
import CircularProgress from "material-ui/CircularProgress";

const timeShowingAppIconInMillis = 1200;
const timeLoadingInMillis = 1900;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    this.showLoadingTimer = setTimeout(
      () => this.showLoading(),
      timeShowingAppIconInMillis
    );
  }

  componentWillUnmount() {
    clearTimeout(this.showLoadingTimer);
    clearTimeout(this.hideLoadingTimer);
  }

  render() {
    if (this.state.loading) {
      this.scheduleHideLoading();
      return <CircularProgress className="center" size={100} />;
    } else {
      return (
        <img
          src={logo}
          alt="Buzz logo"
          className="loading-screen-logo center"
        />
      );
    }
  }

  scheduleHideLoading() {
    this.hideLoadingTimer = setTimeout(
      () => this.openNextScreen(),
      timeLoadingInMillis
    );
  }

  showLoading() {
    this.setState({
      loading: true
    });
  }

  openNextScreen() {
    this.setState({
      loading: false
    });
  }
}
