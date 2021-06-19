import { combineReducers } from "redux";

import fishing from "./fishing";
import modal from "./modal";
import order from "./order";
import sushi from "./sushi";

const reducers = combineReducers({
  sushi,
  order,
  fishing,
  modal,
});

export default reducers;
