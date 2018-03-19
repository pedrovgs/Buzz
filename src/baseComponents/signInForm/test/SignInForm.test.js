import React from "react";
import Enzyme from "enzyme";
import { createSerializer } from "enzyme-to-json";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import SignInForm from "../SignInForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppTheme from "../../../theme/AppTheme";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
Enzyme.configure({ adapter: new Adapter() });

describe("SignInForm", () => {
  it("shows an empty form with the email, pass, sign up and sing in buttons by default", () => {
    const signUpForm = renderSignupForm();

    expect(signUpForm).toMatchSnapshot();
  });

  function renderSignupForm() {
    return toJson(
      Enzyme.render(
        <MuiThemeProvider muiTheme={AppTheme}>
          <SignInForm />
        </MuiThemeProvider>
      )
    );
  }
});
