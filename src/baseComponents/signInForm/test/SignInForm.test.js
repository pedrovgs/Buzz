import React from "react";
import {
  shallowComponent,
  shallowComponentToJson
} from "../../../testUtils/enzyme";
import SignInForm from "../SignInForm";
jest.mock("material-ui/TextField", () => "TextField");
jest.mock("material-ui/RaisedButton", () => "RaisedButton");

describe("SignInForm", () => {
  const anyEmail = "pedro@gmail.com";
  const anyPass = "pisum";

  it("shows an empty form with the email, pass, sign up and sing in buttons by default", () => {
    const signInForm = renderSignInForm();

    expect(signInForm).toMatchSnapshot();
  });

  it("tries to create an account with the email and pass configured when the sign up button is pressed", () => {
    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);

    expect(form.state().email).toEqual(anyEmail);
    expect(form.state().password).toEqual(anyPass);
  });

  function renderSignInForm() {
    return shallowComponentToJson(<SignInForm />);
  }

  function signInForm() {
    return shallowComponent(<SignInForm />);
  }

  function setEmail(form, email) {
    form.instance().onEmailFieldChanged(null, email);
  }

  function setPass(form, pass) {
    form.instance().onPasswordFieldChanged(null, pass);
  }
});
