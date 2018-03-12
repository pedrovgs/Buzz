import React from "react";
import renderer from "react-test-renderer";
import Logo from "../Logo";

describe("Logo", () => {
  const component = renderer.create(<Logo />);
  it("shows the application logo", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
