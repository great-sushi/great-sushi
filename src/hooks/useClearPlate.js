import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { clearPlate } from "../actions/cooking";

function useClearPlate(sashimi, modal) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (sashimi.id) {
        dispatch(clearPlate());
      }
    }, 800);

    return () => clearTimeout(timeoutID);
  }, [sashimi.id, dispatch]);

  useEffect(() => {
    dispatch(clearPlate());
  }, [modal.isVisible, dispatch]);
}

export default useClearPlate;
