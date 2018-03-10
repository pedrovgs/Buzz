import React from "react";
import { CircularProgress } from "material-ui";
import { isRunningTests } from "../../testUtils/utils";

export default class ProgressBar extends React.Component {
  render() {
    const mode = isRunningTests() ? "determinate" : "indeterminate";
    return (
      <CircularProgress
        id="progress"
        className="center"
        mode={mode}
        size={100}
        value={55}
      />
    );
  }
}
