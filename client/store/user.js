import axios from "axios";
const guest = {};
//action type
const GET_USER = "GET USER";

//action creator
const getUser = (user) => {
  type: GET_USER, user;
};

//thunk creator
export const me = () => async (dispatch) => {
  try {
    const { data } = axios.get("auth/me");
    dispatch(getUser(data || guest));
  } catch (err) {
    console.log(err);
  }
};
