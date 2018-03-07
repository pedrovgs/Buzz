import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Application } from "spectron";
import electron from "electron";
import path from "path";

expect.extend({ toMatchImageSnapshot });

export async function compareScreenshot(app) {
  await waitForAppReady(app);
  const image = await app.browserWindow.capturePage();
  expect(image).toMatchImageSnapshot();
}

export async function waitForAppReady(app) {
  await app.client.waitUntilWindowLoaded();
  await app.browserWindow.isVisible();
}

export async function startApp() {
  const app = new Application({
    path: electron,
    args: [path.join(__dirname, "..", "..", "electron-starter.js")],
    startTimeout: 3000
  });
  return app.start();
}

export function runningTests() {
  const runningTestEnvVar = process.env.RUNNING_TESTS;
  return runningTestEnvVar ? runningTestEnvVar === true : false;
}
