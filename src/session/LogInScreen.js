import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import GoogleSignInButton from "../baseComponents/googleSignInButton/GoogleSignInButton";

class LogInScreen extends Component {
  render() {
    return <GoogleSignInButton />;
  }
}

LogInScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(LogInScreen);
