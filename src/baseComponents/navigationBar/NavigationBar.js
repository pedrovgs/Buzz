import React from "react";
import PropTypes from "prop-types";
import { AppBar, FlatButton, IconButton } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const userEmailLabelStyle = {
  textTransform: "lowercase"
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
  }

  render() {
    return (
      <AppBar
        title={this.props.title}
        onLeftIconButtonClick={this.onLeftIconButtonClick}
        iconElementLeft={this.leftIcon()}
        showMenuIconButton={this.props.showBackButton || false}
        iconElementRight={
          <FlatButton
            label={this.props.userLoggedInEmail || " "}
            disabled={true}
            labelStyle={userEmailLabelStyle}
          />
        }
      />
    );
  }

  leftIcon() {
    if (this.props.showBackButton) {
      return (
        <IconButton>
          <NavigationArrowBack />
        </IconButton>
      );
    } else {
      return null;
    }
  }

  onLeftIconButtonClick() {
    if (this.props.showBackButton === true) {
      this.props.history.goBack();
    }
  }
}

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = state => {
  if (state.session.user) {
    return {
      userLoggedInEmail: state.session.user.email
    };
  } else {
    return {};
  }
};

export default withRouter(connect(mapStateToProps, null)(NavigationBar));
