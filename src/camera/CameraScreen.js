import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCameraAlt from "material-ui/svg-icons/image/camera-alt";
import WebCam from "../baseComponents/webcam/WebCam";

const containerStyle = {
  height: "100%",
  width: "100%"
};
class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
  }

  render() {
    return (
      <div style={containerStyle}>
        <WebCam />
        <FloatingButton onClick={this.onFloatingButtonClick}>
          <ImageCameraAlt />
        </FloatingButton>
      </div>
    );
  }
  onFloatingButtonClick() {}
}

CameraScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(CameraScreen);
