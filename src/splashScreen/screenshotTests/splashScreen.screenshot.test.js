import { compareScreenshot, startApp } from "../../testUtils/spectron";

let app;

describe("SplashScreen", () => {
  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async () => {
    await app.stop();
  });

  it("shows the app logo on start", async () => {
    await compareScreenshot(app);
  });
});
