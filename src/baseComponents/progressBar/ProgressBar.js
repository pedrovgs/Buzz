import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "material-ui";
import testUtils from "../../testUtils/utils";

class ProgressBar extends React.Component {
  render() {
    const mode = testUtils.isRunningTests() ? "determinate" : "indeterminate";
    return (
      <div hidden={this.props.hidden}>
        <CircularProgress id="progress" mode={mode} size={100} value={55} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  hidden: PropTypes.bool
};

ProgressBar.defaultProps = {
  hidden: false
};

export default ProgressBar;
