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
    return (
      <div>
        <NavigationBar title="🖼 Your pictures" />
        <ProgressBar hidden={!this.props.fetchingPictures} />
        <GridList
          cols={this.props.numberOfColumns}
          cellHeight={this.props.cellHeight}
          style={styles.gridList}
        >
          {this.props.pictures.map(tile => (
            <GridTile
              key={tile.url}
              title={tile.createdAt}
              //actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.url} alt={tile.createdAt} />
            </GridTile>
          ))}
        </GridList>
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
  history: PropTypes.object.isRequired,
  numberOfColumns: PropTypes.number,
  cellHeight: PropTypes.number
};

AlbumScreen.defaultProps = {
  numberOfColumns: process.env.REACT_APP_ALBUM_NUMBER_OF_COLUMNS,
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
