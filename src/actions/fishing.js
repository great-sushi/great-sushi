import { CATCH_FISH, UPDATE_REQUEST } from "../constants";

export const updateCaughtFish = (caughtFish) => ({
  type: CATCH_FISH,
  caughtFish,
});

export const updateRequest = (request) => ({
  type: UPDATE_REQUEST,
  request,
});