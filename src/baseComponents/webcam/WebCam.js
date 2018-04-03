import React from "react";

const videoStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  height: "100%",
  zIndex: "-100",
  transform: "translateX(-50%) translateY(-50%) scaleX(-1)"
};

class WebCam extends React.Component {
  componentDidMount() {
    const video = this.getVideoTag();
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

  getVideoTag() {
    return document.querySelector("#video");
  }

  takePicture() {
    const video = this.getVideoTag();
    const canvas = document.createElement("canvas");
    canvas.height = video.clientHeight;
    canvas.width = video.clientWidth;
    const ctx = canvas.getContext("2d");
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width * -1, canvas.height);
    return canvas.toDataURL();
  }
}

export default WebCam;
