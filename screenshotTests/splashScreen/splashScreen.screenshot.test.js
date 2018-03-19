import {
  compareScreenshot,
  startApp,
  stopApp,
  waitForInvisible,
  waitForVisible
} from "../../src/testUtils/spectron";

describe("SplashScreen screenshots", () => {
  beforeEach(async () => {
    await startApp();
  });

  afterEach(async () => {
    await stopApp();
  });

  it("shows the app logo on start", async () => {
    await waitForVisible("#logo");
    await compareScreenshot();
  });

  it("shows the progress bar after showing the application logo", async () => {
    await waitForInvisible("#logo");
    await waitForVisible("#progress");
    await compareScreenshot();
  });
});
