 export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

export function logIn(user, authToken) {
  return {
    type: LOG_IN,
    authToken,
    user
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
