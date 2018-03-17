import React, { Component } from "react";
import GoogleSignInButton from "../baseComponents/googleSignInButton/GoogleSignInButton";
import { logOut, saveSession, User } from "./actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ALBUM } from "../app/routes";
import { isUserLoggedIn } from "./session";

class LogInScreen extends Component {
  componentDidMount() {
    this.goToAlbumScreenIfTheUserIsStillLoggedIn();
  }

  componentDidUpdate() {
    this.goToAlbumScreenIfTheUserIsStillLoggedIn();
  }

  render() {
    return (
      <GoogleSignInButton
        onUserLoggedIn={this.props.onUserLoggedIn}
        onError={this.props.onError}
      />
    );
  }

  goToAlbumScreenIfTheUserIsStillLoggedIn() {
    if (this.props.isUserLoggedIn) {
      this.props.history.push(ALBUM);
    }
  }
}

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
    onError: () => {
      dispatch(logOut());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogInScreen)
);
