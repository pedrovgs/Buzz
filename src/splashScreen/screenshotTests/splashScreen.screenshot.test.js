import { compareScreenshot, startApp } from "../../testUtils/spectron";

let app;

describe("SplashScreen", () => {
  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop();
    }
  });

  it("shows the app title on start", async () => {
    const title = await app.client.getTitle();
    expect(title).toEqual("Buzz");
  });

  it("shows the app logo on start", () => {
    return app.client
      .waitForVisible("#logo")
      .then(() => compareScreenshot(app));
  });

  it("shows the progress bar after showing the application logo", async () => {
    return app.client
      .waitForVisible("#progress")
      .then(() => compareScreenshot(app));
  });

  it("navigates to the log in screen if the user is not logged in after finishing the splash screen animation", async () => {
    await app.client.waitForVisible("#progress");
    await app.client.waitForVisible("#progress", false);
    await app.client.pause(2000);
    const currentUrl = await app.client.getUrl();
    expect(currentUrl).toMatch("/logIn");
  });
});
