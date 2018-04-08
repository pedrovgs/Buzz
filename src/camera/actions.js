import { uploadBase64Image } from "../firebase/firebaseStorage";

export const SAVE_TENTATIVE_PICTURE = "SAVE_TENTATIVE_PICTURE";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PICTURE_UPLOADED = "PICTURE_UPLOADED";

export function saveTentativePicture(base64Picture) {
  return {
    type: SAVE_TENTATIVE_PICTURE,
    base64Picture: base64Picture
  };
}

export function uploadPicture(base64Picture) {
  return function(dispatch, getState) {
    dispatch({
      type: UPLOAD_PICTURE,
      base64Picture: base64Picture
    });
    const userEmail = getState().session.user.email;
    uploadBase64Image(userEmail, base64Picture).then(pictureUrl => {
      dispatch(pictureUploaded(pictureUrl));
    });
  };
}

export function pictureUploaded(pictureUrl) {
  return {
    type: PICTURE_UPLOADED,
    pictureUrl: pictureUrl
  };
}
