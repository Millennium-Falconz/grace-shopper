import axios from "axios";
import getAuthHeaderWithToken from "./helpers";

//action types
const RETRIEVE_CART = "RETRIEVE_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const STORE_CART = "STORE_CART";

const RESET_CART = "RESET_CART";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";

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

const changeQuantity = (qty) => {
  return { type: CHANGE_QUANTITY, qty };
};

//i;m not sure we need this one
const storeCart = (cart) => {
  return { type: STORE_CART, cart };
};

// this should be called at checkout
const resetCart = (cart) => {
  return { type: RESET_CART, cart };
};

// thunk
// NOT FINISHED - MISSING DISPATCH CALL
export const getCart = () => async (dispatch) => {
  try {
    const headers = getAuthHeaderWithToken();
    const { data } = await axios.get('/api/cart', headers);
    dispatch(retrieveCart(data));
    console.log('data!', data)
  } catch (err) {
    console.log(err);
  }
};

export function addItem( productId) {
  return async (dispatch) => {
    // console.log("in the thunk ", pokemon, cart);
    // console.log("what are you: ", Object.values(pokemon));
    try {
      //if the cart is not empty
      // if (cart.includes(pokemon.id)) {
      //   //put route - if the cart isn't empty, edit existing order
      //   const { data } = await axios.put("/api/cart", pokemon);
      //   dispatch(changeQuantity(data));
      // } else
      //post route - if the cart is empty create new order and add item
      // console.log("pokemon", pokemon);
      const headers = getAuthHeaderWithToken();
      console.log('headers', headers)
      const { data } = await axios.post(`/api/cart/${productId}`,{}, headers);
      // console.log('DATA >>>>>',data)
      dispatch(addToCart(data));
      console.log('state', state)
    } catch (error) {
      console.log(error);
    }
  };
}

//delete route
export function removeItem() {}

// creating thunk to change quantity -> how will it know to ++ or -- ?
export function adjustQuantity() {}

//delete route -> do i need this one as well as the above?
export function clearCart() {}

// reducer

const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_CART:
      return action.cart ;
    case ADD_TO_CART:
      return {...state, cart:action.orderItems};
    case REMOVE_FROM_CART:
      return state.filter((product) => {
        product.id !== action.product.id;
      });
    case CHANGE_QUANTITY:
      //QUESTIONABLE
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
