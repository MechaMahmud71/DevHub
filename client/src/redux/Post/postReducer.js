import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE
} from "./postType";

const initialState = {
  loading: true,
  post: [],
  error: ""
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_POST_SUCCESS:
      return {
        loading: false,
        post: action.payLoad,
        error: ""
      };
    case FETCH_POST_FAILURE:
      return {
        loading: false,
        post: [],
        error: action.payLoad
      };
    default:
      return state;
  }
};

export default postReducer;
