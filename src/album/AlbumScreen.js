import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class AlbumScreen extends Component {
  render() {
    return <p>AlbumScreen</p>;
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AlbumScreen);
