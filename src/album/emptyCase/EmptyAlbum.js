import React from "react";
import PhotoCamera from "material-ui/svg-icons/image/photo-camera";

const style = {
  contentStyle: {
    height: "30%",
    width: "90%",
    margin: "auto"
  },
  icon: {
    height: "200px",
    width: "200px",
    color: "#828282"
  },
  text: {
    color: "#828282",
    fontSize: "110%"
  }
};

class EmptyAlbum extends React.Component {
  render() {
    return (
      <div style={style.contentStyle}>
        <PhotoCamera style={style.icon} />
        <p style={style.text}>
          Don´t be shy{" "}
          <span role="img" aria-label="Smiley">
            &#128515;
          </span>
          ️
        </p>
        <p style={style.text}>
          Take your first picture tapping on the bottom right button{" "}
          <span role="img" aria-label="Camera">
            &#128248;
          </span>
        </p>
      </div>
    );
  }
}

export default EmptyAlbum;
