import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const STORE_CART = 'STORE_CART';
const RETRIEVE_CART = 'RETRIEVE_CART';
const RESET_CART = 'RESET_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

// action creators
const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

const removeFromCart = (product) => {
  return { type: REMOVE_FROM_CART, product };
};

const changeQuantity = (qty) => {
  return { type: CHANGE_QUANTITY, qty };
};

const storeCart = (cart) => {
  return { type: STORE_CART, cart };
};

const retrieveCart = (cart) => {
  return { type: RETRIEVE_CART, cart };
};

const resetCart = (cart) => {
  return { type: RESET_CART, cart };
};

// reducer

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return state.filter((product) => {
        product.id !== action.product.id;
      });
    case CHANGE_QUANTITY:
    case STORE_CART:
    case RETRIEVE_CART:
    case RESET_CART:
  }
};
