import axios from "axios";

//action type
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

//action creators
const getSingleProduct = (singleProduct) => {
  return {
    type: GET_SINGLE_PRODUCT,
    singleProduct,
  };
};

//thunk creator
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/pokemon/${id}`);
      dispatch(getSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//sub reducer
export default function singleProductReducer(state = [], action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}
