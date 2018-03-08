export function runningTests() {
  const runningTestEnvVar = process.env.RUNNING_TESTS;
  return runningTestEnvVar ? runningTestEnvVar === true : false;
}
