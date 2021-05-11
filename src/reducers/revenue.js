import produce from "immer";
import { PLUS_MONEY, MINUS_MONEY } from "../constants";

const initialState = {
  money: 0,
};

const revenue = (state = initialState, action) => {
  switch (action.type) {
    case PLUS_MONEY:
      return produce(state, (draft) => {
        draft.money += action.money;
      });
    case MINUS_MONEY:
      return produce(state, (draft) => {
        draft.money -= action.money;
      });
    default:
      return state;
  }
};

export default revenue;
