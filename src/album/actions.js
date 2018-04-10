import { getPicturesByFolder } from "../firebase/firebaseStorage";
import { getFolderId } from "../session/session";
import testUtils from "../testUtils/utils";
import { deletePictureFromFolder } from "../firebase/firebaseStorage";

export const FETCH_PICTURES = "FETCH_PICTURES";
export const PICTURES_LOADED = "PICTURES_LOADED";
export const SELECT_PICTURE = "SELECT_PICTURE";
export const DELETE_PICTURE = "DELETE_PICTURE";
export const DELETING_PICTURE = "DELETING_PICTURE";

export function fetchPictures() {
  return function(dispatch, getState) {
    if (!testUtils.isRunningTests()) {
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
    }
  };
}

export function selectPicture(pictureSelected) {
  return {
    type: SELECT_PICTURE,
    pictureSelected: pictureSelected
  };
}

export function deletePicture(pictureToDelete) {
  return function(dispatch, getState) {
    const folderId = getFolderId(getState());
    dispatch({
      type: DELETING_PICTURE
    });
    deletePictureFromFolder(folderId, pictureToDelete.id).then(() => {
      dispatch({
        type: DELETE_PICTURE,
        pictureToDelete: pictureToDelete
      });
    });
  };
}
