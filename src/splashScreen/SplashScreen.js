import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { ALBUM, LOG_IN } from "../app/routes";
import { isUserLoggedIn } from "../session/session";
import Logo from "../baseComponents/logo/Logo";
import ProgressBar from "../baseComponents/progressBar/ProgressBar";

const timeShowingAppIconInMillis = 1200;
const timeLoadingInMillis = 1900;

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    this.showLoadingTimer = setTimeout(
      () => this.showLoading(),
      timeShowingAppIconInMillis
    );
  }

  componentWillUnmount() {
    clearTimeout(this.showLoadingTimer);
    clearTimeout(this.hideLoadingTimer);
  }

  render() {
    if (this.state.loading) {
      this.scheduleHideLoading();
      return <ProgressBar />;
    } else {
      return <Logo />;
    }
  }

  scheduleHideLoading() {
    this.hideLoadingTimer = setTimeout(
      () => this.openNextScreen(),
      timeLoadingInMillis
    );
  }

  openNextScreen() {
    if (!this.isUserLoggedIn) {
      return this.props.history.push(LOG_IN);
    } else {
      return this.props.history.push(ALBUM);
    }
  }

  showLoading() {
    this.setState({
      loading: true
    });
  }
}

function mapStateToProps(state) {
  return { isUserLoggedIn: isUserLoggedIn(state) };
}

Splash.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(Splash));
