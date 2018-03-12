import store from "store";

const stateKey = "state";

export async function loadState() {
  return new Promise(resolve => {
    const savedState = store.get(stateKey) || {};
    return resolve(savedState);
  });
}

export function saveState(state) {
  return new Promise(resolve => {
    store.set(stateKey, state);
    return resolve(state);
  });
}

export async function reset() {
  return new Promise(resolve => {
    store.remove(stateKey);
    resolve();
  });
}
