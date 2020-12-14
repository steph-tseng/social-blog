import { toast } from "react-toastify";
import api from "../../apiService";
import * as types from "../constants/auth.constants";
import routeActions from "./route.actions";

// the middleware functions will be here

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post(`auth/login`, { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    toast.success(`Welcome ${res.data.data.user.name}`);
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
  }
};

const registerAccount = ({ avatarUrl, name, email, password }) => async (
  dispatch
) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post(`users`, {
      avatarUrl,
      name,
      email,
      password,
    });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect("/login"));
    toast.success(`Welcome ${res.data.data.user.name}`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: null });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = { loginRequest, registerAccount, logout, getCurrentUser };
export default authActions;
