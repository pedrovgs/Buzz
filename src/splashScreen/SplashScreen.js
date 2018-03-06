import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../images/logo.svg";
import "./css/SplashScreen.css";
import CircularProgress from "material-ui/CircularProgress";
import { connect } from "react-redux";

const timeShowingAppIconInMillis = 1200;
const timeLoadingInMillis = 1900;

class Splash extends Component {
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
      () => this.props.onLoadCompleted(),
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
  onLoadCompleted: PropTypes.func
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCompleted: () => {
      console.log("On fucking load completed");
    }
  };
};

const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashScreen;
