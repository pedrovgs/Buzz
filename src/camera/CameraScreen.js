import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCameraAlt from "material-ui/svg-icons/image/camera-alt";
import WebCam from "../baseComponents/webcam/WebCam";
import moment from "moment";
import Countdown from "../baseComponents/countdown/Countdown";
import { saveTentativePicture } from "./actions";
import { connect } from "react-redux";

const containerStyle = {
  height: "100%",
  width: "100%"
};
class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
    this.didStartTheCountdown = this.didStartTheCountdown.bind(this);
    this.didFinishCountdown = this.didFinishCountdown.bind(this);
    this.webcamReference = React.createRef();
  }

  render() {
    return (
      <div style={containerStyle}>
        <WebCam ref={this.webcamReference} />
        <Countdown
          countdownSeconds={5}
          countdownStartDate={this.state.startCountdownDate}
          onCountdownFinished={this.didFinishCountdown}
        />
        <FloatingButton
          onClick={this.onFloatingButtonClick}
          disabled={this.didStartTheCountdown()}
        >
          <ImageCameraAlt />
        </FloatingButton>
      </div>
    );
  }

  onFloatingButtonClick() {
    this.setState({
      startCountdownDate: moment()
    });
  }

  didStartTheCountdown() {
    return typeof this.state.startCountdownDate !== "undefined";
  }

  didFinishCountdown() {
    this.setState({ startCountdownDate: undefined });
    const base64Image = this.webcamReference.current.takePicture();
    this.props.onPictureTaken(base64Image);
  }
}

CameraScreen.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = () => {
  return {};
};

const mapPropsToDispatch = dispatch => {
  return {
    onPictureTaken: picture => {
      dispatch(saveTentativePicture(picture));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapPropsToDispatch)(CameraScreen)
);
