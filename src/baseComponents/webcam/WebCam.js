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
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;
    navigator.getUserMedia(
      { video: true },
      stream => {
        const video = this.getVideoTag();
        video.srcObject = stream;
        this.localStream = stream;
      },
      () => {}
    );
  }

  componentWillUnmount() {
    this.localStream.getTracks()[0].stop();
    const video = this.getVideoTag();
    video.pause();
    video.srcObject = null;
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
    canvas.height = process.env.REACT_APP_WEB_CAM_RESOLUTION_HEIGHT;
    canvas.width = process.env.REACT_APP_WEB_CAM_RESOLUTION_WIDTH;
    const ctx = canvas.getContext("2d");
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width * -1, canvas.height);
    return canvas.toDataURL();
  }
}

export default WebCam;
