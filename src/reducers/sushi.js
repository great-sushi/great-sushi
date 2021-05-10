import produce from "immer";
import {
  ADD_RICE,
  ADD_SASHIMI,
  ADD_WASABI,
  RESET_PLATE,
} from "../constants";

const initialState = {
  rice: {
    id: "",
    kind: "",
  },
  sashimi: {
    id: "",
    kind: "",
  },
  wasabis: [],
};

const sushi = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RICE:
      return produce(state, (draft) => {
        draft.rice = action.item;
      })
    case ADD_SASHIMI:
      return produce(state, (draft) => {
        draft.sashimi = action.item;
      });
    case ADD_WASABI:
      return produce(state, (draft) => {
        draft.wasabis.push(action.item);
      });
    case RESET_PLATE:
      return initialState;
    default:
      return state;
  }
};

export default sushi;
