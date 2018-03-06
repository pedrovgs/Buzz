import app from "../../testUtils/spectron";

describe("SplashScreen", () => {
  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it("shows the app name as title", async () => {
    const title = await app.client.getTitle();
    return expect(title).toEqual("Buzz");
  });
});
