import session from "./session/reducer";
import { createStore } from "redux";

function buzz(state = {}, action) {
  return {
    session: session(state.session, action)
  };
}

const buzzStore = createStore(buzz);

export default buzzStore;
