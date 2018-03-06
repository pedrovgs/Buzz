import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  user: undefined,
  authToken: undefined
};

export default function session(state = initialState, action) {
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
