jest.mock("../../../testUtils/utils");
const testUtilsMock = require("../../../testUtils/utils");
import { shallowComponentToJson } from "../../../testUtils/enzyme";
import React from "react";
import ProgressBar from "../ProgressBar";
jest.mock("material-ui/CircularProgress", () => "CircularProgress");

describe("ProgressBar", () => {
  it("shows the application progress bar as determinated if we are running tests", () => {
    givenTheAppIsRunningTests();

    const progressBar = renderProgressBar();

    expect(progressBar).toMatchSnapshot();
  });

  it("shows the application progress bar as indeterminated if we are not running tests", () => {
    givenTheAppIsNotRunningTests();

    const progressBar = renderProgressBar();

    expect(progressBar).toMatchSnapshot();
  });

  function renderProgressBar() {
    return shallowComponentToJson(<ProgressBar />);
  }

  function givenTheAppIsNotRunningTests() {
    testUtilsMock.default.__configureEnvironmentAsRunningTests(false);
  }

  function givenTheAppIsRunningTests() {
    testUtilsMock.default.__configureEnvironmentAsRunningTests(true);
  }
});
