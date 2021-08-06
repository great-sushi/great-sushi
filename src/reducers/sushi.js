import produce from "immer";

import {
  ADD_RICE,
  ADD_SASHIMI,
  ADD_WASABI,
  RESET_PLATE,
  ADD_WASABI_SIZE,
} from "../constants/actionTypes";

const initialState = {
  rice: {
    id: "",
    kind: "",
    link: "",
    price: null,
  },
  sashimi: {
    id: "",
    kind: "",
    link: "",
    price: 0,
  },
  wasabi : {
    id: "",
    kind: "",
    link: "",
    size: 0,
  },
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
        draft.wasabi = action.item;
      });
    case ADD_WASABI_SIZE:
      return produce(state, (draft) => {
        draft.wasabi.size += 10;
      });
    case RESET_PLATE:
      return initialState;
    default:
      return state;
  }
};

export default sushi;
