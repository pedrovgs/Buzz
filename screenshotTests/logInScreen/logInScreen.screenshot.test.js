import {
  startApp,
  stopApp,
  waitForVisible,
  open,
  compareScreenshot
} from "../../src/testUtils/spectron";
import { LOG_IN } from "../../src/app/routes";

const logoSelector = "#logo";
const signInFormSelector = "#signInForm";

describe("LogInScreen screenshots", () => {
  beforeEach(async () => {
    await startApp();
  });

  afterEach(async () => {
    await stopApp();
  });

  it("shows the app logo and the google sign in button on start", async () => {
    await open(LOG_IN);
    await waitForVisible(logoSelector);
    await waitForVisible(signInFormSelector);
    await compareScreenshot();
  });
});
