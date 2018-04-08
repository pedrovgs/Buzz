import React from "react";
import { FloatingActionButton } from "material-ui";
import PropTypes from "prop-types";

const actionButtonStyle = {
  position: "fixed",
  right: "0",
  bottom: "0",
  margin: "20px"
};

class FloatingButton extends React.Component {
  render() {
    return (
      <FloatingActionButton
        style={actionButtonStyle}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </FloatingActionButton>
    );
  }
}

FloatingButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default FloatingButton;
