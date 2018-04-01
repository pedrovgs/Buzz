import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCamera from "material-ui/svg-icons/image/camera";
import { TAKE_PICTURE } from "../app/routes";

class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
  }

  render() {
    return (
      <FloatingButton onClick={this.onFloatingButtonClick}>
        <ImageCamera />
      </FloatingButton>
    );
  }

  onFloatingButtonClick() {
    this.props.history.push(TAKE_PICTURE);
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AlbumScreen);
