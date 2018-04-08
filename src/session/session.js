import { SAVE_SESSION, LOG_OUT } from "./actions";

const initialState = {
  user: undefined,
  authToken: undefined
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SESSION:
      return Object.assign({}, state, {
        user: action.user
      });
    case LOG_OUT:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}

export function isUserLoggedIn(state) {
  const isSessionDefined = typeof state.session !== "undefined";
  if (isSessionDefined) {
    const isUserDefined = typeof state.session.user !== "undefined";
    return isUserDefined;
  } else {
    return false;
  }
}

export function getFolderId(state) {
  const isSessionDefined = typeof state.session !== "undefined" && typeof state.session.user !== "undefined";
  if (isSessionDefined) {
    return state.session.user.email;
  } else {
    return undefined;
  }
}
