import order from "./order";
import { ADD_ORDER } from "../constants/actionTypes";

describe("reducers", () => {
  describe("order", () => {
    const initialState = {
      sashimiOrder: {
        id: "",
        name: "",
      },
      wasabiOrder: 0,
    };

    it("should provide initial state", () => {
      expect(order(undefined, {})).toEqual(initialState);
    });

    it("should handle ADD_ORDER action", () => {
      expect(
        order(initialState, {
          type: ADD_ORDER,
          sashimi: {
            id: "egg",
            name: "계란",
          },
          wasabi: 50,
        })
      ).toEqual({
        sashimiOrder: {
          id: "egg",
          name: "계란",
        },
        wasabiOrder: 50,
      });
    });
  });
});
