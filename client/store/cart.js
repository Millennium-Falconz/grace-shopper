import axios from "axios";

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

const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
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
export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/cart");
  } catch (err) {
    console.log(err);
  }
};

export function addItem(pokemonId) {
  return async (dispatch) => {
    try {
      if (pokemonId) {
        //put route
        const { data } = await axios.put("/api/cart", pokemonId);
        dispatch(changeQuantity(data));
      } else {
        //post route
        const { data } = await axios.post("/api/cart", pokemonId);
        dispatch(addToCart(data));
      }
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

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_CART:
      return { ...state, cart: action.cart };
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
