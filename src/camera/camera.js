import { SAVE_TENTATIVE_PICTURE } from "./actions";

const initialState = {
  tentativePicture: undefined
};

export function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TENTATIVE_PICTURE:
      return Object.assign({}, state, {
        tentativePicture: action.base64Picture
      });
    default:
      return state;
  }
}
