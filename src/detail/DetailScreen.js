import React from "react";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import NavigationBar from "../baseComponents/navigationBar/NavigationBar";
import { formatTimestamp } from "../utils/dates";
import Slider from "react-slick";
import { selectPicture } from "../album/actions";

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
      </div>
    );
  }

  settings() {
    const selectedPicture = this.props.selectedPicture;
    const selectedIndex = selectedPicture
      ? this.props.pictures.findIndex(pic => {
          return pic.id === selectedPicture.id;
        })
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
}

DetailScreen.propTypes = {
  pictures: PropTypes.array,
  selectedPicture: PropTypes.object
};

DetailScreen.defaultProps = {
  pictures: []
};

const mapStateToProps = state => {
  return {
    pictures: state.album.pictures,
    selectedPicture: state.album.selectedPicture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPictureSelected: pictureSelected => {
      dispatch(selectPicture(pictureSelected));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
);
