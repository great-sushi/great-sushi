import { combineReducers } from "redux";
import sushi from "./sushi";
import order from "./order";
import revenue from "./revenue";

const reducers = combineReducers({
  sushi,
  order,
  revenue,
});

export default reducers;
