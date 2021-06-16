import React, { useEffect } from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import useAudio from "../../../hooks/useAudio";
import { useDispatch } from "react-redux";
import {
  updateRice,
  updateSashimi,
  updateWasabiSize,
} from "../../../actions/cooking";
import StackedIngredient from "./StackedIngredient";
import plate from "../../../assets/image/plate.png";

const SushiContainer = styled.div`
  width: 350px;
  height: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 29vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }
`;

const Plate = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  filter: brightness(0.8);
`;

function DropZone({ percentage, rice, sashimi, wasabi }) {
  const dispatch = useDispatch();
  const [, { repeatAudio }] = useAudio("drop");
  const [, drop] = useDrop({
    accept: "SushiIngredients",
    drop: (item) => {
      repeatAudio();

      if (!rice.id && item.id === "rice") {
        dispatch(updateRice(item));
      }

      if (rice.id && item.id !== "rice") {
        if (sashimi.id) return;
        dispatch(updateSashimi(item));
      }
    }
  });

  useEffect(() => {
    dispatch(updateWasabiSize(percentage));
  }, [percentage]);

  return (
    <SushiContainer ref={drop} >
      <StackedIngredient
        ingredient={rice}
      />
      <StackedIngredient
        ingredient={sashimi}
      />
      <StackedIngredient
        ingredient={wasabi}
        percentage={percentage}
      />
      <Plate
        src={plate}
        alt="plate"
        draggable="false"
      />
    </SushiContainer>
  );
}

export default DropZone;
