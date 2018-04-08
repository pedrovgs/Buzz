import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCamera from "material-ui/svg-icons/image/camera";
import { CAMERA } from "../app/routes";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { fetchPictures } from "./actions";
import { connect } from "react-redux";
import ProgressBar from "../baseComponents/progressBar/ProgressBar";

class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPictures();
  }

  componentDidUpdate() {
    this.props.fetchPictures();
  }

  render() {
    return (
      <div>
        <ProgressBar hidden={!this.props.fetchingPictures} />
        <NavigationBar title="🖼 Your pictures" />
        <FloatingButton onClick={this.onFloatingButtonClick}>
          <ImageCamera />
        </FloatingButton>
      </div>
    );
  }

  onFloatingButtonClick() {
    this.props.history.push(CAMERA);
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    fetchingPictures: state.camera.fetchingPictures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPictures: () => {
      dispatch(fetchPictures());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AlbumScreen)
);
