export const SAVE_SESSION = "SAVE_SESSION";
export const LOG_OUT = "LOG_OUT";

export class User {
  constructor(name, email, photoURL) {
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
  }
}

export function saveSession(user, authToken) {
  return {
    type: SAVE_SESSION,
    authToken: authToken,
    user: user
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
