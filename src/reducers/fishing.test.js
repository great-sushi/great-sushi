import {
  UPDATE_REQUEST,
  CATCH_FISH,
  COMPLETE_REQUEST,
  CLEAR_NET,
} from "../constants/actionTypes";
import fishing from "./fishing";

describe("reducers", () => {
  describe("fishing", () => {
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

    it("should provide initial state", () => {
      expect(fishing(undefined, {})).toEqual(initialState);
    });

    it("should handle UPDATE_REQUEST action", () => {
      expect(
        fishing(initialState, {
          type: UPDATE_REQUEST,
          request: {
            tuna: 1,
            salmon: 1,
            eel: 1,
            shrimp: 1,
            octopus: 1,
          },
        })
      ).toEqual({
        request: {
          tuna: 1,
          salmon: 1,
          eel: 1,
          shrimp: 1,
          octopus: 1,
        },
        fish: [],
        isCompleted: false,
      });
    });

    it("should handle CATCH_FISH action", () => {
      expect(
        fishing({
          request: {
            tuna: 1,
            salmon: 1,
            eel: 1,
            shrimp: 1,
            octopus: 1,
          },
          fish: [],
          isCompleted: false,
        }, {
          type: CATCH_FISH,
          caughtFish: {
            width: 100,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "tuna",
            velocity: -0.47034271861584287,
            x: 64,
            y: 79,
          }
        })
      ).toEqual({
        request: {
          tuna: 1,
          salmon: 1,
          eel: 1,
          shrimp: 1,
          octopus: 1,
        },
        fish: [{
          width: 100,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "tuna",
          velocity: -0.47034271861584287,
          x: 64,
          y: 79,
        }],
        isCompleted: false,
      });

      expect(
        fishing({
          request: {
            tuna: 1,
            salmon: 1,
            eel: 1,
            shrimp: 1,
            octopus: 1,
          },
          fish: [{
            width: 100,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "tuna",
            velocity: -0.47034271861584287,
            x: 64,
            y: 79,
          }],
          isCompleted: false,
        }, {
          type: CATCH_FISH,
          caughtFish: {
            width: 120,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "salmon",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }
        })
      ).toEqual({
        request: {
          tuna: 1,
          salmon: 1,
          eel: 1,
          shrimp: 1,
          octopus: 1,
        },
        fish: [{
          width: 100,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "tuna",
          velocity: -0.47034271861584287,
          x: 64,
          y: 79,
        }, {
          width: 120,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "salmon",
          velocity: 0.15317560519690887,
          x: 36,
          y: 83,
        }],
        isCompleted: false,
      });
    });

    it("should handle COMPLETE_REQUEST action", () => {
      expect(
        fishing({
          request: {
            tuna: 1,
            salmon: 1,
            eel: 1,
            shrimp: 1,
            octopus: 1,
          },
          fish: [{
            width: 100,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "tuna",
            velocity: -0.47034271861584287,
            x: 64,
            y: 79,
          }, {
            width: 120,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "salmon",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }, {
            width: 80,
            height: 40,
            image: "image",
            initDirection: 0,
            name: "octopus",
            velocity: 0.26853166058299416,
            x: 36,
            y: 83,
          }, {
            width: 50,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "shrimp",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }, {
            width: 90,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "eel",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }],
          isCompleted: false,
        }, {
          type: COMPLETE_REQUEST,
        })
      ).toEqual({
        request: {
          tuna: 1,
          salmon: 1,
          eel: 1,
          shrimp: 1,
          octopus: 1,
        },
        fish: [{
          width: 100,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "tuna",
          velocity: -0.47034271861584287,
          x: 64,
          y: 79,
        }, {
          width: 120,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "salmon",
          velocity: 0.15317560519690887,
          x: 36,
          y: 83,
        }, {
          width: 80,
          height: 40,
          image: "image",
          initDirection: 0,
          name: "octopus",
          velocity: 0.26853166058299416,
          x: 36,
          y: 83,
        }, {
          width: 50,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "shrimp",
          velocity: 0.15317560519690887,
          x: 36,
          y: 83,
        }, {
          width: 90,
          height: 30,
          image: "image",
          initDirection: 0,
          name: "eel",
          velocity: 0.15317560519690887,
          x: 36,
          y: 83,
        }],
        isCompleted: true,
      });
    });

    it("should handle CLEAR_NET action", () => {
      expect(
        fishing({
          request: {
            tuna: 1,
            salmon: 1,
            eel: 1,
            shrimp: 1,
            octopus: 1,
          },
          fish: [{
            width: 100,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "tuna",
            velocity: -0.47034271861584287,
            x: 64,
            y: 79,
          }, {
            width: 120,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "salmon",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }, {
            width: 80,
            height: 40,
            image: "image",
            initDirection: 0,
            name: "octopus",
            velocity: 0.26853166058299416,
            x: 36,
            y: 83,
          }, {
            width: 50,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "shrimp",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }, {
            width: 90,
            height: 30,
            image: "image",
            initDirection: 0,
            name: "eel",
            velocity: 0.15317560519690887,
            x: 36,
            y: 83,
          }],
          isCompleted: false,
        }, {
          type: CLEAR_NET,
        })
      ).toEqual(initialState);
    });
  });
});
