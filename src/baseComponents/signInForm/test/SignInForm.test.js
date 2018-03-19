import React from "react";
import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import SignInForm from "../SignInForm";
jest.mock("material-ui/TextField", () => "TextField");
jest.mock("material-ui/RaisedButton", () => "RaisedButton");

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

describe("SignInForm", () => {
  it("shows an empty form with the email, pass, sign up and sing in buttons by default", () => {
    const signUpForm = renderSignupForm();

    expect(signUpForm).toMatchSnapshot();
  });

  function renderSignupForm() {
    return toJson(Enzyme.shallow(<SignInForm />));
  }
});
