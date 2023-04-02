import { USER_DATA, USER_LOGIN_ID } from "./action";

let initialState = {
  userData: {},
  userLoginId: "",
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };
    case USER_LOGIN_ID:
      return { ...state, userLoginId: action.payload };
    default:
      return state;
  }
};
