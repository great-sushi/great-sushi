import sushi from "./sushi";
import rice from "../assets/image/rice.png";
import wasabi from "../assets/image/wasabi.png";
import tuna from "../assets/image/tuna.png";
import {
  ADD_RICE,
  ADD_WASABI,
  ADD_WASABI_SIZE,
  ADD_SASHIMI,
  RESET_PLATE,
} from "../constants";

describe("reducers", () => {
  describe("sushi", () => {
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

    it("should provide initial state", () => {
      expect(sushi(undefined, {})).toEqual(initialState);
    });

    it("should handle ADD_RICE action", () => {
      expect(
        sushi(initialState, {
          type: ADD_RICE,
          item: {
            id: "rice",
            kind: "rice",
            link: rice,
            price: null
          },
        })
      ).toEqual({
        rice: {
          id: "rice",
          kind: "rice",
          link: rice,
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
      });
    });

    it("should handle ADD_WASABI action", () => {
      expect(
        sushi({
          rice: {
            id: "rice",
            kind: "rice",
            link: rice,
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
        }, {
          type: ADD_WASABI,
          item: {
            id: "wasabi",
            kind: "wasabi",
            link: wasabi,
            size: 0,
          },
        })
      ).toEqual({
        rice: {
          id: "rice",
          kind: "rice",
          link: rice,
          price: null,
        },
        sashimi: {
          id: "",
          kind: "",
          link: "",
          price: 0,
        },
        wasabi : {
          id: "wasabi",
          kind: "wasabi",
          link: wasabi,
          size: 0,
        },
      });
    });

    it("should handle ADD_WASABI_SIZE action", () => {
      expect(
        sushi({
          rice: {
            id: "rice",
            kind: "rice",
            link: rice,
            price: null,
          },
          sashimi: {
            id: "",
            kind: "",
            link: "",
            price: 0,
          },
          wasabi : {
            id: "wasabi",
            kind: "wasabi",
            link: wasabi,
            size: 0,
          },
        }, {
          type: ADD_WASABI_SIZE,
          size: 10,
        })
      ).toEqual({
        rice: {
          id: "rice",
          kind: "rice",
          link: rice,
          price: null,
        },
        sashimi: {
          id: "",
          kind: "",
          link: "",
          price: 0,
        },
        wasabi : {
          id: "wasabi",
          kind: "wasabi",
          link: wasabi,
          size: 10,
        },
      });
    });

    it("should handle ADD_SASHIMI action", () => {
      expect(
        sushi({
          rice: {
            id: "rice",
            kind: "rice",
            link: rice,
            price: null,
          },
          sashimi: {
            id: "",
            kind: "",
            link: "",
            price: 0,
          },
          wasabi : {
            id: "wasabi",
            kind: "wasabi",
            link: wasabi,
            size: 10,
          },
        }, {
          type: ADD_SASHIMI,
          item: {
            id: "sashimi",
            kind: "tuna",
            link: tuna,
            price: 1000,
          },
        })
      ).toEqual({
        rice: {
          id: "rice",
          kind: "rice",
          link: rice,
          price: null,
        },
        sashimi: {
          id: "sashimi",
          kind: "tuna",
          link: tuna,
          price: 1000,
        },
        wasabi : {
          id: "wasabi",
          kind: "wasabi",
          link: wasabi,
          size: 10,
        },
      });
    });

    it("should hanlde RESET_PLATE action", () => {
      expect(
        sushi({
          rice: {
            id: "rice",
            kind: "rice",
            link: rice,
            price: null,
          },
          sashimi: {
            id: "sashimi",
            kind: "tuna",
            link: tuna,
            price: 1000,
          },
          wasabi : {
            id: "wasabi",
            kind: "wasabi",
            link: wasabi,
            size: 10,
          },
        }, {
          type: RESET_PLATE,
        })
      ).toEqual(initialState);
    });
  });
});
