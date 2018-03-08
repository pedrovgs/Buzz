export function isRunningTests() {
  const runningTestEnvVar = process.env.RUNNING_TESTS;
  return runningTestEnvVar ? runningTestEnvVar === true : false;
}
