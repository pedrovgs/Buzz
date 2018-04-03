import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const previewStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  height: "100%",
  zIndex: "-100",
  transform: "translateX(-50%) translateY(-50%)"
};

class PreviewScreen extends React.Component {
  render() {
    return <img style={previewStyle} src={this.props.tentativePicture} />;
  }
}

PreviewScreen.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { tentativePicture: state.camera.tentativePicture };
};
export default withRouter(connect(mapStateToProps, () => {})(PreviewScreen));
