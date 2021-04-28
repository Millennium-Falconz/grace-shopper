import axios from 'axios';
import getAuthHeaderWithToken from './helpers';
import history from '../history';

//action types
const RETRIEVE_CART = 'RETRIEVE_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const STORE_CART = 'STORE_CART';

const RESET_CART = 'RESET_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';


// action creators

const retrieveCart = (cart) => {
  return { type: RETRIEVE_CART, cart };
};

const addToCart = (orderItems) => {
  return { type: ADD_TO_CART, orderItems };
};

const removeFromCart = (product) => {
  return { type: REMOVE_FROM_CART, product };
};

const increaseQuantity = (orderItem) => {
  return { type: INCREASE_QUANTITY, orderItem };
};

const decreaseQuantity = (orderItem) => {
  return { type: DECREASE_QUANTITY, orderItem };
};

//i;m not sure we need this one
const storeCart = (cart) => {
  return { type: STORE_CART, cart };
};

// this should be called at checkout
const resetCart = () => {
  return { type: RESET_CART };
};

// thunk

export const getCart = () => async (dispatch) => {
  console.log('GET CART');
  try {
    const headers = getAuthHeaderWithToken();
    const { data } = await axios.get('/api/cart', headers);
    dispatch(retrieveCart(data));
    console.log('data!', data);
  } catch (err) {
    console.log(err);
  }
};

export function addItem(productId) {
  return async (dispatch) => {
    try {
      const headers = getAuthHeaderWithToken();
      const { data } = await axios.post(`/api/cart/${productId}`, {}, headers);
      dispatch(addToCart(data));
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  };
}

//delete route
export function removeItem(productId, orderId) {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${productId}/${orderId}`);
      return dispatch(getCart());
    } catch (err) {
      console.log(err);
    }
  };
}

// creating thunk to change quantity -> how will it know to ++ or -- ?
export function incrementQty(productId, orderId) { 
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart/${productId}/${orderId}/plus`);
      return dispatch(increaseQuantity(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function decrementQty(productId, orderId) { 
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart/${productId}/${orderId}/minus`);
      console.log('decrease data: ', data)
      return dispatch(decreaseQuantity(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function clearCart(orderId) {
  console.log('CLEAR CART');
  return async (dispatch) => {
    try {
      console.log('HERE??');
      await axios.get(`/api/cart/${orderId}`);
      console.log('DO WE EVEN GET HERE?');
      dispatch(resetCart());
      dispatch(getCart());
      // // force get new cart data
      // console.log('force fetch');
      // const headers = getAuthHeaderWithToken();
      // const { data } = await axios.get('/api/cart', headers);
      // dispatch(retrieveCart(data));
      // // console.log('data!', data);
    } catch (err) {
      console.log('ERROR WITH NO ERROR???');
      console.log(err);
    }
  };
}

// reducer

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_CART:
      return action.cart;
    case ADD_TO_CART:
      console.log('action.orderItems', action.orderItems)
      return { ...state, cart: action.orderItems };
    case REMOVE_FROM_CART:
      return state.filter((product) => {
        product.id !== action.product.id;
      });
    case INCREASE_QUANTITY:
      return {...state, cart: action.orderItems +1};
    case DECREASE_QUANTITY:
        return {...state, cart: action.orderItems -1};
    // case STORE_CART:
    // case RETRIEVE_CART:
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
}
