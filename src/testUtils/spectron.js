import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Application } from "spectron";
import electron from "electron";
import path from "path";
import sharp from "sharp";

expect.extend({ toMatchImageSnapshot });

process.env.REACT_APP_RUNNING_TESTS = true;

let app;

export async function compareScreenshot() {
  await waitForReady();
  const screenshot = await app.browserWindow.capturePage();
  const resizedScreenshot = await sharp(screenshot)
    .resize(800, 600)
    .toBuffer();
  expect(resizedScreenshot).toMatchImageSnapshot();
}

export async function startApp() {
  app = new Application({
    path: electron,
    args: [path.join(__dirname, "..", "..", "electron-starter.js")],
    startTimeout: 3000
  });
  return app.start();
}

export async function stopApp() {
  if (app && app.isRunning()) {
    return app.stop();
  }
  return Promise.resolve();
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

export async function waitABit() {
  return app.client.pause(2000);
}

export async function getUrlLoaded() {
  return app.client.getUrl();
}

async function waitForReady() {
  return app.client.waitUntilWindowLoaded();
}
