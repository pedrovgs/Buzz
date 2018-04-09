import { getPicturesByFolder } from "../firebase/firebaseStorage";
import { getFolderId } from "../session/session";

export const FETCH_PICTURES = "FETCH_PICTURES";
export const PICTURES_LOADED = "PICTURES_LOADED";
export const SELECT_PICTURE = "SELECT_PICTURE";

export function fetchPictures() {
  return function(dispatch, getState) {
    const folderId = getFolderId(getState());
    if (folderId) {
      dispatch({
        type: FETCH_PICTURES,
        folder: folderId
      });
      getPicturesByFolder(folderId).then(pictures => {
        dispatch({
          type: PICTURES_LOADED,
          pictures: pictures
        });
      });
    }
  };
}

export function selectPicture(pictureSelected) {
  return {
    type: SELECT_PICTURE,
    pictureSelected: pictureSelected
  };
}
