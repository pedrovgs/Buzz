import firebase from "firebase";
import moment from "moment";

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
    const storageRef = firebase.storage().ref();
    const timestamp = moment().valueOf();
    const fileExtension = "jpg";
    const childRef = storageRef.child(
      `${userEmail}/${timestamp}.${fileExtension}`
    );
    childRef.putString(base64Picture, "data_url").then(() => {
      childRef.getDownloadURL().then(resourceUrl => {
        const pictureUrl =
          resourceUrl.substring(
            0,
            resourceUrl.indexOf(fileExtension) + fileExtension.length
          ) + "?alt=media";
        dispatch(pictureUploaded(pictureUrl));
      });
    });
  };
}

export function pictureUploaded(pictureUrl) {
  return {
    type: PICTURE_UPLOADED,
    pictureUrl: pictureUrl
  };
}
