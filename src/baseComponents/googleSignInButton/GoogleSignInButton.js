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
  isPressed: false,
  isLogInInProgress: true
};

class GoogleSignInButton extends React.Component {
  componentDidMount() {
    this.checkFirebaseAuthenticationResult();
  }

  constructor(props) {
    super(props);
    this.state = initialState;
    this.onMouseTap = this.onMouseTap.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setStateToLogInInProgress = this.setStateToLogInInProgress.bind(this);
  }

  render() {
    if (this.state.isLogInInProgress) {
      return null;
    } else {
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
  }

  onMouseTap() {
    this.setState(prevState => ({
      isPressed: !prevState.isPressed
    }));
  }

  onClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.setStateToLogInInProgress(true);
    firebase.auth().signInWithRedirect(provider);
  }

  setStateToLogInInProgress(logInInProgress) {
    this.setState(prevState => ({
      isPressed: prevState.isPressed,
      isLogInInProgress: logInInProgress
    }));
  }

  checkFirebaseAuthenticationResult() {
    const onUserLoggedIn = this.props.onUserLoggedIn;
    const onError = this.props.onError;
    const setStateToLogInInProgress = this.setStateToLogInInProgress;
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          const token = result.credential.accessToken;
          const user = result.user;
          onUserLoggedIn(token, user);
        } else {
          setStateToLogInInProgress(false);
        }
      })
      .catch(function(error) {
        onError(error);
        setStateToLogInInProgress(false);
      });
  }
}

export default GoogleSignInButton;
