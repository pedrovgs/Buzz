import React from "react";
import { shallowComponent } from "../../../testUtils/enzyme";
import SignInForm from "../SignInForm";
jest.mock("material-ui/TextField", () => "TextField");
jest.mock("material-ui/RaisedButton", () => "RaisedButton");

describe("SignInForm", () => {
  it("shows an empty form with the email, pass, sign up and sing in buttons by default", () => {
    const signUpForm = renderSignupForm();

    expect(signUpForm).toMatchSnapshot();
  });

  function renderSignupForm() {
    return shallowComponent(<SignInForm />);
  }
});
