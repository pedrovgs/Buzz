let _signOutResult;

let _signInEmail;
let _signInPass;
let _signInResult;

let _signUpEmail;
let _signUpPass;
let _signUpResult;

let _currentUserResult;

function signOut() {
  return _signOutResult;
}

function _configureSignOutResult(result) {
  _signOutResult = result;
}

function signIn(email, pass) {
  _signInEmail = email;
  _signInPass = pass;
  return _signInResult;
}

function _configureSignInResult(result) {
  _signInResult = result;
}

function signUp(email, password) {
  _signUpEmail = email;
  _signUpPass = password;
  return _signUpResult;
}

function _configureSignUpResult(result) {
  _signUpResult = result;
}

function currentUser() {
  return _currentUserResult;
}

function _configureCurrentUserResult(result) {
  _currentUserResult = result;
}

export default {
  _signInEmail: () => {
    return _signInEmail;
  },
  _signInPass: () => {
    return _signInPass;
  },
  _signUpEmail: () => {
    return _signUpEmail;
  },
  _signUpPass: () => {
    return _signUpPass;
  },
  _configureCurrentUserResult: _configureCurrentUserResult,
  _configureSignOutResult: _configureSignOutResult,
  _configureSignInResult: _configureSignInResult,
  _configureSignUpResult: _configureSignUpResult,
  signOut: signOut,
  signIn: signIn,
  signUp: signUp,
  currentUser: currentUser
};
