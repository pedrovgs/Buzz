jest.mock("../../../firebase/firebaseAuth");
const firebaseAuthMock = require("../../../firebase/firebaseAuth");
import { User } from "../../../session/actions";
import React from "react";
import {
  shallowComponent,
  shallowComponentToJson,
  toJson
} from "../../../testUtils/enzyme";
import SignInForm from "../SignInForm";
jest.mock("material-ui/TextField", () => "TextField");
jest.mock("material-ui/RaisedButton", () => "RaisedButton");

describe("SignInForm", () => {
  const anyEmail = "pedro@gmail.com";
  const anyPass = "pisum";
  const anyUid = "1";

  afterEach(() => {
    jest.resetModules();
  });

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

  it("tries to sign in with a user account with the email and pass configured when the sign up button is pressed", async () => {
    givenTheSignOutIsPerformedProperly();
    givenTheSignInIsPerformedProperly();

    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    verifySignInInvokedWith(anyEmail, anyPass);
  });

  it("notifies the sign in process finished properly", async () => {
    givenTheSignOutIsPerformedProperly();
    const user = givenTheSignInIsPerformedProperly();

    const listener = jest.fn();
    const form = signInForm(listener);

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    expect(listener).toBeCalledWith(user);
  });

  it("tries to sign up the user in if the user is not found during the sign in process", async () => {
    givenTheSignOutIsPerformedProperly();
    givenTheUserIsNotFound();
    givenTheSignUpIsPerformedProperly();
    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    verifySignUpInvokedWith(anyEmail, anyPass);
  });

  it("tries to log the user in if the member is not found during the sign in process", async () => {
    givenTheSignOutIsPerformedProperly();
    givenTheUserIsNotFound();
    const user = givenTheSignUpIsPerformedProperly();
    const listener = jest.fn();
    const form = signInForm(listener);

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    expect(listener).toBeCalledWith(user);
  });

  it("shows the error message returned by firebase if the sign in fails", async () => {
    givenTheSignOutIsPerformedProperly();
    givenTheEmailIsNotValid();
    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    expect(toJson(form)).toMatchSnapshot();
  });

  it("shows the error message returned by firebase if the sign up fails", async () => {
    givenTheSignOutIsPerformedProperly();
    givenTheUserIsNotFound();
    givenTheSignUpFails();
    const form = signInForm();

    setEmail(form, anyEmail);
    setPass(form, anyPass);
    await clickSignInButton(form);

    expect(toJson(form)).toMatchSnapshot();
  });

  function givenTheUserIsNotFound() {
    const result = Promise.reject({
      code: "auth/user-not-found"
    });
    firebaseAuthMock.default._configureSignInResult(result);
  }

  function givenTheEmailIsNotValid() {
    const result = Promise.reject({
      code: "auth/invalid-email",
      message: "The email is not valid"
    });
    firebaseAuthMock.default._configureSignInResult(result);
  }

  function givenTheSignUpFails() {
    const result = Promise.reject({
      message: "There was something wrong with the sign up"
    });
    firebaseAuthMock.default._configureSignUpResult(result);
  }

  function renderSignInForm() {
    return shallowComponentToJson(<SignInForm />);
  }

  function signInForm(listener) {
    return shallowComponent(<SignInForm onUserLoggedIn={listener} />);
  }

  function setEmail(form, email) {
    form.instance().onEmailFieldChanged(null, email);
  }

  function setPass(form, pass) {
    form.instance().onPasswordFieldChanged(null, pass);
  }

  function clickSignInButton(form) {
    return form.instance().onSubmit(null);
  }

  function verifySignInInvokedWith(email, pass) {
    expect(firebaseAuthMock.default._signInEmail()).toEqual(email);
    expect(firebaseAuthMock.default._signInPass()).toEqual(pass);
  }

  function verifySignUpInvokedWith(email, pass) {
    expect(firebaseAuthMock.default._signUpEmail()).toEqual(email);
    expect(firebaseAuthMock.default._signUpPass()).toEqual(pass);
  }

  function givenTheSignOutIsPerformedProperly() {
    firebaseAuthMock.default._configureSignOutResult(Promise.resolve());
  }

  function givenTheSignUpIsPerformedProperly() {
    firebaseAuthMock.default._configureSignUpResult(Promise.resolve());
    return givenTheUserIsAuthenticatedProperly();
  }

  function givenTheSignInIsPerformedProperly() {
    firebaseAuthMock.default._configureSignInResult(Promise.resolve());
    return givenTheUserIsAuthenticatedProperly();
  }

  function givenTheUserIsAuthenticatedProperly() {
    const user = {
      uid: anyUid,
      email: anyEmail
    };
    firebaseAuthMock.default._configureCurrentUserResult(user);
    return new User(user.uid, user.email);
  }
});
