const initState = {
  userInfo: {}
};

const SET_USER_INFO = "set user info";
const CLEAR_USER_INFO = "clear user info";

export function user(state = initState, action) {
  switch(action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case CLEAR_USER_INFO:
      return { ...state, userInfo: {} };
    default:
      return state;
  }
}

export function setUserInfo(data) {
  return { type: SET_USER_INFO, payload: data };
}

export function clearUserInfo() {
  return { type: CLEAR_USER_INFO };
}
