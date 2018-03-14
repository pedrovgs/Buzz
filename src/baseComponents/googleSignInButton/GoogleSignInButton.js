import React from "react";
import googleSignInLogo from "./images/googleSignInLogo.svg";

export default class GoogleSignInButton extends React.Component {
  render() {
    return (
      <div className="signInWithGoogleButton">
        <img className="singInWithGoogleIcon" src={googleSignInLogo} />
        <span className="buttonText">Google</span>
      </div>
    );
  }
}
