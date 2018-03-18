import React from "react";
import { CircularProgress } from "material-ui";
import testUtils from "../../testUtils/utils";

export default class ProgressBar extends React.Component {
  render() {
    const mode = testUtils.isRunningTests() ? "determinate" : "indeterminate";
    return <CircularProgress id="progress" mode={mode} size={100} value={55} />;
  }
}
