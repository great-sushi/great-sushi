import produce from "immer";

const initialState = {
  request: {},
};

const fishing = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return produce(state, (draft) => {
        draft.request = action.request;
      });
    default:
      return state;
  }

};

export default fishing;
