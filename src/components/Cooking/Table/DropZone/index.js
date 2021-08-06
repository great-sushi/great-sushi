import React from "react";

import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  updateRice,
  updateSashimi,
} from "../../../../actions/cooking";
import plate from "../../../../assets/image/plate.png";
import useAudio from "../../../../hooks/useAudio";
import StackedIngredient from "./StackedIngredient";

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

DropZone.propTypes = {
  percentage: PropTypes.number.isRequired,
  rice: PropTypes.object.isRequired,
  sashimi: PropTypes.object.isRequired,
  wasabi: PropTypes.object.isRequired,
};

export default DropZone;
