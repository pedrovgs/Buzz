import {
  startApp,
  stopApp,
  waitForVisible,
  open,
  compareScreenshot,
  setValue
} from "../../src/testUtils/spectron";
import { LOG_IN } from "../../src/app/routes";

const logoSelector = "#logo";
const signInFormSelector = "#signInForm";

describe("LogInScreen screenshots", () => {
  beforeEach(async () => {
    await startApp();
    await openLogInScreenAndWaitForReady();
  });

  afterEach(async () => {
    await stopApp();
  });

  it("shows the app logo and the google sign in button on start", async () => {
    await compareScreenshot();
  });

  it("fills the email field", async () => {
    await setEmail("pedro@gmail.com");
    await compareScreenshot();
  });

  it("fills the password field", async () => {
    await setPassword("pisum");
    await compareScreenshot();
  });

  it("fills the email and the password using a regular email and pass", async () => {
    await setEmail("pedro@gmail.com");
    await setPassword("pisum");
    await compareScreenshot();
  });

  it("fills the email and the password using a long email and a long password", async () => {
    await setEmail("pedrovicentegomezsanchez@anyemailservicewithlongname.com");
    await setPassword(
      "pisumpisumpisumpisumpisumpisumpisumpisumpisumpisumpisum"
    );
    await compareScreenshot();
  });

  async function openLogInScreenAndWaitForReady() {
    await open(LOG_IN);
    await waitForVisible(logoSelector);
    return waitForVisible(signInFormSelector);
  }

  async function setEmail(email) {
    return setValue("#emailField", email);
  }

  async function setPassword(password) {
    return setValue("#passwordField", password);
  }
});
