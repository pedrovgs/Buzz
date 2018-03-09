export function isRunningTests() {
  const runningTestEnvVar = process.env.REACT_APP_RUNNING_TESTS;
  return runningTestEnvVar ? Boolean(runningTestEnvVar) === true : false;
}
