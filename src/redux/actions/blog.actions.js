import * as types from "../constants/blog.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "./route.actions";

const blogsRequest = (pagenum, query, sortBy, ascending, searchBy) => async (
  dispatch
) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(
      `blogs?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i&sortBy[${sortBy}]=${ascending}`
    );
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: null });
    toast.error(error.message);
  }
};

const getSelctedBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_SELECTED_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`blogs/${blogId}`);
    dispatch({ type: types.GET_SELECTED_BLOG_SUCCESS, payload: res.data.data });
    // console.log(res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_SELECTED_BLOG_FAILURE, payload: null });
    toast.error(error);
  }
};

const createReview = (reviewText, blogId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`reviews/blogs/${blogId}`, {
      content: reviewText,
    });
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: null });
    toast.error(error);
  }
};

const postEmoji = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`reactions`, { targetType, targetId, emoji });
    if (targetType === "Blog") {
      dispatch({
        type: types.BLOG_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
    toast.error(error);
  }
};

const createNewBlog = (
  title,
  content,
  images,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.post("/blogs", { title, content, images });
    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("New blog has been created!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (
  title,
  content,
  images,
  blogId,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    const res = api.put(`blogs/${blogId}`, {
      title,
      content,
      images,
    });
    dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blogId, redirectTo = "__GO_BACK__") => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.delete(`blogs/${blogId}`);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
  }
};

const blogActions = {
  blogsRequest,
  getSelctedBlog,
  createReview,
  postEmoji,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
export default blogActions;
