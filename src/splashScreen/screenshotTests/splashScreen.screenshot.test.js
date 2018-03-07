import app from "../../testUtils/spectron";

const { toMatchImageSnapshot } = require("jest-image-snapshot");
expect.extend({ toMatchImageSnapshot });

describe("SplashScreen", () => {
  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it("shows the app name as title", async () => {
    const title = await app.client.getTitle();
    expect(title).toEqual("Buzz");
  });

  it("shows the app logo on start", async () => {
    await app.browserWindow.isVisible();
    await app.client.waitUntilWindowLoaded();
    const image = await app.browserWindow.capturePage();
    expect(image).toMatchImageSnapshot();
  });
});
