import React from "react";
import logo from "./images/logo.svg";
import PropTypes from "prop-types";

export const mediumSize = "medium";
export const bigSize = "big";

const bigStyle = {
  width: "40%",
  height: "40%",
  padding: "12px"
};

const mediumStyle = {
  width: "25%",
  height: "25%",
  padding: "8px"
};

class Logo extends React.Component {
  render() {
    const componentStyle = this.getComponentStyle();
    return <img id="logo" src={logo} alt="Buzz logo" style={componentStyle} />;
  }

  getComponentStyle() {
    const configuredSize = this.props.size;
    if (this.props.size === mediumSize) {
      return mediumStyle;
    } else if (configuredSize === bigSize) {
      return bigStyle;
    } else {
      return bigStyle;
    }
  }
}

Logo.propTypes = {
  size: PropTypes.string
};

export default Logo;
