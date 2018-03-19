jest.mock("../../../testUtils/utils");
const testUtilsMock = require("../../../testUtils/utils");
import React from "react";
import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import ProgressBar from "../ProgressBar";
jest.mock("material-ui/CircularProgress", () => "CircularProgress");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

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
    return toJson(Enzyme.shallow(<ProgressBar />));
  }

  function givenTheAppIsNotRunningTests() {
    testUtilsMock.default.__configureEnvironmentAsRunningTests(false);
  }

  function givenTheAppIsRunningTests() {
    testUtilsMock.default.__configureEnvironmentAsRunningTests(true);
  }
});
