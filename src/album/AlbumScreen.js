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

const styles = {
  gridList: {
    width: "100%",
    height: "100%",
    overflowY: "auto"
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
            cellHeight={this.props.cellHeight}
            style={styles.gridList}
          >
            {this.props.pictures.map(tile => {
              const url = tile.url;
              const title = formatTimestamp(tile.createdAt);
              return (
                <GridTile key={url} title={title}>
                  <img
                    onClick={() => {
                      this.onPictureClick(tile);
                    }}
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
    this.props.history.push(CAMERA);
  }

  onPictureClick(pictureSelected) {
    this.props.onPictureClick(pictureSelected);
    this.props.history.push(DETAIL);
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired,
  numberOfColumns: PropTypes.number,
  cellHeight: PropTypes.string
};

AlbumScreen.defaultProps = {
  fetchingPictures: true,
  numberOfColumns: Number(process.env.REACT_APP_ALBUM_NUMBER_OF_COLUMNS),
  cellHeight: defaultCellHeight()
};

function defaultCellHeight() {
  const configuredCellHeight = process.env.REACT_APP_CELL_HEIGHT;
  if (Number.isInteger(configuredCellHeight)) {
    return Number(configuredCellHeight);
  } else if (configuredCellHeight === "auto") {
    return configuredCellHeight;
  } else {
    return "auto";
  }
}

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
