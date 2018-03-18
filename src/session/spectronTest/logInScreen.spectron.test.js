import {
  startApp,
  stopApp,
  waitForVisible,
  setAppState,
  open,
  waitUntilUrlLoaded
} from "../../testUtils/spectron";
import { loggedInState } from "../../testUtils/status/session";
import { ALBUM, LOG_IN } from "../../app/routes";

const logoSelector = "#logo";
const googleSingInButtonSelector = "#googleSingInButton";

describe("LogInScreen", () => {
  beforeEach(async () => {
    await startApp();
  });

  afterEach(async () => {
    await stopApp();
  });

  it("shows the app logo and the google sign in button on start", async () => {
    await open(LOG_IN);
    await waitForVisible(logoSelector);
    await waitForVisible(googleSingInButtonSelector);
  });

  it("redirects the user to the album screen if the user is already logged", async () => {
    await open(LOG_IN);
    await givenTheUserIsLoggedIn();
    await waitUntilUrlLoaded(ALBUM);
  });

  async function givenTheUserIsLoggedIn() {
    return setAppState(loggedInState);
  }
});
