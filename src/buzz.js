import { sessionReducer } from "./session/session";
import { createStore } from "redux";

function buzz(state = {}, action) {
  return {
    session: sessionReducer(state.session, action)
  };
}

const buzzStore = createStore(buzz);

export default buzzStore;
