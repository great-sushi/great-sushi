import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { updateRequest } from "../../../actions/fishing";
import ocean from "../../../assets/image/ocean.jpg";
import useCanvas from "../../../hooks/useCanvas";
import useFishing from "../../../hooks/useFishing";
import { getRandomInt } from "../../../utils";

const Wrapper = styled.div`
  canvas {
    background-image: url(${ocean});
    background-size: cover;
    background-position: bottom;
  }
`;


function Sea() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const {
    createFish,
    createFishingLine,
    createHookStartPosition,
    draw,
  } = useFishing();

  const canvasRef = useCanvas(0.7, 0.7, draw, [modal.isVisible]);

  useEffect(() => {
    if (!modal.isVisible) {
      createFish(window.innerWidth * 0.7, window.innerHeight * 0.7);

      dispatch(updateRequest({
        tuna: getRandomInt(1, 5),
        salmon: getRandomInt(1, 5),
        eel: getRandomInt(1, 5),
        shrimp: getRandomInt(1, 5),
        octopus: getRandomInt(1, 3),
      }));
    }
  }, [modal.isVisible, createFish, dispatch]);

  return (
    <Wrapper>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={createFishingLine}
        onClick={createHookStartPosition}
      />
    </Wrapper>
  );
}

export default Sea;
