import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageCamera from "material-ui/svg-icons/image/camera";
import CommunicationEmail from "material-ui/svg-icons/communication/email";
import { CAMERA, DETAIL } from "../app/routes";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { fetchPictures, selectPicture } from "./actions";
import { connect } from "react-redux";
import ProgressBar from "../baseComponents/progressBar/ProgressBar";
import GridList from "material-ui/GridList";
import { Dialog, FlatButton, GridTile, IconButton } from "material-ui";
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
    this.onShare = this.onShare.bind(this);
    this.sharePicture = this.sharePicture.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      sharingPicture: false
    };
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
        <NavigationBar title="🖼 Your album" />
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
                <GridTile
                  key={url}
                  title={title}
                  actionIcon={
                    <IconButton
                      onClick={() => {
                        this.onShare(tile);
                      }}
                    >
                      <CommunicationEmail color="white" />
                    </IconButton>
                  }
                >
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
          <Dialog
            title="Share picture"
            actions={this.shareActions()}
            modal={false}
            open={this.state.sharingPicture}
          >
            {`Send picture by email to ${this.props.sendPictureEmail}`}
          </Dialog>
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

  shareActions() {
    return [
      <FlatButton
        key="Cancel button"
        label="Cancel"
        primary={true}
        onClick={this.closeDialog}
      />,
      <FlatButton
        key="Ok button"
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.sharePicture}
      />
    ];
  }

  onFloatingButtonClick() {
    this.props.history.push(CAMERA);
  }

  onPictureClick(pictureSelected) {
    this.props.onPictureClick(pictureSelected);
    this.props.history.push(DETAIL);
  }

  onShare(picture) {
    this.setState({
      sharingPicture: picture
    });
  }

  sharePicture() {
    this.closeDialog();
  }

  closeDialog() {
    this.setState({
      sharingPicture: undefined
    });
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
  cellHeight: process.env.REACT_APP_CELL_HEIGHT
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
