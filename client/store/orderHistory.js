import axios from "axios";

//action type
const GET_ORDER_HISTORY = "GET_ORDER_HISTORY";

//action creator

export const gotOrderHistory = (orderHistory) => ({
  type: GET_ORDER_HISTORY,
  orderHistory,
});

//thunk
export const getOrderHistory = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/users/order-history");
    dispatch(gotOrderHistory(data));
  } catch (err) {
    console.log(err);
  }
};

//state
const initialState = {
  orderHistory: [],
  orderHistoryItem: {},
};

// sub reducer
const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return { ...state, orderHistory: action.orderHistory };
    default:
      return state;
  }
};

export default orderHistoryReducer;
