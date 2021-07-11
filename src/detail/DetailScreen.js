import React from "react";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { formatTimestamp } from "../utils/dates";
import { deletePicture, selectPicture } from "../album/actions";
import ActionDelete from "material-ui/svg-icons/action/delete";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.onNewPictureSelected = this.onNewPictureSelected.bind(this);
    this.onFloatingButtonClick = this.onFloatingButtonClick.bind(this);
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  UNSAFE_componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate() {
    if (this.props.pictures.length === 0) {
      this.props.history.goBack();
    }
  }

  render() {
    const title = this.props.selectedPicture
      ? formatTimestamp(this.props.selectedPicture.createdAt)
      : "";
    const images = this.props.pictures.map(tile => ({ original: tile.url }));
    return (
      <div>
        <NavigationBar title={title} showBackButton={true} />
        <ImageGallery
          items={images}
          lazyLoad={true}
          showFullscreenButton={false}
          autoPlay={true}
          showThumbnails={false}
          slideInterval={60000}
          onSlide={index => this.onNewPictureSelected(index)}
        />
        <FloatingButton
          disabled={this.props.deletingPicture}
          onClick={this.onFloatingButtonClick}
        >
          <ActionDelete />
        </FloatingButton>
      </div>
    );
  }

  settings() {
    const selectedPicture = this.props.selectedPicture;
    const selectedIndex = selectedPicture
      ? this.props.pictures.indexOf(selectedPicture)
      : 0;
    return {
      dots: true,
      infinite: true,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 60000,
      initialSlide: selectedIndex
    };
  }

  onNewPictureSelected(index) {
    const picture = this.props.pictures[index];
    this.props.onPictureSelected(picture);
  }

  onFloatingButtonClick() {
    const pictureSelected = this.props.selectedPicture;
    if (pictureSelected) {
      this.props.onPictureDeleted(pictureSelected);
    }
  }
}

DetailScreen.propTypes = {
  pictures: PropTypes.array,
  selectedPicture: PropTypes.object,
  deletingPicture: PropTypes.bool
};

DetailScreen.defaultProps = {
  pictures: [],
  deletingPicture: false
};

const mapStateToProps = state => {
  const albumState = state.album;
  return {
    pictures: albumState.pictures,
    selectedPicture: albumState.selectedPicture,
    deletingPicture: albumState.deletingPicture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPictureSelected: pictureSelected => {
      dispatch(selectPicture(pictureSelected));
    },
    onPictureDeleted: pictureToDelete => {
      dispatch(deletePicture(pictureToDelete));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
);
