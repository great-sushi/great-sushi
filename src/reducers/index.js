import { combineReducers } from "redux";
import sushi from "./sushi";
import order from "./order";
import revenue from "./revenue";
import fishing from "./fishing";

const reducers = combineReducers({
  sushi,
  order,
  revenue,
  fishing,
});

export default reducers;
