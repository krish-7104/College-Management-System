import { USER_DATA, USER_TOKEN } from "./action";

export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});

export const setUserToken = (data) => ({
  type: USER_TOKEN,
  payload: data,
});
