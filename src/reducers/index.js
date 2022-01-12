import { combineReducers } from "redux";
import cart from "./cart";
import currency from "./currency";
import header_active_item from "./headerActiveItem";

const rootReducer = combineReducers({
  cart,
  currency,
  header_active_item,
});

export default rootReducer;
