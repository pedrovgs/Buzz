import React from "react";
import { TextField, RaisedButton } from "material-ui";
import { User } from "../../session/actions";
import firebaseAuth from "../../firebase/firebaseAuth";

const initialState = {
  isLogInInProgress: false,
  email: undefined,
  password: undefined,
  errorMessage: undefined
};

const formStyle = {
  padding: "6px"
};

const buttonStyle = {
  margin: 12
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onEmailFieldChanged = this.onEmailFieldChanged.bind(this);
    this.onPasswordFieldChanged = this.onPasswordFieldChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <form style={formStyle} id="signInForm">
        <div>
          <TextField
            id="emailField"
            floatingLabelText="Email"
            onChange={this.onEmailFieldChanged}
            errorText={this.state.errorMessage}
          />
        </div>
        <div>
          <TextField
            id="passwordField"
            type="password"
            floatingLabelText="Password"
            onChange={this.onPasswordFieldChanged}
          />
        </div>
        <div>
          <RaisedButton
            id="signUpButton"
            label="Sign Up"
            style={buttonStyle}
            onClick={this.onSubmit}
          />
          <RaisedButton
            id="signInButton"
            label="Sign In"
            style={buttonStyle}
            onClick={this.onSubmit}
          />
        </div>
      </form>
    );
  }

  onEmailFieldChanged(event, newValue) {
    this.setState(() => ({
      email: newValue
    }));
  }

  onPasswordFieldChanged(event, newValue) {
    this.setState(() => ({
      password: newValue
    }));
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setStateToLogInInProgress(true);
    this.signInOrSignUpIfTheUserAlreadyExists();
  }

  signInOrSignUpIfTheUserAlreadyExists() {
    const email = this.state.email;
    const pass = this.state.password;
    firebaseAuth.signOut().then(() => {
      firebaseAuth
        .signIn(email, pass)
        .then(() => {
          this.notifyLogInSuccess();
        })
        .catch(error => {
          let errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            this.createAccount(email, pass);
          } else if (errorCode) {
            this.setStateToError(error.message);
          }
          this.setStateToLogInInProgress(false);
        });
    });
  }

  createAccount(email, password) {
    firebaseAuth
      .signUp(email, password)
      .then(() => {
        this.notifyLogInSuccess();
      })
      .catch(error => {
        const errorMessage = error.message;
        if (errorMessage) {
          this.setStateToError(errorMessage);
        } else {
          this.notifyLogInSuccess();
        }
        this.setStateToLogInInProgress(false);
      });
  }

  notifyLogInSuccess() {
    const user = firebaseAuth.currentUser();
    if (user) {
      this.props.onUserLoggedIn(new User(user.email));
    }
  }

  setStateToLogInInProgress(logInInProgress) {
    this.setState(() => ({
      isLogInInProgress: logInInProgress
    }));
  }

  setStateToError(error) {
    this.setState(() => ({
      errorMessage: error
    }));
  }
}

export default SignInForm;
