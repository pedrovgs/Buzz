import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCamera from "material-ui/svg-icons/image/camera";
import { CAMERA, DETAIL } from "../app/routes";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { fetchPictures, selectPicture } from "./actions";
import { connect } from "react-redux";
import ProgressBar from "../baseComponents/progressBar/ProgressBar";
import GridList from "material-ui/GridList";
import { GridTile } from "material-ui";
import { formatTimestamp } from "../utils/dates";
import { Col, Row } from "react-flexbox-grid";
import EmptyAlbum from "./emptyCase/EmptyAlbum";
import { LazyLoadImage } from "react-lazy-load-image-component";

const styles = {
  gridList: {
    width: "100%",
    height: "100%",
    overflowY: "auto"
  },
  img: {
    minWidth: "100%",
    minHeight: "100%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    left: "50%",
    top: "50%"
  }
};
class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
    this.onPictureClick = this.onPictureClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPictures();
  }

  render() {
    const containerStyle =
      this.props.fetchingPictures || this.props.pictures.length === 0
        ? { height: "100%" }
        : {};
    return (
      <div style={containerStyle}>
        <NavigationBar title="&#128444; Your album" />
        {this.renderMainComponent()}
        <FloatingButton onClick={this.onFloatingButtonClick}>
          <ImageCamera />
        </FloatingButton>
      </div>
    );
  }

  renderMainComponent() {
    if (this.props.fetchingPictures) {
      return (
        <Row center="xs" middle="xs" className="fullWidth">
          <Col xs>
            <ProgressBar />
          </Col>
        </Row>
      );
    } else if (this.props.pictures.length > 0) {
      return (
        <div>
          <GridList
            cols={this.props.numberOfColumns}
            cellHeight={200}
            style={styles.gridList}
          >
            {this.props.pictures.map(tile => {
              const url = tile.url;
              const title = formatTimestamp(tile.createdAt);
              return (
                <GridTile key={url} title={title}>
                  <LazyLoadImage
                    onClick={() => {
                      this.onPictureClick(tile);
                    }}
                    style={styles.img}
                    src={url}
                    alt={title}
                  />
                </GridTile>
              );
            })}
          </GridList>
        </div>
      );
    } else {
      return (
        <Row center="xs" middle="xs" className="fullWidth">
          <Col xs>
            <EmptyAlbum />
          </Col>
        </Row>
      );
    }
  }

  onFloatingButtonClick() {
    enterFullScreen();
    this.props.history.push(CAMERA);
  }

  onPictureClick(pictureSelected) {
    this.props.onPictureClick(pictureSelected);
    this.props.history.push(DETAIL);
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired,
  numberOfColumns: PropTypes.number
};

AlbumScreen.defaultProps = {
  fetchingPictures: true,
  numberOfColumns: Number(process.env.REACT_APP_ALBUM_NUMBER_OF_COLUMNS)
};

const mapStateToProps = state => {
  const album = state.album;
  const session = state.session;
  if (album && session && session.user) {
    return {
      fetchingPictures: album.fetchingPictures || false,
      pictures: album.pictures || [],
      sendPictureEmail: session.user.email
    };
  } else {
    return {
      fetchingPictures: false,
      pictures: []
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPictures: () => {
      dispatch(fetchPictures());
    },
    onPictureClick: pictureSelected => {
      dispatch(selectPicture(pictureSelected));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AlbumScreen)
);

function enterFullScreen() {
  const element = document.getElementById("root");
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.webkitEnterFullScreen) {
    element.webkitEnterFullScreen();
  }
}
