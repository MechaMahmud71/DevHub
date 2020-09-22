import {
  FETCH_EDUCATION_REQUEST,
  FETCH_EDUCATION_SUCCESS,
  FETCH_EDUCATION_FAILURE
} from "./educationType";

import axios from "axios";

const getEducationData = async (dispatch, id) => {
  try {
    const { data: { data } } = await axios.get(`/api/v1/profile/${id}/geteducations`);
    // console.log(data);
    await dispatch(fetchEducationSuccess(data));

  } catch (error) {
    await dispatch(fetchEducationFailure(error.message));
  }
};

export const getEducation = (id) => {
  return dispatch => {
    dispatch(fetchEducationRequest());

    getEducationData(dispatch, id);
  };
};

export const fetchEducationRequest = () => {
  return {
    type: FETCH_EDUCATION_REQUEST,
    loading: true,
  };
};
export const fetchEducationSuccess = education => {
  return {
    type: FETCH_EDUCATION_SUCCESS,
    payLoad: education,
    loading: false
  };
};
export const fetchEducationFailure = error => {
  return {
    type: FETCH_EDUCATION_FAILURE,
    payLoad: error,
    loading: false
  };
};
