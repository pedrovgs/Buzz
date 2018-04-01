import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCamera from "material-ui/svg-icons/image/camera";

class AlbumScreen extends Component {
  render() {
    return (
      <FloatingButton>
        <ImageCamera />
      </FloatingButton>
    );
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AlbumScreen);
