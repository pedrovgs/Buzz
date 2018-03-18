import React, { Component } from "react";
import GoogleSignInButton from "../baseComponents/googleSignInButton/GoogleSignInButton";
import { logOut, saveSession, User } from "./actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ALBUM } from "../app/routes";
import { isUserLoggedIn } from "./session";
import { Grid, Row, Col } from "react-flexbox-grid";
import Logo, { mediumSize } from "../baseComponents/logo/Logo";
import { fade } from "../animations/animationUtils";

class LogInScreen extends Component {
  componentDidMount() {
    this.goToAlbumScreenIfTheUserIsStillLoggedIn();
  }

  componentDidUpdate() {
    this.goToAlbumScreenIfTheUserIsStillLoggedIn();
  }

  render() {
    return (
      <Grid className="fullWidth">
        <Row center="xs" middle="xs" className="fullWidth">
          {fade(
            <Col>
              <Logo size={mediumSize} />
              <GoogleSignInButton
                onUserLoggedIn={this.props.onUserLoggedIn}
                onError={this.props.onError}
              />
            </Col>
          )}
        </Row>
      </Grid>
    );
  }

  goToAlbumScreenIfTheUserIsStillLoggedIn() {
    if (this.props.isUserLoggedIn === true) {
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
