import { getPicturesByFolder } from "../firebase/firebaseStorage";
import { getFolderId } from "../session/session";

export const FETCH_PICTURES = "FETCH_PICTURES";
export const PICTURES_LOADED = "PICTURES_LOADED";

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
