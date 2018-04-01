import firebase from "firebase";

function signOut() {
  return firebase.auth().signOut();
}

function signIn(email, pass) {
  return firebase.auth().signInWithEmailAndPassword(email, pass);
}

function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function currentUser() {
  return firebase.auth().currentUser;
}

export default {
  signOut: signOut,
  signIn: signIn,
  signUp: signUp,
  currentUser: currentUser
};
