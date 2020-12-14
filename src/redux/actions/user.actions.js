import api from "../../apiService";
import * as types from "../constants/user.constants";

// the middleware functions will be here
const getCurrentUserInfo = () => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = api.get(`users/me`);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
    console.log("actions", res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: null });
  }
};

const userActions = { getCurrentUserInfo };
export default userActions;
