import React from "react";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { formatTimestamp } from "../utils/dates";
import Slider from "react-slick";
import { deletePicture, selectPicture } from "../album/actions";
import ActionDelete from "material-ui/svg-icons/action/delete";
import FloatingButton from "../baseComponents/floatingButton/FloatingButton";

const style = {
  img: {
    margin: "0 auto"
  }
};
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

  componentWillMount() {
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
    return (
      <div>
        <NavigationBar title={title} showBackButton={true} />
        <Slider {...this.settings()} afterChange={this.onNewPictureSelected}>
          {this.props.pictures.map(tile => {
            const url = tile.url;
            const title = formatTimestamp(tile.createdAt);
            const imgHeight = this.state.height * 0.8;
            return (
              <div key={url}>
                <img
                  height={imgHeight}
                  src={url}
                  alt={title}
                  style={style.img}
                />
              </div>
            );
          })}
        </Slider>
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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplaySpeed: 60000,
      autoplay: true,
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
