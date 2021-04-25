import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./allproducts";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import orderHistoryReducer from "./orderHistory";

const reducer = combineReducers({
  auth,
  pokemon: productsReducer,
  singlePokemon: singleProductReducer,
  cart: cartReducer,
  orderHistory: orderHistoryReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
