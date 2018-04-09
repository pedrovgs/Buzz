import { FETCH_PICTURES, PICTURES_LOADED, SELECT_PICTURE } from "./actions";

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
    default:
      return state;
  }
}
