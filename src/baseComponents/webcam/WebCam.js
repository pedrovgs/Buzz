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
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia;
    var constraints = {
      audio: false,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 1024 },
        facingMode: "user"
      }
    };

    navigator.mediaDevices.enumerateDevices().then(function(devices) {
      for (let i = 0; i !== devices.length; ++i) {
        if (devices[i].kind === "videoinput") {
          constraints.deviceId = { exact: devices[i].deviceId };
        }
      }
    });

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      this.localStream = stream;
      video.srcObject = stream;
    });
  }

  componentWillUnmount() {
    const localStream = this.localStream;
    if (localStream) {
      localStream.getTracks()[0].stop();
      const video = this.getVideoTag();
      video.pause();
      video.srcObject = null;
    }
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
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    const ctx = canvas.getContext("2d");
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width * -1, canvas.height);
    return canvas.toDataURL();
  }
}

export default WebCam;
