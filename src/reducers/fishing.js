import produce from "immer";

const initialState = {
  request: {
    tuna: 1,
    salmon: 1,
    eel: 1,
    shrimp: 1,
    octopus: 1,
  },
  fish: [],
  isCompleted: false,
};

const fishing = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return produce(state, (draft) => {
        draft.request = action.request;
      });
    case "CATCH_FISH":
      return produce(state, (draft) => {
        draft.fish.push(action.fish);
      });
    case "COMPLETE_REQUEST":
      return produce(state, (draft) => {
        draft.isCompleted = true;
      });
    case "CLEAR_FISH":
      return initialState;
    default:
      return state;
  }

};

export default fishing;
