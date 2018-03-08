import { compareScreenshot, startApp } from "../../testUtils/spectron";

let app;

describe("SplashScreen", () => {
  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async () => {
    if (app.isRunning()) {
      await app.stop();
    }
  });

  it("shows the app title on start", async () => {
    const title = app.browserWindow.getTitle();
    expect(title).toEqual("Buzz");
  });

  it("shows the app logo on start", async () => {
    await compareScreenshot(app);
  });

  it("shows the progress bar after showing the application logo", async () => {
    await app.client.waitForVisible("#progress");
    await compareScreenshot(app);
  });
});
