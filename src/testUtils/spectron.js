import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Application } from "spectron";
import electron from "electron";
import path from "path";

expect.extend({ toMatchImageSnapshot });

export function compareScreenshot(app) {
  return waitForReady(app)
    .browserWindow.capturePage()
    .then(image => {
      expect(image).toMatchImageSnapshot();
    });
}

export function startApp() {
  const app = new Application({
    path: electron,
    args: [path.join(__dirname, "..", "..", "electron-starter.js")],
    startTimeout: 3000
  });
  return app.start();
}

function waitForReady(app) {
  return app.client.waitUntilWindowLoaded();
}
