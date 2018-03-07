const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");
const app = new Application({
  path: electronPath,
  args: [path.join(".")]
});

export default app;
