import axios from "axios";

//action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const STORE_CART = "STORE_CART";
const RETRIEVE_CART = "RETRIEVE_CART";
const RESET_CART = "RESET_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";

// action creators
const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

const removeFromCart = (product) => {
  return { type: REMOVE_FROM_CART, product };
};

const increaseQuantity = (qty) => {
  return { type: CHANGE_QUANTITY, qty };
};

//i;m not sure we need this one
const storeCart = (cart) => {
  return { type: STORE_CART, cart };
};

//i;m not sure we need this one
const retrieveCart = (cart) => {
  return { type: RETRIEVE_CART, cart };
};

// this should be called at checkout
const resetCart = (cart) => {
  return { type: RESET_CART, cart };
};

// thunk

// points to push route
export function addItem() {
  return async((dispatch) => {
    try {
      // const {data} = await axios()
    } catch (error) {
      console.log(error);
    }
  });
}

//delete route
export function removeItem() {}

// creating thunk to change quantity -> how will it know to ++ or -- ?
export function adjustQuantity() {}

//delete route -> do i need this one as well as the above?
export function clearCart() {}

// reducer

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return state.filter((product) => {
        product.id !== action.product.id;
      });
    case CHANGE_QUANTITY:
      return state.filter((product) => {
        product.id === action.product.id;
      }).quantity++;
    // case STORE_CART:
    // case RETRIEVE_CART:
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
}
