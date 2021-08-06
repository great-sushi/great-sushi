import {
  ADD_RICE,
  ADD_ORDER,
  ADD_WASABI,
  ADD_SASHIMI,
  RESET_PLATE,
  ADD_WASABI_SIZE,
} from "../constants/actionTypes";

export const clearPlate = () => ({
  type: RESET_PLATE,
});

export const updateOrder = (order) => ({
  type: ADD_ORDER,
  ...order,
});

export const updateRice = (item) => ({
  type: ADD_RICE,
  item,
});

export const updateSashimi = (item) => ({
  type: ADD_SASHIMI,
  item,
});

export const updateWasabi = (item) => ({
  type: ADD_WASABI,
  item,
});

export const updateWasabiSize = () => ({
  type: ADD_WASABI_SIZE,
});
