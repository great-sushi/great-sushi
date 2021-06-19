import {
  SHOW_MODAL,
  HIDE_MODAL,
} from "../constants/actionTypes";
import {
  COOKING_GUIDE_TEXT,
  EXIT,
  START,
} from "../constants/modal";
import modal from "./modal";

describe("reducers", () => {
  describe("modal", () => {
    const initialState = {
      isVisible: false,
      contentText: "",
      firstPath: "",
      secondPath: "",
      firstLinkButtonText: "",
      secondLinkButtonText: "",
      game: "",
    };

    it("should provide initial state", () => {
      expect(modal(undefined, {})).toEqual(initialState);
    });

    it("should handle SHOW_MODAL action", () => {
      expect(
        modal(initialState, {
          type: SHOW_MODAL,
          content: {
            isVisible: true,
            contentText: COOKING_GUIDE_TEXT,
            firstPath: "/",
            secondPath: "/cooking",
            firstLinkButtonText: EXIT,
            secondLinkButtonText: START,
            game: "sushi",
          },
        })
      ).toEqual({
        isVisible: true,
        contentText: COOKING_GUIDE_TEXT,
        firstPath: "/",
        secondPath: "/cooking",
        firstLinkButtonText: EXIT,
        secondLinkButtonText: START,
        game: "sushi",
      });
    });

    it("should handle HIDE_MODAL action", () => {
      expect(
        modal({
          isVisible: true,
          contentText: COOKING_GUIDE_TEXT,
          firstPath: "/",
          secondPath: "/cooking",
          firstLinkButtonText: EXIT,
          secondLinkButtonText: START,
          game: "sushi",
        }, {
          type: HIDE_MODAL,
        })
      ).toEqual(initialState);
    });
  });
});
