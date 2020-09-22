import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./removeType";

const initialState = {
  loading: true,
  success: true,
  error: ""
};

const removeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        success: action.payLoad,
        error: ""
      };
    case FETCH_USERS_FAILURE:
      return {

        loading: false,
        success: true,
        error: action.payLoad
      };
    default:
      return state;
  }
};

export default removeReducer;
