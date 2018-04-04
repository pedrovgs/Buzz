import React from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton } from "material-ui";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";

class NavigationBar extends React.Component {
  render() {
    return (
      <AppBar
        title={this.props.title}
        onLeftIconButtonClick={this.props.onLeftIconButtonClick}
        iconElementLeft={this.leftIcon()}
        showMenuIconButton={this.props.showBackButton | false}
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
}

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
  onLeftIconButtonClick: PropTypes.func
};

export default NavigationBar;
