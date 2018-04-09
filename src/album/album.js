import {
  DELETE_PICTURE,
  FETCH_PICTURES,
  PICTURES_LOADED,
  SELECT_PICTURE
} from "./actions";

const initialState = {
  fetchingPictures: false,
  pictures: []
};

export function albumReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PICTURES:
      return Object.assign({}, state, {
        fetchingPictures: true
      });
    case PICTURES_LOADED:
      return Object.assign({}, state, {
        fetchingPictures: false,
        pictures: action.pictures
      });
    case SELECT_PICTURE:
      return Object.assign({}, state, {
        selectedPicture: action.pictureSelected
      });
    case DELETE_PICTURE:
      return Object.assign({}, state, {
        selectedPicture: newSelectedPicture(
          state.pictures,
          action.pictureToDelete
        ),
        pictures: state.pictures.filter(
          picture => picture.id !== action.pictureToDelete.id
        )
      });
    default:
      return state;
  }
}

function newSelectedPicture(pictures, pictureToDelete) {
  if (pictures.length === 1) {
    return undefined;
  } else {
    const newSelectedPictureIndex = Math.max(
      0,
      pictures.indexOf(pictureToDelete) - 1
    );
    return pictures[newSelectedPictureIndex];
  }
}
