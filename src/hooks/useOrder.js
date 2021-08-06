import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOrder } from "../actions/cooking";
import { getRandomInt } from "../utils";
import { MENUS } from "../constants/imageSetting";


function useOrder() {
  const dispatch = useDispatch();
  const { sashimi } = useSelector((state) => state.sushi);

  useEffect(() => {
    if (sashimi.id.length === 0) {
      const randomIndex = getRandomInt(0, MENUS.length - 1);
      const sashimi = MENUS[randomIndex];
      const wasabi = getRandomInt(0, 10) * 10;

      dispatch(updateOrder({ sashimi, wasabi }));
    }
  }, [sashimi.id]);
}

export default useOrder;
