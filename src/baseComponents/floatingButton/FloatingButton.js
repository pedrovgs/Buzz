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
      >
        {this.props.children}
      </FloatingActionButton>
    );
  }
}

FloatingButton.propTypes = {
  onClick: PropTypes.func
};

export default FloatingButton;
