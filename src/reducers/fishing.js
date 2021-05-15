import produce from "immer";

const initialState = {
  request: {},
  fish: [],
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
    default:
      return state;
  }

};

export default fishing;
