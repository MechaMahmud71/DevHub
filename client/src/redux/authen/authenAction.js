import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from "./authentType";

import axios from "axios";

const postData = async (dispatch, formData, type) => {
  try {
    if (type === "signin") {
      const { data: { success, data, token } } = await axios.post("/api/v1/user/login", formData);
      await dispatch(fetchUserSuccess(success, data));


      localStorage.setItem('userID', data._id)



    }
    else if (type === "signup") {
      const { data: { success, data } } = await axios.post("/api/v1/user/regestration", formData);
      await dispatch(fetchUserSuccess(success, data));
      localStorage.setItem('userID', data._id);


      // console.log(data);
    }


  } catch (error) {
    await dispatch(fetchUserFailure(error.message));
  }
};

export const fetchUser = (formData, type) => {
  return dispatch => {
    dispatch(fetchUserRequest());

    postData(dispatch, formData, type);
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};
export const fetchUserSuccess = (success, user) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payLoadSuccess: success,
    payLoadUser: user
  };
};
export const fetchUserFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payLoad: error
  };
};

