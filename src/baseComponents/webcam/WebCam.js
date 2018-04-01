import React from "react";

const videoStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  minWidth: "100%",
  minHeight: "100%",
  width: "auto",
  height: "auto",
  zIndex: "-100",
  transform: "translateX(-50%) translateY(-50%) scaleX(-1)"
};

class WebCam extends React.Component {
  componentDidMount() {
    const video = document.querySelector("#video");
    function handleVideo(stream) {
      video.src = window.URL.createObjectURL(stream);
    }
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;
    navigator.getUserMedia({ video: true }, handleVideo, () => {});
  }
  render() {
    return <video autoPlay="true" id="video" style={videoStyle} />;
  }
}

export default WebCam;
