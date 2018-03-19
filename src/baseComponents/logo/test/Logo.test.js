import React from "react";
import Logo from "../Logo";
import { shallowComponent } from "../../../testUtils/enzyme";

describe("Logo", () => {
  it("shows the application logo", () => {
    const logo = shallowComponent(<Logo />);
    expect(logo).toMatchSnapshot();
  });
});
