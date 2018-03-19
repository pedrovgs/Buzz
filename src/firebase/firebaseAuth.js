import firebase from "firebase";

export async function signOut() {
  return firebase.auth().signOut();
}

export async function signIn(email, pass) {
  return firebase.auth().signInWithEmailAndPassword(email, pass);
}

export async function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function currentUser() {
  return firebase.auth().currentUser;
}
