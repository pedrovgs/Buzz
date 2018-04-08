import { INDEX } from "../app/routes";

export const SAVE_SESSION = "SAVE_SESSION";
export const LOG_OUT = "LOG_OUT";

export class User {
  constructor(email) {
    this.email = email;
  }
}

export function saveSession(user) {
  return {
    type: SAVE_SESSION,
    user: user
  };
}

export function logOut(history) {
  return function(dispatch) {
    dispatch({
      type: LOG_OUT
    });
    history.replace(INDEX);
  };
}
