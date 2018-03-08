import {
  compareScreenshot,
  startApp,
  waitForAppReady
} from "../../testUtils/spectron";

let app;

describe("SplashScreen", () => {
  beforeEach(async () => {
    app = await startApp();
    waitForAppReady(app);
  });

  afterEach(async () => {
    if (app.isRunning()) {
      await app.stop();
    }
  });

  it("shows the app logo on start", async () => {
    const title = await app.browserWindow.getTitle();
    expect(title).toEqual("Buzz");
  });

  it("shows the app logo on start", async () => {
    await compareScreenshot(app);
  });

  it("shows the progress bar after showing the application logo", async () => {
    await app.client.waitForVisible(".progress");
    //TODO We need to use webdriver io here with the app.client variable.
    await compareScreenshot(app);
  });
});
