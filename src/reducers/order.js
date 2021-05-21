import produce from "immer";
import { ADD_ORDER } from "../constants";

const initialState = {
  sashimiOrder: {
    id: "",
    name: "",
    link: "",
  },
  wasabiOrder: 0,
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return produce(state, (draft) => {
        draft.sashimiOrder = action.sashimi;
        draft.wasabiOrder = action.wasabi;
      });
    default:
      return state;
  }
};

export default order;
