import * as types from "../constants/user.constants";
const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, selectedUser: payload, loading: false };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
