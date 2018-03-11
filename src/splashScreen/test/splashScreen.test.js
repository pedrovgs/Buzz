import {
  getWindowTitle,
  startApp,
  stopApp,
  waitForInvisible,
  waitForVisible,
  waitUntilUrlLoaded
} from "../../testUtils/spectron";

const logoSelector = "#logo";
const progressBarSelector = "#progress";
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
    await waitForVisible(logoSelector);
  });

  it("shows the progress bar after showing the application logo", async () => {
    await waitForVisible(logoSelector);
    await waitForVisible(progressBarSelector);
  });

  it("navigates to the log in screen if the user is not logged in after finishing the splash screen animation", async () => {
    await waitForLoadScreenLoaded();
    await waitUntilUrlLoaded("/logIn");
  });

  /*it("navigates to the album screen if the user is logged in after finishing the splash screen animation", async () => {
    //TODO: given the user is logged in
    await waitForLoadScreenLoaded();
    await waitUntilUrlLoaded("/album");
  });*/

  async function waitForLoadScreenLoaded() {
    await waitForVisible(progressBarSelector);
    await waitForInvisible(progressBarSelector);
  }
});
