import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class LogInScreen extends Component {
  render() {
    return <p>LogInScreen</p>;
  }
}

LogInScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(LogInScreen);
