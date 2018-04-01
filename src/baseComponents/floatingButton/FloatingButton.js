import React from "react";
import { FloatingActionButton } from "material-ui";

const actionButtonStyle = {
  position: "fixed",
  right: "0",
  bottom: "0",
  margin: "20px"
};

class FloatingButton extends React.Component {
  render() {
    return (
      <FloatingActionButton style={actionButtonStyle}>
        {this.props.children}
      </FloatingActionButton>
    );
  }
}

export default FloatingButton;
