import React from "react";
import PropTypes from "prop-types";
import { AppBar, Dialog, FlatButton, IconButton } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { logOut } from "../../session/actions";

const userEmailLabelStyle = {
  textTransform: "lowercase"
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLeftIconButtonClick = this.onLeftIconButtonClick.bind(this);
    this.onLogOutButtonClick = this.onLogOutButtonClick.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleLogOutOkButtonClick = this.handleLogOutOkButtonClick.bind(this);
    this.state = {
      showLogOutDialog: false
    };
  }

  render() {
    const logOutDialogActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.closeDialog} />,
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleLogOutOkButtonClick}
      />
    ];
    return (
      <div>
        <Dialog
          title="Log Out"
          actions={logOutDialogActions}
          modal={false}
          open={this.state.showLogOutDialog}
        >
          Would you like to close your session?
        </Dialog>
        <AppBar
          title={this.props.title}
          onLeftIconButtonClick={this.onLeftIconButtonClick}
          iconElementLeft={this.leftIcon()}
          showMenuIconButton={this.props.showBackButton || false}
          iconElementRight={
            <FlatButton
              label={this.props.userLoggedInEmail || " "}
              onClick={this.onLogOutButtonClick}
              labelStyle={userEmailLabelStyle}
            />
          }
        />
      </div>
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

  onLogOutButtonClick() {
    this.setState({
      showLogOutDialog: true
    });
  }

  closeDialog() {
    this.setState({ showLogOutDialog: false });
  }

  handleLogOutOkButtonClick() {
    this.closeDialog();
    this.props.handleLogOutOkButtonClick(this.props.history);
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

const mapDispatchToProps = dispatch => {
  return {
    handleLogOutOkButtonClick: history => {
      dispatch(logOut(history));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
