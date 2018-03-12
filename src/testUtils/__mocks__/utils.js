let runningTests = false;

function isRunningTests() {
  return runningTests;
}

function __configureEnvironmentAsRunningTests(running) {
  runningTests = running;
}

export default {
  __configureEnvironmentAsRunningTests: __configureEnvironmentAsRunningTests,
  isRunningTests: isRunningTests
};
