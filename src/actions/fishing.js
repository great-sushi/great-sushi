import {
  CLEAR_NET,
  CATCH_FISH,
  UPDATE_REQUEST,
  COMPLETE_REQUEST,
} from "../constants/actionTypes";

export const clearNet = () => ({
  type: CLEAR_NET,
});

export const updateCaughtFish = (caughtFish) => ({
  type: CATCH_FISH,
  caughtFish,
});

export const updateRequest = (request) => ({
  type: UPDATE_REQUEST,
  request,
});

export const completeRequest = () => ({
  type: COMPLETE_REQUEST,
});
