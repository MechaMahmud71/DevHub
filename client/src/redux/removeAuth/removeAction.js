import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./removeType";

import axios from "axios";

const getData = async dispatch => {
  try {
    const { data: { success } } = await axios.post(
      "/api/v1/user/logout"
    );
    await dispatch(fetchUserSuccess(success));
    localStorage.clear();

  } catch (error) {
    await dispatch(fetchUserFailure(error.message));
  }
};

export const logOutUser = () => {
  return dispatch => {
    dispatch(fetchUserRequest());

    getData(dispatch);
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};
export const fetchUserSuccess = success => {
  return {
    type: FETCH_USERS_SUCCESS,
    payLoad: success
  };
};
export const fetchUserFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payLoad: error
  };
};
