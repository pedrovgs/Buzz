let _signOutInvoked = false;
let _signOutResult = Promise.resolve();

let _signInEmail;
let _signInPass;
let _signInResult;

function signOut() {
  _signOutInvoked = true;
  return Promise.resolve();
}

function signIn(email, pass) {
  _signInEmail = email;
  _signInPass = pass;
  return _signInResult;
}

function signUp(email, password) {

}

function currentUser() {

}

export default {
  _signOutInvoked: _signOutInvoked,
  _signOutResult: _signOutResult,
  _signInEmail: _signInEmail,
  _signInPass: _signInPass,
  _signInResult: _signInResult,
  signOut: signOut,
  signIn: signIn,
  signUp: signUp,
  currentUser: currentUser
};
