import {
  PICTURE_UPLOADED,
  SAVE_TENTATIVE_PICTURE,
  UPLOAD_PICTURE
} from "./actions";

const initialState = {
  tentativePicture: undefined,
  uploadingPicture: false,
  lastPictureUploaded: undefined
};

export function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TENTATIVE_PICTURE:
      return Object.assign({}, state, {
        tentativePicture: action.base64Picture
      });
    case UPLOAD_PICTURE:
      return Object.assign({}, state, {
        uploadingPicture: true
      });
    case PICTURE_UPLOADED:
      return Object.assign({}, state, {
        uploadingPicture: false,
        tentativePicture: undefined,
        lastPictureUploaded: action.pictureUrl
      });
    default:
      return state;
  }
}
