import {
  compareScreenshot,
  getWindowTitle,
  startApp,
  stopApp,
  waitForVisible
} from "../../src/testUtils/spectron";

describe("SplashScreen screenshots", () => {
  beforeEach(async () => {
    await startApp();
  });

  afterEach(async () => {
    await stopApp();
  });

  it("shows the app title on start", async () => {
    const title = await getWindowTitle();
    expect(title).toEqual("Buzz");
  });

  it("shows the app logo on start", async () => {
    await waitForVisible("#logo");
    await compareScreenshot();
  });

  it("shows the progress bar after showing the application logo", async () => {
    await waitForVisible("#progress");
    await compareScreenshot();
  });

});
