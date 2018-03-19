jest.mock("../../../firebase/firebaseAuth");
const firebaseAuthMock = require("../../../firebase/firebaseAuth");
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

  it("updates the component state with the email and pass configured when the sign up button is pressed", () => {
    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);

    expect(form.state().email).toEqual(anyEmail);
    expect(form.state().password).toEqual(anyPass);
  });

  it("tries to create a user account with the email and pass configured when the sign up button is pressed", () => {
    givenTheSignOutIsPerformedProperly();

    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    clickSignInButton(form);

    verifyCreateMemberInvokedWith(anyEmail, anyPass);
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

  function clickSignInButton(form) {
    form.instance().onSubmit(null);
  }

  function verifyCreateMemberInvokedWith(email, pass) {
    expect(firebaseAuthMock.default._signInEmail).toEqual(email);
    expect(firebaseAuthMock.default._signInPass).toEqual(pass);
  }

  function givenTheSignOutIsPerformedProperly() {
    let mock = firebaseAuthMock.default;
    mock._signOutResult = Promise.resolve();
  }
});
