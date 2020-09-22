import {
  FETCH_EDUCATION_REQUEST,
  FETCH_EDUCATION_SUCCESS,
  FETCH_EDUCATION_FAILURE
} from "./educationType";

const initialState = {
  loading: true,
  education: [],
  error: ""
};

const educationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_EDUCATION_SUCCESS:
      return {
        loading: false,
        education: action.payLoad,
        error: ""
      };
    case FETCH_EDUCATION_FAILURE:
      return {
        loading: false,
        education: [],
        error: action.payLoad
      };
    default:
      return state;
  }
};

export default educationReducer;