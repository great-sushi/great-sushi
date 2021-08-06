import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRandomInt } from "../utils";
import { clearNet } from "../actions/fishing";

function useNet() {
  const fish = useSelector((state) => state.fishing.fish);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const changeFishCoordinate = (width, height) => {
    for (let i = 0; i < fish.length; i++) {
      fish[fish.length -1].x = getRandomInt(width * 0.2, width / 2);
      fish[fish.length -1].y = getRandomInt(height / 2, height * 0.8);
    }
  };

  const drawFish = (ctx) => {
    for (let i = 0; i < fish.length; i++) {
      fish[i].render(ctx);
    }
  };

  useEffect(() => {
    if (modal.isVisible) {
      dispatch(clearNet());
    }
  }, [modal.isVisible]);

  useEffect(() => {
    if (fish.length !== 0) {
      changeFishCoordinate(window.innerWidth * 0.2, window.innerHeight * 0.2);
    }
  }, [fish.length]);

  return { drawFish, fish };
}

export default useNet;
