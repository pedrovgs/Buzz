import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadPicture } from "../camera/actions";

const previewStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  height: "100%",
  zIndex: "-100",
  transform: "translateX(-50%) translateY(-50%)"
};

class PreviewScreen extends React.Component {
  componentDidUpdate() {
    const tentativePicture = this.props.tentativePicture;
    if (tentativePicture) {
      this.props.uploadPicture(tentativePicture);
    }
  }
  render() {
    const src = this.props.tentativePicture || this.props.pictureUploaded;
    return <img alt="Preview" style={previewStyle} src={src} />;
  }
}

PreviewScreen.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    tentativePicture: state.camera.tentativePicture,
    pictureUploaded: state.camera.lastPictureUploaded
  };
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
