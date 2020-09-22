import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE
} from "./postType";

import axios from "axios";

const getPostData = async dispatch => {
  try {
    const { data: { data } } = await axios.get(`/api/v1/post`);
    await dispatch(fetchPostSuccess(data));
    //console.log(data);
  } catch (error) {
    await dispatch(fetchPostFailure(error.message));
  }
};

export const getPosts = () => {
  return dispatch => {
    dispatch(fetchPostRequest());

    getPostData(dispatch);
  };
};

export const fetchPostRequest = () => {
  return {
    type: FETCH_POST_REQUEST,
    loading: true,
  };
};
export const fetchPostSuccess = post => {
  return {
    type: FETCH_POST_SUCCESS,
    payLoad: post,
    loading: false
  };
};
export const fetchPostFailure = error => {
  return {
    type: FETCH_POST_FAILURE,
    payLoad: error,
    loading: false
  };
};
