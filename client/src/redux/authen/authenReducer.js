import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./authentType";

const initialState = {
  loading: true,
  success: false,
  user: {}
};

const authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        success: action.payLoadSuccess,
        user: action.payLoadUser,
        error: ""
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        success: false,
        user: {},
        error: action.payLoad
      };
    default:
      return state;
  }
};

export default authenReducer;
