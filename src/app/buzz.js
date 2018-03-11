import { sessionReducer } from "../session/session";
import { createStore } from "redux";
import { loadState, saveState } from "../persistence/storePersistence";
import { throttle } from "lodash";
import { RESET_STATE, resetState } from "./actions";
import { isRunningTests } from "../testUtils/utils";

const buzzStore = createStore(
  buzzReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
configurePersistence(buzzStore);

function configurePersistence(store) {
  return loadInitialState(store).then(() => {
    configureSubscriberToPersistStateChanges(store);
  });
}

function configureSubscriberToPersistStateChanges(store) {
  const saveNewStatus = () => {
    const currentState = buzzStore.getState();
    saveState(currentState);
  };
  const persistStateThrottle = isRunningTests() ? 0 : 1000;
  store.subscribe(throttle(saveNewStatus), persistStateThrottle);
}

function loadInitialState(store) {
  return loadState().then(state => {
    store.dispatch(resetState(state));
  });
}

function buzzReducer(state = {}, action) {
  switch (action.type) {
    case RESET_STATE:
      return action.state;
    default:
      return {
        session: sessionReducer(state.session, action)
      };
  }
}

export default buzzStore;