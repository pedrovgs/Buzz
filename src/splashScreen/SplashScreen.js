import React from "react";
import PropTypes from "prop-types";
import logo from "../images/logo.svg";
import "./css/SplashScreen.css";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router";
import {LOG_IN} from "../routes";

const timeShowingAppIconInMillis = 1200;
const timeLoadingInMillis = 1900;

class Splash extends React.Component {
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
      () => this.props.history.push(LOG_IN),
      timeLoadingInMillis
    );
  }

  showLoading() {
    this.setState({
      loading: true
    });
  }
}

Splash.propTypes = {
  history: PropTypes.object.isRequired
};

const SplashScreen = withRouter(Splash);

export default SplashScreen;
