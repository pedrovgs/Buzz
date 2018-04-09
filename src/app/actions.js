export const RESET_STATE = "RESET_STATE";

export function resetState(state = {}) {
  return {
    type: RESET_STATE,
    state: state
  };
}
