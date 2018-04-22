import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadPicture } from "../camera/actions";
import moment from "moment";
import ProgressBar from "../baseComponents/progressBar/ProgressBar";
import { Col, Row } from "react-flexbox-grid";
import { fade } from "../animations/animationUtils";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";

const containerStyle = {
  height: "100%"
};
const previewStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "100%",
  transform: "translateX(-50%) translateY(-50%)"
};

class PreviewScreen extends React.Component {
  componentDidMount() {
    this.setState({
      mountDate: moment(),
      previewFinished: false
    });
  }

  componentDidUpdate() {
    if (this.props.pictureUploaded && this.state.previewFinished === false) {
      this.setState({
        previewFinished: true
      });
      const dismissDelay = 3 - moment().diff(this.state.mountDate);
      let timeoutDelay = Math.max(dismissDelay, 0);
      setTimeout(() => {
        this.props.history.goBack();
      }, timeoutDelay);
    } else if (this.state.previewFinished === false) {
      this.uploadPicture();
    }
  }

  render() {
    const src = this.props.tentativePicture || this.props.pictureUploaded;
    return fade(
      <div style={containerStyle}>
        <div>
          <NavigationBar title="&#128515; Uploading your picture" />
        </div>
        <Row center="xs" middle="xs" className="fullWidth">
          <Col xs>
            <div>
              <img alt="Preview" style={previewStyle} src={src} />
              <ProgressBar />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  uploadPicture() {
    const tentativePicture = this.props.tentativePicture;
    if (tentativePicture) {
      this.props.uploadPicture(tentativePicture);
    }
  }
}

PreviewScreen.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const camera = state.camera;
  if (camera) {
    return {
      tentativePicture: camera.tentativePicture,
      pictureUploaded: camera.lastPictureUploaded
    };
  } else {
    return {};
  }
};

const mapPropsToDispatch = dispatch => {
  return {
    uploadPicture: picture => {
      dispatch(uploadPicture(picture));
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapPropsToDispatch)(PreviewScreen)
);
