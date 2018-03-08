import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Application } from "spectron";
import electron from "electron";
import path from "path";

expect.extend({ toMatchImageSnapshot });

export async function compareScreenshot(app) {
  await waitForReady(app);
  const image = await app.browserWindow.capturePage();
  expect(image).toMatchImageSnapshot();
}

export async function startApp() {
  const app = new Application({
    path: electron,
    args: [path.join(__dirname, "..", "..", "electron-starter.js")],
    startTimeout: 3000
  });
  await app.start();
  return waitForReady(app).then(() => app);
}

function waitForReady(app) {
  return app.client.waitUntilWindowLoaded();
}
