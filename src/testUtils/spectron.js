import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Application } from "spectron";
import electron from "electron";
import path from "path";

expect.extend({ toMatchImageSnapshot });

process.env.REACT_APP_RUNNING_TESTS = true;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

let app;

export async function compareScreenshot() {
  await waitForReady();
  const screenshot = await app.client.saveScreenshot();
  expect(screenshot).toMatchImageSnapshot();
}

export async function startApp() {
  app = new Application({
    path: electron,
    args: [path.join(__dirname, "..", "..", "electron-starter.js")],
    startTimeout: 3000
  });
  return app.start().then(() => {
    return waitForReady()
      .then(() => {
        return app.client.waitUntil(() => {
          return app.client
            .execute(() => {
              return window.store;
            })
            .then(store => {
              return typeof store !== "undefined";
            });
        });
      })
      .then(() => {
        return resetAppState();
      })
      .then(() => {
        return app;
      });
  });
}

export async function stopApp() {
  return resetAppState().then(() => {
    if (app) {
      return app.stop();
    } else {
      return Promise.resolve();
    }
  });
}

export async function getWindowTitle() {
  return app.client.getTitle();
}

export async function waitForVisible(selector) {
  return app.client.waitForVisible(selector);
}

export async function waitForInvisible(selector) {
  return app.client.waitForVisible(selector, true);
}

export async function waitASec() {
  return app.client.pause(1000);
}

export async function getUrlLoaded() {
  return app.client.getUrl();
}

export async function waitUntilUrlLoaded(expectedUrl) {
  return app.client.waitUntil(() => {
    return app.client.getUrl().then(url => {
      return url.endsWith(expectedUrl);
    });
  });
}

export function getClient() {
  return app.client;
}

export async function setAppState(state) {
  return getClient().execute(newState => {
    const action = {
      type: "RESET_STATE",
      state: newState
    };
    window.store.dispatch(action);
    return window.store.getState();
  }, state);
}

export async function resetAppState() {
  return setAppState({});
}

async function waitForReady() {
  return app.client.waitUntilWindowLoaded();
}
