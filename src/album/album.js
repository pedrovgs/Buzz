import { FETCH_PICTURES, PICTURES_LOADED } from "./actions";

const initialState = {
  fetchingPictures: false,
  pictures: undefined
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
    default:
      return state;
  }
}
