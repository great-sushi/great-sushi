import { combineReducers } from "redux";
import sushi from "./sushi";
import order from "./order";
import revenue from "./revenue";
import fishing from "./fishing";
import modal from "./modal";

const reducers = combineReducers({
  sushi,
  order,
  revenue,
  fishing,
  modal,
});

export default reducers;
