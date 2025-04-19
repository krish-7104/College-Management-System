import { USER_DATA, USER_TOKEN } from "./action";

let initialState = {
  userData: {},
  userToken: "",
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };
    case USER_TOKEN:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
};
