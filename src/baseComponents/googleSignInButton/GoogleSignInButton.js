import React from "react";
import googleSignInLogo from "./images/googleSignInLogo.png";
import googleSignInLogoPressed from "./images/googleSignInLogoPressed.png";
import firebase from "firebase";

const style = {
  width: "300px",
  cursor: "pointer",
  paddingTop: "16px",
  paddingBottom: "16px"
};

const initialState = {
  isPressed: false
};

const provider = new firebase.auth.GoogleAuthProvider();

class GoogleSignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onMouseTap = this.onMouseTap.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const src = this.state.isPressed
      ? googleSignInLogoPressed
      : googleSignInLogo;
    return (
      <div>
        <img
          src={src}
          style={style}
          onMouseDown={this.onMouseTap}
          onMouseUp={this.onMouseTap}
          onClick={this.onClick}
          alt="Sign in with Google"
        />
      </div>
    );
  }

  onMouseTap() {
    this.setState(prevState => ({
      isPressed: !prevState.isPressed
    }));
  }

  onClick() {
    const onUserCompletion = this.props.onUserLoggedIn;
    const onErrorCompletion = this.props.onError;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const token = result.credential.accessToken;
        const user = result.user;
        onUserCompletion(token, user);
      })
      .catch(function(error) {
        onErrorCompletion(error);
      });
  }
}

export default GoogleSignInButton;
