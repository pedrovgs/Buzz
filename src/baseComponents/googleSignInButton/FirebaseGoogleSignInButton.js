import React from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { saveSession, User } from "../../session/actions";
import { isUserLoggedIn } from "../../session/session";
import { ALBUM } from "../../app/routes";

const mapStateToProps = state => {
  return {
    isUserLoggedIn: isUserLoggedIn(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLoggedIn: (token, user) => {
      const buzzUser = new User(user.displayName, user.email, user.photoURL);
      dispatch(saveSession(buzzUser, token));
    },
    onError: error => {
      //TODO: Display a notification here using any library Maybe a toast.
      console.log("logged in");
      console.log(error);
    }
  };
};

class FirebaseGoogleSignInButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isUserLoggedIn) {
      this.props.history.push(ALBUM);
    }
    return (
      <GoogleSignInButton
        onUserLoggedIn={this.props.onUserLoggedIn}
        onError={this.props.onError}
      />
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FirebaseGoogleSignInButton)
);
