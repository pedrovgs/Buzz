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
import GridList from "material-ui/GridList";
import { GridTile } from "material-ui";
import { formatTimestamp } from "../utils/dates";
import { Col, Row } from "react-flexbox-grid";

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
  }

  componentDidMount() {
    this.props.fetchPictures();
  }

  render() {
    const containerStyle = this.props.fetchingPictures
      ? { height: "100%" }
      : {};
    return (
      <div style={containerStyle}>
        <NavigationBar title="🖼 Your pictures" />
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
    } else {
      return (
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
                //actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={url} alt={title} />
              </GridTile>
            );
          })}
        </GridList>
      );
    }
  }

  onFloatingButtonClick() {
    this.props.history.push(CAMERA);
  }
}

AlbumScreen.propTypes = {
  history: PropTypes.object.isRequired,
  numberOfColumns: PropTypes.number,
  cellHeight: PropTypes.number
};

AlbumScreen.defaultProps = {
  fetchingPictures: true,
  numberOfColumns: parseInt(process.env.REACT_APP_ALBUM_NUMBER_OF_COLUMNS),
  cellHeight: process.env.REACT_APP_CELL_HEIGHT
};

const mapStateToProps = state => {
  return {
    fetchingPictures: state.album.fetchingPictures,
    pictures: state.album.pictures
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
