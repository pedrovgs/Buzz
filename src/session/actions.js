export const SAVE_SESSION = "SAVE_SESSION";
export const LOG_OUT = "LOG_OUT";

export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

export function saveSession(user, authToken) {
  return {
    type: SAVE_SESSION,
    authToken,
    user
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
