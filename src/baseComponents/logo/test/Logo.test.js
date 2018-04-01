import React from "react";
import Logo from "../Logo";
import { shallowComponentToJson } from "../../../testUtils/enzyme";

describe("Logo", () => {
  it("shows the application logo", () => {
    const logo = shallowComponentToJson(<Logo />);
    expect(logo).toMatchSnapshot();
  });
});
