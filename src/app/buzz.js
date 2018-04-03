import { sessionReducer } from "../session/session";
import { applyMiddleware, createStore } from "redux";
import { loadState, saveState } from "../persistence/storePersistence";
import { throttle } from "lodash";
import { RESET_STATE, resetState } from "./actions";
import testUtils from "../testUtils/utils";
import thunk from "redux-thunk";
import firebase from "firebase";
import { cameraReducer } from "../camera/camera";

const buzzStore = createStore(
  buzzReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
initializeFirebase();
configurePersistence(buzzStore);

function configurePersistence(store) {
  if (!testUtils.isRunningTests()) {
    return loadInitialState(store).then(() => {
      configureSubscriberToPersistStateChanges(store);
    });
  }
}

function configureSubscriberToPersistStateChanges(store) {
  const saveNewStatus = () => {
    const currentState = buzzStore.getState();
    saveState(currentState);
  };
  const persistStateThrottle = 1000;
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
        session: sessionReducer(state.session, action),
        camera: cameraReducer(state.camera, action)
      };
  }
}

function initializeFirebase() {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  };
  if (!testUtils.isRunningTests()) {
    firebase.initializeApp(config);
  }
}

export default buzzStore;
