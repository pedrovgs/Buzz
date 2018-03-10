import {
  getUrlLoaded,
  getWindowTitle,
  startApp,
  stopApp,
  waitABit,
  waitForInvisible,
  waitForVisible
} from "../../testUtils/spectron";

describe("SplashScreen", () => {
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
  });

  it("shows the progress bar after showing the application logo", async () => {
    await waitForVisible("#logo");
    await waitForVisible("#progress");
  });

  it("navigates to the log in screen if the user is not logged in after finishing the splash screen animation", async () => {
    await waitForVisible("#progress");
    await waitForInvisible("#progress");
    await waitABit();
    const currentUrl = await getUrlLoaded();
    expect(currentUrl).toMatch("/logIn");
  });
});
