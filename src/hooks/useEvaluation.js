import { useState, useEffect } from "react";
import useAudio from "../hooks/useAudio";

import {
  GOOD,
  WRONG_SUHSI,
  SPICY,
  BLAND,
} from "../constants/cooking";

function useEvaluation(order, sushi) {
  const { sashimiOrder, wasabiOrder } = order;
  const { rice, sashimi, wasabi } = sushi;

  const [evaluation, setEvaluation] = useState("");
  const [, { playAudio, toggleAudio }] = useAudio("coughing");

  useEffect(() => {
    if (rice.id.length === 0) {
      setEvaluation("");
      toggleAudio();
      return;
    }

    if (sashimiOrder.id === sashimi.id
        && wasabiOrder === wasabi.size
      ) {
      setEvaluation(GOOD);
      return;
    }

    if (sashimiOrder.id !== sashimi.id) {
      setEvaluation(WRONG_SUHSI);
      return;
    }

    if (wasabiOrder < wasabi.size) {
      setEvaluation(SPICY);
      playAudio();
    }

    if (wasabiOrder > wasabi.size) {
      setEvaluation(BLAND);
    }
  }, []);

  return evaluation;
}

export default useEvaluation;
