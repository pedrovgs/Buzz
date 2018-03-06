import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  user: undefined,
  authToken: undefined
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        session: {
          user: action.user,
          authToken: action.authToken
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        session: undefined
      });
    default:
      return state;
  }
}

export function isUserLoggedIn(state) {
  return typeof state.session !== "undefined";
}
