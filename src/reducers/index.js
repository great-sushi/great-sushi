import { combineReducers } from "redux";
import sushi from "./sushi";
import order from "./order";

const reducers = combineReducers({
  sushi,
  order,
});

export default reducers;
