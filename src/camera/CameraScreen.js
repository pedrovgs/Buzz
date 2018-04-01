import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCameraAlt from "material-ui/svg-icons/image/camera-alt";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
  }

  render() {
    return (
      <FloatingButton onClick={this.onFloatingButtonClick}>
        <ImageCameraAlt />
      </FloatingButton>
    );
  }

  onFloatingButtonClick() {

  }
}

CameraScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(CameraScreen);
